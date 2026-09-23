'use client';

import { type KeyboardEvent as ReactKeyboardEvent, type ReactNode, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { MdArrowBack, MdArrowOutward, MdClose } from 'react-icons/md';
import BenchmarkExplorer from './BenchmarkExplorer';
import LcdSimulator, { LcdPreview } from './LcdSimulator';
import { type SchoolProject, githubUrl, isPdf, resolveFile } from '@/lib/schoolworkData';
import { useDialog } from '@/app/hooks/useDialog';

interface ProjectViewerProps {
  project: SchoolProject;
  initialFile?: string;
  initialTab?: 'demo';
  onClose: () => void;
}

type Tab = 'overview' | 'demo' | 'source' | 'writeups';
const tabLabels: Record<Tab, string> = { overview: 'Overview', demo: 'Demo', source: 'Source', writeups: 'Write-ups' };

type Loaded = { html: string } | { error: string };

interface TreeRow {
  prefix: string;
  name: string;
  file?: string; // set for files, absent for folders
}

// Turn display paths into rows drawn with ├─ └─ │ connectors, keeping the listed order.
function buildTree(paths: string[]): TreeRow[] {
  type Node = { name: string; file?: string; children: Map<string, Node> };
  const root: Node = { name: '', children: new Map() };
  for (const path of paths) {
    let node = root;
    path.split('/').forEach((part, i, parts) => {
      if (!node.children.has(part)) node.children.set(part, { name: part, children: new Map() });
      node = node.children.get(part)!;
      if (i === parts.length - 1) node.file = path;
    });
  }
  const rows: TreeRow[] = [];
  const walk = (node: Node, indent: string) => {
    const children = [...node.children.values()];
    children.forEach((child, i) => {
      const last = i === children.length - 1;
      rows.push({ prefix: indent + (last ? '└─ ' : '├─ '), name: child.file ? child.name : `${child.name}/`, file: child.file });
      walk(child, indent + (last ? '   ' : '│  '));
    });
  };
  walk(root, '');
  return rows;
}

// True on desktop-width screens; false during server render and on phones.
const desktopQuery = '(min-width: 768px)';
const useIsDesktop = () => useSyncExternalStore(
  (onChange) => { const mq = window.matchMedia(desktopQuery); mq.addEventListener('change', onChange); return () => mq.removeEventListener('change', onChange); },
  () => window.matchMedia(desktopQuery).matches,
  () => false,
);

const encodePath = (path: string) => path.split('/').map(encodeURIComponent).join('/');
const cdnUrl = (repo: string, path: string) => `https://cdn.jsdelivr.net/gh/Dryd33n/${repo}/${encodePath(path)}`;

// Screenshots with labelled thumbnails that switch the large image.
function ScreenGallery({ screens }: { screens: NonNullable<SchoolProject['screens']> }) {
  const [index, setIndex] = useState(0);
  const screen = screens[index];
  return (
    <figure className="space-y-3">
      <div className="flex items-center justify-center rounded-md border border-neutral-700 bg-neutral-950 p-2">
        <Image
          key={screen.src}
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          sizes="(min-width: 768px) 768px, 100vw"
          // Full width up to the screenshot's own size, so the box keeps its shape while loading.
          style={{ maxWidth: screen.width }}
          className="h-auto max-h-[480px] w-full rounded-sm object-contain"
        />
      </div>
      <div role="group" aria-label="Choose a screenshot" className="flex flex-wrap gap-2">
        {screens.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            className={`flex items-center gap-2 rounded-sm border p-1 pr-3 text-xs uppercase tracking-[0.2em] focus-visible:outline-2 focus-visible:outline-accent ${i === index ? 'border-accent text-accent' : 'border-neutral-600 text-neutral-300 hover:border-white hover:text-white'}`}
          >
            <Image src={s.src} alt="" width={64} height={Math.round((64 * s.height) / s.width)} className="h-9 w-auto rounded-[2px]" />
            {s.label}
          </button>
        ))}
      </div>
      <figcaption className="text-xs text-neutral-500">Screenshots of the PyQt6 desktop app.</figcaption>
    </figure>
  );
}

const linkClass = "group flex items-center gap-1 uppercase tracking-[0.2em] text-neutral-400 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent rounded-sm px-1";
const OutwardIcon = () => <MdArrowOutward className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />;

