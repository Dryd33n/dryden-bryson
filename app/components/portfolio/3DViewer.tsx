'use client';

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center, Environment, Grid, Lightformer, OrbitControls, useGLTF } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

// An equirectangular .hdr to light the model with; the background stays dark either way.
export interface EnvironmentSettings {
  file: string;
  intensity?: number;
  // Turns the HDRI around the vertical axis, in radians, to move where the key light comes from.
  rotation?: number;
}

export interface ModelStats {
  triangles: number;
  vertices: number;
}

interface ThreeDViewerProps {
  modelPath: string;
  // Direction the camera looks from; the distance is worked out from the model's size.
  cameraDirection?: [number, number, number];
  autoRotate?: boolean;
  wireframe?: boolean;
  // Bump to animate the camera back to the starting view.
  resetKey?: number;
  onLoaded?: (stats: ModelStats) => void;
  environment?: EnvironmentSettings;
  // Frame the camera on meshes using these materials only; the rest of the model can run off-screen.
  focusMaterials?: string[];
}

const BACKGROUND = '#0a0a0a';
const RESET_SECONDS = 0.6;
const DEFAULT_DIRECTION: [number, number, number] = [-1, 0.7, 1];
const WIRE_MATERIAL = new THREE.MeshBasicMaterial({ color: '#a3a3a3', wireframe: true, transparent: true, opacity: 0.6 });

function Model({ modelPath, wireframe, onLoaded }: {
  modelPath: string;
  wireframe: boolean;
  onLoaded?: (stats: ModelStats) => void;
}) {
  const { scene } = useGLTF(modelPath);

  const { stats, meshes } = useMemo(() => {
    let triangles = 0, vertices = 0;
    const meshes: THREE.Mesh[] = [];
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const geometry = obj.geometry as THREE.BufferGeometry;
      const count = geometry.attributes.position.count;
      vertices += count;
      triangles += (geometry.index ? geometry.index.count : count) / 3;
      meshes.push(obj);
    });
    return { stats: { triangles, vertices }, meshes };
  }, [scene]);

  useEffect(() => { onLoaded?.(stats); }, [stats, onLoaded]);

  // Wireframe swaps in flat lines so the topology reads without the textures bleeding through.
  // useGLTF caches the scene between opens, so the original materials go back on the way out.
  useLayoutEffect(() => {
    if (!wireframe) return;
    const originals = meshes.map((mesh) => mesh.material);
    meshes.forEach((mesh) => { mesh.material = WIRE_MATERIAL; });
    return () => meshes.forEach((mesh, i) => { mesh.material = originals[i]; });
  }, [meshes, wireframe]);

  return <primitive object={scene} />;
}

// The canvas only draws on demand, so settings that change the picture have to ask for a frame.
function Redraw({ autoRotate, wireframe }: { autoRotate: boolean; wireframe: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => { invalidate(); }, [autoRotate, wireframe, invalidate]);
  return null;
}

// The meshes to frame: those using one of `materials`, or every mesh when none are named.
function framedMeshes(root: THREE.Object3D, materials?: string[]) {
  const meshes: THREE.Mesh[] = [];
  root.updateWorldMatrix(true, true);
  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const names = (Array.isArray(obj.material) ? obj.material : [obj.material]).map((m) => m.name);
    if (!materials?.length || names.some((n) => materials.includes(n))) meshes.push(obj);
  });
  return meshes;
}

// Up to ~20000 world-space vertices, evenly spread, to measure the silhouette with.
// Dense enough that sparse extremes (a slab corner held by a handful of vertices) still get counted.
function samplePoints(meshes: THREE.Mesh[], budget = 20000) {
  const total = meshes.reduce((n, m) => n + m.geometry.attributes.position.count, 0);
  const step = Math.max(1, Math.floor(total / budget));
  const points: THREE.Vector3[] = [];
  for (const mesh of meshes) {
    const position = mesh.geometry.attributes.position;
    for (let i = 0; i < position.count; i += step) {
      points.push(new THREE.Vector3().fromBufferAttribute(position, i).applyMatrix4(mesh.matrixWorld));
    }
  }
  return points;
}

// Distance along `dir` at which the model's vertices fill `fill` of the screen.
// Measuring real vertices rather than a bounding sphere or box keeps flat and winding models from looking tiny.
function fitDistance(camera: THREE.PerspectiveCamera, points: THREE.Vector3[], center: THREE.Vector3, dir: THREE.Vector3, initial: number, fill = 0.85) {
  const probe = camera.clone();
  const p = new THREE.Vector3();
  let distance = initial;
  for (let i = 0; i < 6; i++) {
    probe.position.copy(center).addScaledVector(dir, distance);
    probe.lookAt(center);
    probe.updateMatrixWorld();
    let extent = 0;
    for (const point of points) {
      p.copy(point).project(probe);
      extent = Math.max(extent, Math.abs(p.x), Math.abs(p.y));
    }
    distance *= extent / fill;
  }
  return distance;
}

