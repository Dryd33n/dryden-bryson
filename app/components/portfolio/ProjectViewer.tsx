'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MdArrowOutward, MdClose } from 'react-icons/md';
import { type CourseData, githubUrl } from '@/lib/schoolworkData';

interface ProjectViewerProps {
  course: CourseData;
  initialFile: string;
  onClose: () => void;
}

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

const encodePath = (path: string) => path.split('/').map(encodeURIComponent).join('/');

export default function ProjectViewer({ course, initialFile, onClose }: ProjectViewerProps) {
  const [active, setActive] = useState(initialFile);
  const [loaded, setLoaded] = useState<Record<string, Loaded>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const rows = useMemo(() => buildTree(Object.keys(course.files)), [course]);

  const repoPath = course.files[active];
  const isPdf = active.endsWith('.pdf');
  const pdfUrl = `https://cdn.jsdelivr.net/gh/Dryd33n/${course.repo}/${encodePath(repoPath)}`;
  const sourceUrl = `${githubUrl(course.repo)}/blob/HEAD/${encodePath(repoPath)}`;
  const content = loaded[active];

  // Fetch highlighted code / rendered README once per file.
  useEffect(() => {
    if (isPdf || loaded[active]) return;
    let cancelled = false;
    fetch(`/api/course-file?course=${course.slug}&file=${encodeURIComponent(active)}`)
      .then(async (res) => ((await res.json()) as Loaded))
      .catch(() => ({ error: 'Could not reach the server.' }))
      .then((result) => { if (!cancelled) setLoaded((prev) => ({ ...prev, [active]: result })); });
    return () => { cancelled = true; };
  }, [active, isPdf, loaded, course.slug]);

  // Escape closes; Tab stays inside the dialog; lock page scroll; move focus in and hand it back on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('a[href], button, iframe, [tabindex]:not([tabindex="-1"])')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const retry = () => setLoaded((prev) => {
    const next = { ...prev };
    delete next[active];
    return next;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="viewer-title"
        className="relative w-full h-full md:w-[90vw] md:h-[90vh] max-w-[1400px] bg-neutral-900 md:rounded-lg shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-neutral-700">
          <h2 id="viewer-title" className="text-white text-xl font-bold cursor-default">
            <span className="text-accent">/</span>{course.code}
          </h2>
          <span className="hidden sm:inline text-xs uppercase tracking-wider text-neutral-400 cursor-default">{course.name}</span>
          <a
            href={githubUrl(course.repo)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto group flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent rounded-sm px-1"
          >
            <MdArrowOutward className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> Repo
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project viewer"
            className="text-white hover:text-accent transition-colors bg-black/50 rounded-full p-2 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <MdClose className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 min-h-0">
          {/* File tree */}
          <nav aria-label="Project files" className="shrink-0 md:w-72 max-h-40 md:max-h-none overflow-auto border-b md:border-b-0 md:border-r border-neutral-700 py-3 font-mono text-[13px] leading-6">
            <div className="viewer-mono px-4 text-neutral-500 cursor-default">/{course.slug}</div>
            <ul>
              {rows.map((row, i) => (
                <li key={i} className="whitespace-pre">
                  {row.file ? (
                    <button
                      type="button"
                      onClick={() => setActive(row.file!)}
                      aria-current={row.file === active ? 'page' : undefined}
                      className={`w-full text-left px-4 hover:bg-neutral-800 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${row.file === active ? 'bg-neutral-800 text-accent' : 'text-neutral-300'}`}
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

          {/* Content */}
          <div className="flex flex-col flex-1 min-w-0 min-h-0">
            <div className="flex items-center gap-4 px-4 py-2 border-b border-neutral-800 text-xs">
              <span className="viewer-mono font-mono text-neutral-400 truncate cursor-default">/{course.slug}/{active}</span>
              <a
                href={isPdf ? pdfUrl : sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto shrink-0 group flex items-center gap-1 uppercase tracking-[0.2em] text-neutral-400 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent rounded-sm px-1"
              >
                <MdArrowOutward className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                {isPdf ? 'Open PDF' : 'Open on GitHub'}
              </a>
            </div>

            <div className="flex-1 min-h-0 overflow-auto bg-neutral-950">
              {isPdf ? (
                <iframe key={pdfUrl} src={pdfUrl} title={`${course.code} ${active}`} className="w-full h-full border-0" />
              ) : !content ? (
                <div className="viewer-mono p-6 text-sm text-neutral-500 animate-pulse" role="status">Loading {active}…</div>
              ) : 'error' in content ? (
                <div className="p-6 space-y-3" role="alert">
                  <div className="text-neutral-300">{content.error}</div>
                  <button type="button" onClick={retry} className="text-xs uppercase tracking-[0.2em] border border-neutral-600 rounded-sm px-2 py-1 hover:border-accent hover:text-accent">
                    Try again
                  </button>
                </div>
              ) : (
                <div
                  className={active.endsWith('.md') ? 'viewer-md p-6 md:p-10' : 'viewer-code'}
                  dangerouslySetInnerHTML={{ __html: content.html }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
