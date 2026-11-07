'use client';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdArrowOutward, MdClose } from 'react-icons/md';
import ObsidianDownloads, { type DownloadCounts } from './ObsidianDownloads';
import type { ObsidianPlugin } from '@/lib/projectsData';
import { useDialog } from '@/app/hooks/useDialog';

interface ObsidianPluginsModalProps {
  title: string;
  plugins: ObsidianPlugin[];
  counts: DownloadCounts;
  onClose: () => void;
}

const linkClass = "group relative after:absolute after:-inset-x-1 after:-inset-y-2 flex items-center gap-2 rounded-sm border border-white/60 px-2 py-1.5 lg:py-1 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Side-by-side details for each plugin on the combined Obsidian card, styled like ProjectViewer.
export default function ObsidianPluginsModal({ title, plugins, counts, onClose }: ObsidianPluginsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialog(dialogRef, closeRef, onClose);

  const pluginIds = plugins.map((p) => p.id);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="plugins-title"
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:w-[90vw] max-w-[1100px] bg-neutral-900 md:rounded-lg shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-neutral-700">
          <div className="min-w-0">
            <h2 id="plugins-title" className="text-white text-lg md:text-2xl font-bold cursor-default break-words">
              <span className="text-accent">/</span>{title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-400 cursor-default">
              {plugins.length} community plugins · <ObsidianDownloads pluginIds={pluginIds} counts={counts} /> downloads
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close plugins"
            className="relative after:absolute after:-inset-2 ml-auto shrink-0 text-white hover:text-accent transition-colors bg-black/50 rounded-full p-2 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <MdClose className="h-6 w-6 lg:h-5 lg:w-5" />
          </button>
        </div>

        {/* One column per plugin */}
        <div className="flex-1 min-h-0 overflow-auto grid md:grid-cols-2">
          {plugins.map((plugin, i) => (
            <section
              key={plugin.id}
              aria-labelledby={`plugin-${plugin.id}`}
              className={`flex flex-col gap-5 p-6 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-neutral-700' : ''}`}
            >
              <div>
                <h3 id={`plugin-${plugin.id}`} className="text-xl text-white cursor-default">
                  <span className="text-accent">/</span>{plugin.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{plugin.summary}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {plugin.techBadges.map((badge) => (
                  <span key={badge} className="border border-white/40 text-white/60 py-1 px-2 text-xs rounded-sm whitespace-nowrap cursor-default">{badge}</span>
                ))}
              </div>

              <dl className="space-y-2 text-xs tracking-wider cursor-default">
                {[
                  { label: 'Downloads', value: <ObsidianDownloads pluginIds={[plugin.id]} counts={counts} /> },
                  { label: 'Version', value: plugin.version },
                  { label: 'Platforms', value: plugin.platforms },
                  ...plugin.codeStats.map((s) => ({ label: s.language, value: s.percentage })),
                ].map((row) => (
                  <div key={row.label} className="flex justify-between gap-4">
                    <dt className="text-white/80">{row.label}</dt>
                    <dd className="text-right text-white/60">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <ul className="space-y-1.5 text-sm text-neutral-300">
                {plugin.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-accent shrink-0" aria-hidden="true">›</span>{feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                {plugin.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <MdArrowOutward className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