// Frames the model on load, animates back to that view on reset, and scales zoom limits and the grid to it.
function Framing({ target, direction, focusMaterials, resetKey, onRadius }: {
  target: React.RefObject<THREE.Group | null>;
  direction: [number, number, number];
  focusMaterials?: string[];
  resetKey: number;
  onRadius: (radius: number) => void;
}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const controls = useThree((s) => s.controls) as unknown as OrbitControlsImpl | null;
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  const home = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);
  const tween = useRef<{ from: THREE.Vector3; fromTarget: THREE.Vector3; t: number } | null>(null);
  const framed = useRef(false);

  // Work out the home view whenever the model or the canvas shape changes.
  useLayoutEffect(() => {
    if (!target.current || !controls) return;
    const meshes = framedMeshes(target.current, focusMaterials);
    const box = new THREE.Box3();
    meshes.forEach((mesh) => box.expandByObject(mesh));
    const center = box.getCenter(new THREE.Vector3());
    const dir = new THREE.Vector3(...direction).normalize();
    const radius = box.getSize(new THREE.Vector3()).length() / 2;
    const distance = fitDistance(camera, samplePoints(meshes), center, dir, radius * 2);

    home.current = { position: center.clone().addScaledVector(dir, distance), target: center };
    camera.near = distance / 100;
    camera.far = distance * 20;
    camera.updateProjectionMatrix();
    controls.minDistance = radius * 0.3;
    controls.maxDistance = distance * 3;
    onRadius(radius);

    // Snap to the home view once; later resizes only move where Reset goes.
    if (!framed.current) {
      framed.current = true;
      camera.position.copy(home.current.position);
      controls.target.copy(center);
      controls.update();
    }
    invalidate();
  }, [target, controls, camera, direction, focusMaterials, size.width, size.height, onRadius, invalidate]);

  useEffect(() => {
    if (resetKey === 0 || !controls) return;
    tween.current = { from: camera.position.clone(), fromTarget: controls.target.clone(), t: 0 };
    invalidate();
  }, [resetKey, camera, controls, invalidate]);

  useFrame((_, delta) => {
    const tw = tween.current;
    if (!tw || !home.current || !controls) return;
    tw.t = Math.min(1, tw.t + delta / RESET_SECONDS);
    const k = 1 - Math.pow(1 - tw.t, 3); // ease-out
    camera.position.lerpVectors(tw.from, home.current.position, k);
    controls.target.lerpVectors(tw.fromTarget, home.current.target, k);
    controls.update();
    if (tw.t >= 1) tween.current = null;
    invalidate();
  });

  return null;
}

export default function ThreeDViewer({
  modelPath,
  cameraDirection = DEFAULT_DIRECTION,
  autoRotate = false,
  wireframe = false,
  resetKey = 0,
  onLoaded,
  environment,
  focusMaterials,
}: ThreeDViewerProps) {
  const [radius, setRadius] = useState(0);
  const modelRef = useRef<THREE.Group>(null);

  return (
    <Canvas frameloop="demand" dpr={[1, 2]} camera={{ fov: 40 }}>
      <color attach="background" args={[BACKGROUND]} />
      <Suspense fallback={null}>
        {environment ? (
          // Image-based lighting from a self-hosted HDRI.
          <Environment
            files={environment.file}
            environmentIntensity={environment.intensity ?? 1}
            environmentRotation={[0, environment.rotation ?? 0, 0]}
          />
        ) : (
          // Fallback studio lighting built in-scene.
          <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} />
            <Environment resolution={256}>
              <Lightformer intensity={2} position={[0, 5, -9]} scale={[10, 10, 1]} />
              <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 5, 0]} scale={[20, 20, 1]} />
              <Lightformer intensity={1} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 2, 1]} />
              <Lightformer intensity={1} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
            </Environment>
          </>
        )}
        <group ref={modelRef}>
          <Center top>
            <Model modelPath={modelPath} wireframe={wireframe} onLoaded={onLoaded} />
          </Center>
        </group>
        <Framing target={modelRef} direction={cameraDirection} focusMaterials={focusMaterials} resetKey={resetKey} onRadius={setRadius} />
      </Suspense>

      {radius > 0 && (
        <Grid
          position={[0, -0.01, 0]}
          infiniteGrid
          cellSize={radius / 10}
          sectionSize={radius / 2}
          cellThickness={0.6}
          sectionThickness={1}
          cellColor="#262626"
          sectionColor="#404040"
          fadeDistance={radius * 6}
          fadeStrength={2}
        />
      )}

      <Redraw autoRotate={autoRotate} wireframe={wireframe} />
      <OrbitControls
        makeDefault
        enableDamping
        autoRotate={autoRotate}
        autoRotateSpeed={0.6}
        // Keep the camera above the ground plane.
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
    </Canvas>
  );
}
