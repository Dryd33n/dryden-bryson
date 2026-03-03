import ThreeDViewer from '../components/portfolio/3DViewer';
import ModelCard from '../components/portfolio/ModelCard';

export default function TestPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">3D Components Test</h1>
      
      {/* Model Card Test */}
      <section className="mb-12">
        <h2 className="text-2xl mb-4">Model Card Component</h2>
        <div className="flex flex-wrap gap-8">
          <ModelCard
            name="Seylynn"
            modelPath="/3D Models/seylynn.glb"
            techBadges={["GLB", "Blender", "Low Poly"]}
            modelStats={[
              { label: "Format", value: "GLB" },
              { label: "Polygons", value: "~5K" },
              { label: "Textures", value: "PBR" },
            ]}
            cameraPosition={[0, 1, 5]}
            svgIcon={
              <svg viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="40" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Direct Viewer Test */}
      <section>
        <h2 className="text-2xl mb-4">Direct 3D Viewer</h2>
        <div className="w-full h-[600px] border-2 border-gray-300 rounded-lg overflow-hidden">
          <ThreeDViewer 
            modelPath="/3D Models/seylynn.glb"
            cameraPosition={[0, 0, 5]}
            backgroundColor="#1a1a1a"
          />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Controls:</p>
          <ul className="list-disc list-inside">
            <li>Left click + drag: Rotate</li>
            <li>Right click + drag: Pan</li>
            <li>Scroll: Zoom</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