/*
  A two-pane file browser: tree on the left, the open file on the right.
  On phones it shows one pane at a time — the list, then the file with a back button.
  A single file skips the tree entirely.
*/
function FileBrowser({ label, files, active, onSelect, children, toolbarLink }: {
  label: string;
  files: string[];
  active: string;
  onSelect: (file: string) => void;
  children: ReactNode;
  toolbarLink: ReactNode;
}) {
  const rows = useMemo(() => buildTree(files), [files]);
  const single = files.length === 1;
  const [mobileView, setMobileView] = useState<'list' | 'file'>(single ? 'file' : 'list');

  return (
    <div className="flex flex-1 min-h-0">
      <nav
        aria-label={label}
        className={`${mobileView === 'file' ? 'hidden' : 'flex'} ${single ? 'md:hidden' : 'md:flex'} flex-col w-full md:w-72 shrink-0 overflow-auto md:border-r border-neutral-700 py-3 text-[13px] leading-7 md:leading-6`}
      >
        <ul>
          {rows.map((row, i) => (
            <li key={i} className="whitespace-pre">
              {row.file ? (
                <button
                  type="button"
                  onClick={() => { onSelect(row.file!); setMobileView('file'); }}
                  aria-current={row.file === active ? 'true' : undefined}
                  className={`w-full text-left px-4 hover:bg-neutral-800 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${row.file === active ? 'md:bg-neutral-800 md:text-accent text-neutral-300' : 'text-neutral-300'}`}
                >
                  <span className="viewer-mono text-neutral-600">{row.prefix}</span><span className="viewer-mono">{row.name}</span>
                </button>
              ) : (
                <div className="px-4 text-neutral-500 cursor-default">
                  <span className="viewer-mono text-neutral-600">{row.prefix}</span><span className="viewer-mono">{row.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${mobileView === 'list' ? 'hidden' : 'flex'} md:flex flex-col flex-1 min-w-0 min-h-0`}>
        <div className="flex items-center gap-3 px-4 py-2 border-b border-neutral-800 text-xs">
          <button
            type="button"
            onClick={() => setMobileView('list')}
            className={`${single ? 'hidden' : 'md:hidden flex'} items-center gap-1 uppercase tracking-[0.2em] text-neutral-300 focus-visible:outline-2 focus-visible:outline-accent rounded-sm`}
          >
            <MdArrowBack /> Files
          </button>
          <span className="viewer-mono text-neutral-400 truncate cursor-default">{active}</span>
          <div className="ml-auto shrink-0">{toolbarLink}</div>
        </div>
        <div className="flex-1 min-h-0 overflow-auto bg-neutral-950">{children}</div>
      </div>
    </div>
  );
}

export default function ProjectViewer({ project, initialFile, initialTab, onClose }: ProjectViewerProps) {
  const sourceFiles = useMemo(() => Object.keys(project.files).filter((f) => !isPdf(f)), [project]);
  const pdfFiles = useMemo(() => Object.keys(project.files).filter(isPdf), [project]);
  const isDesktop = useIsDesktop();
  const demos = project.demos ?? [];
  const available: Record<Tab, boolean> = {
    overview: true,
    demo: demos.length > 0,
    source: sourceFiles.length > 0,
    writeups: pdfFiles.length > 0,
  };
  const tabs = (Object.keys(tabLabels) as Tab[]).filter((t) => available[t]);

  const [tab, setTab] = useState<Tab>(initialTab ?? (initialFile ? (isPdf(initialFile) ? 'writeups' : 'source') : 'overview'));
  const [activeDemo, setActiveDemo] = useState(0);
  const [activeSource, setActiveSource] = useState(initialFile && !isPdf(initialFile) ? initialFile : sourceFiles[0]);
  const [activePdf, setActivePdf] = useState(initialFile && isPdf(initialFile) ? initialFile : pdfFiles[0]);
  const [loaded, setLoaded] = useState<Record<string, Loaded>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});

  // Fetch highlighted source once per file, when the Source tab shows it.
  useEffect(() => {
    if (tab !== 'source' || !activeSource || loaded[activeSource]) return;
    let cancelled = false;
    fetch(`/api/project-file?project=${project.slug}&file=${encodeURIComponent(activeSource)}`)
      .then(async (res) => ((await res.json()) as Loaded))
      .catch(() => ({ error: 'Could not reach the server.' }))
      .then((result) => { if (!cancelled) setLoaded((prev) => ({ ...prev, [activeSource]: result })); });
    return () => { cancelled = true; };
  }, [tab, activeSource, loaded, project.slug]);

  useDialog(dialogRef, closeRef, onClose);

  // Left/Right arrows move between tabs.
  const onTabKey = (e: ReactKeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const next = tabs[(tabs.indexOf(tab) + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  const retry = () => setLoaded((prev) => {
    const next = { ...prev };
    delete next[activeSource];
    return next;
  });

  const heroFigure = project.hero && (
    <figure>
      <Image
        src={project.hero.src}
        alt={project.hero.alt}
        width={project.hero.width}
        height={project.hero.height}
        sizes="(min-width: 768px) 768px, 100vw"
        className="w-full h-auto rounded-md border border-neutral-700 bg-neutral-800"
      />
      {project.hero.caption && (
        <figcaption className="mt-2 text-xs text-neutral-500">{project.hero.caption}</figcaption>
      )}
    </figure>
  );

  const source = activeSource ? resolveFile(project, activeSource) : undefined;
  const pdf = activePdf ? resolveFile(project, activePdf) : undefined;
  const content = activeSource ? loaded[activeSource] : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="viewer-title"
        className="relative w-full h-full md:w-[90vw] md:h-[90vh] max-w-[1400px] bg-neutral-900 md:rounded-lg shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 px-4 pt-3">
          <div className="min-w-0">
            <h2 id="viewer-title" className="text-white text-lg md:text-2xl font-bold cursor-default break-words">
              <span className="text-accent">/</span>{project.title}
            </h2>
            <div className="text-xs uppercase tracking-wider text-neutral-400 cursor-default truncate">{project.course}: {project.courseName}</div>
          </div>
          {project.repo && (
            <a href={githubUrl(project.repo)} target="_blank" rel="noopener noreferrer" className={`ml-auto text-xs ${linkClass}`}>
              <OutwardIcon /> Repo
            </a>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className={`${project.repo ? '' : 'ml-auto'} shrink-0 text-white hover:text-accent transition-colors bg-black/50 rounded-full p-2 focus-visible:outline-2 focus-visible:outline-accent`}
          >
            <MdClose className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Project sections" onKeyDown={onTabKey} className="flex gap-6 px-4 mt-3 border-b border-neutral-700">
          {tabs.map((t) => (
            <button
              key={t}
              ref={(el) => { tabRefs.current[t] = el; }}
              type="button"
              role="tab"
              id={`tab-${t}`}
              aria-selected={tab === t}
              aria-controls={`panel-${t}`}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
              className={`-mb-px py-2 text-xs uppercase tracking-[0.2em] border-b-2 focus-visible:outline-2 focus-visible:outline-accent ${tab === t ? 'border-accent text-white' : 'border-transparent text-neutral-400 hover:text-white'}`}
            >
              {tabLabels[t]}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="flex flex-col flex-1 min-h-0">
          {tab === 'overview' && (
            <div className="flex-1 overflow-auto">
              <div className="viewer-prose max-w-3xl mx-auto px-4 md:px-10 py-6 md:py-10 space-y-8">
                {project.screens ? (
                  <ScreenGallery screens={project.screens} />
                ) : project.interactiveHero === 'lcd' ? (
                  <LcdPreview />
                ) : project.interactiveHero ? (
                  <BenchmarkExplorer kind={project.interactiveHero} fallback={heroFigure} />
                ) : heroFigure}

                <div className="space-y-4">
                  <div className="text-[15px] leading-relaxed text-neutral-200">{project.summary}</div>
                  <ul className="flex flex-wrap gap-2" aria-label="Built with">
                    {project.badges.map((b) => (
                      <li key={b} className="border border-neutral-600 text-neutral-400 py-1 px-2 text-xs rounded-sm uppercase">{b}</li>
                    ))}
                  </ul>
                </div>

                <section aria-labelledby="built-heading">
                  <h3 id="built-heading" className="text-white text-lg mb-3">What I built</h3>
                  <ul className="space-y-3">
                    {project.sections.map((s, i) => (
                      <li key={s.title} className="grid grid-cols-[auto_1fr] gap-x-2">
                        <span className="viewer-mono text-neutral-600 whitespace-pre" aria-hidden="true">{i === project.sections.length - 1 ? '└─' : '├─'}</span>
                        <div>
                          <div className="text-white text-sm">{s.title}</div>
                          <div className="text-sm leading-relaxed text-neutral-400 mt-1">{s.body}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {project.findings && (
                  <section aria-labelledby="findings-heading" className="border-l-2 border-accent pl-4">
                    <h3 id="findings-heading" className="text-white text-lg mb-3">Findings</h3>
                    <ul className="space-y-2 list-disc pl-5 marker:text-neutral-500">
                      {project.findings.map((f) => (
                        <li key={f} className="text-sm leading-relaxed text-neutral-300">{f}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {tabs.length > 1 && (
                  <div className="flex flex-wrap gap-3">
                    {demos.length > 0 && (
                      <button type="button" onClick={() => setTab('demo')} className="rounded-sm border border-white px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                        Run the demo
                      </button>
                    )}
                    {pdfFiles.length > 0 && (
                      <button type="button" onClick={() => setTab('writeups')} className="rounded-sm border border-white px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                        {pdfFiles.length === 1 ? 'Read the report' : 'Read the write-ups'}
                      </button>
                    )}
                    {sourceFiles.length > 0 && (
                      <button type="button" onClick={() => setTab('source')} className="rounded-sm border border-white px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                        Browse the source
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'demo' && demos[activeDemo] && (
            <div className="flex flex-col flex-1 min-h-0">
              {(demos.length > 1 || demos[activeDemo].note || demos[activeDemo].src) && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 border-b border-neutral-800 text-xs">
                {demos.length > 1 && (
                  <div role="group" aria-label="Choose a scene" className="flex flex-wrap gap-2">
                    {demos.map((d, i) => (
                      <button
                        key={d.label}
                        type="button"
                        onClick={() => setActiveDemo(i)}
                        aria-pressed={i === activeDemo}
                        className={`rounded-sm border px-2 py-1 uppercase tracking-[0.2em] focus-visible:outline-2 focus-visible:outline-accent ${i === activeDemo ? 'border-accent text-accent' : 'border-neutral-600 text-neutral-300 hover:border-white hover:text-white'}`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                )}
                {demos[activeDemo].note && <span className="viewer-mono text-neutral-400">{demos[activeDemo].note}</span>}
                {demos[activeDemo].src && (
                  <a href={demos[activeDemo].src} target="_blank" rel="noopener noreferrer" className={`ml-auto shrink-0 ${linkClass}`}>
                    <OutwardIcon /> Full screen
                  </a>
                )}
              </div>
              )}
              {/* Demos only run while this tab is open. */}
              {demos[activeDemo].kind === 'lcd' ? (
                <div className="flex-1 overflow-auto">
                  <LcdSimulator onViewSource={(file) => { setActiveSource(file); setTab('source'); }} />
                </div>
              ) : (
                <iframe
                  key={demos[activeDemo].src}
                  src={demos[activeDemo].src}
                  title={`${project.title}: ${demos[activeDemo].label}`}
                  className="flex-1 w-full border-0 bg-neutral-950"
                />
              )}
            </div>
          )}

          {tab === 'source' && source && (
            <FileBrowser
              label="Source files"
              files={sourceFiles}
              active={activeSource}
              onSelect={setActiveSource}
              toolbarLink={
                <a href={`${githubUrl(source.repo)}/blob/HEAD/${encodePath(source.path)}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <OutwardIcon /> GitHub
                </a>
              }
            >
              {!content ? (
                <div className="viewer-mono p-6 text-sm text-neutral-500 animate-pulse" role="status">Loading {activeSource}…</div>
              ) : 'error' in content ? (
                <div className="p-6 space-y-3" role="alert">
                  <div className="text-neutral-300">{content.error}</div>
                  <button type="button" onClick={retry} className="text-xs uppercase tracking-[0.2em] border border-neutral-600 rounded-sm px-2 py-1 hover:border-accent hover:text-accent">
                    Try again
                  </button>
                </div>
              ) : (
                <div className="viewer-code" dangerouslySetInnerHTML={{ __html: content.html }} />
              )}
            </FileBrowser>
          )}

          {tab === 'writeups' && pdf && (
            <FileBrowser
              label="Write-ups"
              files={pdfFiles}
              active={activePdf}
              onSelect={setActivePdf}
              toolbarLink={
                <a href={cdnUrl(pdf.repo, pdf.path)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <OutwardIcon /> Open PDF
                </a>
              }
            >
              {/* Phone browsers don't reliably show PDFs inside a page, so they get a button instead. */}
              {isDesktop ? (
                <iframe key={activePdf} src={cdnUrl(pdf.repo, pdf.path)} title={activePdf} className="w-full h-full border-0" />
              ) : (
              <div className="p-6 space-y-4">
                <div className="viewer-mono text-sm text-neutral-300">{activePdf}</div>
                <a href={cdnUrl(pdf.repo, pdf.path)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm border border-white px-3 py-2 text-xs uppercase tracking-[0.2em] text-white">
                  <MdArrowOutward /> Open PDF
                </a>
              </div>
              )}
            </FileBrowser>
          )}
        </div>
      </div>
    </div>
  );
}
