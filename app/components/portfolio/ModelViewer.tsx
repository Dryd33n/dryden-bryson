'use client';

import { Component, type ReactNode, useCallback, useRef, useState } from 'react';
import { MdClose, MdOutlineCenterFocusStrong, MdOutline360, MdGridOn } from 'react-icons/md';
import ThreeDViewer, { type EnvironmentSettings, type ModelStats } from './3DViewer';
import { useDialog } from '@/app/hooks/useDialog';

interface ModelViewerProps {
  name: string;
  subtitle?: string;
  modelPath: string;
  cameraDirection?: [number, number, number];
  environment?: EnvironmentSettings;
  focusMaterials?: string[];
  onClose: () => void;
}

// WebGL can be unavailable or the file can fail to load; either way, say so instead of a blank box.
class ViewerErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.2em] text-neutral-400">
        Couldn&apos;t load the model in this browser.
      </div>
    );
  }
}

// A single GLB loads as one item, so a percentage would sit at 0 then jump to 100; a cursor is more honest.
function LoadingOverlay({ loaded }: { loaded: boolean }) {
  return (
    <div
      aria-hidden={loaded}
      className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="text-xs uppercase tracking-[0.2em] text-neutral-400" role="status">
        Loading model<span className="text-accent animate-pulse">_</span>
      </div>
    </div>
  );
}

const toolClass = (on: boolean) =>
  `group flex items-center gap-2 py-2 text-xs uppercase tracking-[0.2em] border-b-2 -mb-px focus-visible:outline-2 focus-visible:outline-accent transition-colors ${on ? 'border-accent text-white' : 'border-transparent text-neutral-400 hover:text-white'}`;

export default function ModelViewer({ name, subtitle, modelPath, cameraDirection, environment, focusMaterials, onClose }: ModelViewerProps) {
  const [stats, setStats] = useState<ModelStats | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reset = useCallback(() => setResetKey((k) => k + 1), []);

  useDialog(dialogRef, closeRef, onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="model-viewer-title"
        className="relative w-full h-full md:w-[90vw] md:h-[90vh] max-w-[1400px] bg-neutral-900 md:rounded-lg shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 px-4 pt-3">
          <div className="min-w-0">
            <h2 id="model-viewer-title" className="text-white text-lg md:text-2xl font-bold cursor-default break-words">
              <span className="text-accent">/</span>{name}
            </h2>
            {subtitle && <div className="text-xs uppercase tracking-wider text-neutral-400 cursor-default truncate">{subtitle}</div>}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close model viewer"
            className="ml-auto shrink-0 text-white hover:text-accent transition-colors bg-black/50 rounded-full p-2 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <MdClose className="h-5 w-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-6 px-4 mt-3 border-b border-neutral-700">
          <button type="button" onClick={reset} className={toolClass(false)}>
            <MdOutlineCenterFocusStrong className="h-4 w-4" /><span>Reset<span className="hidden sm:inline"> view</span></span>
          </button>
          <button type="button" aria-pressed={autoRotate} onClick={() => setAutoRotate((v) => !v)} className={toolClass(autoRotate)}>
            <MdOutline360 className="h-4 w-4" /><span>Rotate</span>
          </button>
          <button type="button" aria-pressed={wireframe} onClick={() => setWireframe((v) => !v)} className={toolClass(wireframe)}>
            <MdGridOn className="h-4 w-4" /><span>Wire<span className="hidden sm:inline">frame</span></span>
          </button>
          {stats && (
            <div className="ml-auto hidden md:block py-2 text-xs uppercase tracking-[0.2em] text-neutral-500 tabular-nums cursor-default">
              {stats.triangles.toLocaleString()} tris · {stats.vertices.toLocaleString()} verts
            </div>
          )}
        </div>

        {/* Canvas */}
        <div className="relative flex-1 min-h-0 bg-neutral-950" onDoubleClick={reset}>
          <ViewerErrorBoundary>
            <ThreeDViewer
              modelPath={modelPath}
              cameraDirection={cameraDirection}
              environment={environment}
              focusMaterials={focusMaterials}
              autoRotate={autoRotate}
              wireframe={wireframe}
              resetKey={resetKey}
              onLoaded={setStats}
            />
            <LoadingOverlay loaded={stats !== null} />
          </ViewerErrorBoundary>
        </div>

        {/* Controls legend */}
        <div className="px-4 py-2 border-t border-neutral-700 text-[11px] uppercase tracking-[0.2em] text-neutral-500 cursor-default">
          <span className="pointer-coarse:hidden">Drag rotate · Right-drag pan · Scroll zoom · Double-click reset</span>
          <span className="hidden pointer-coarse:inline">Drag rotate · Pinch zoom · Two fingers pan</span>
        </div>
      </div>
    </div>
  );
}
