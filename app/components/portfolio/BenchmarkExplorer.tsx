'use client';

import { type KeyboardEvent, type ReactNode, useEffect, useId, useMemo, useRef, useState } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { githubUrl, repoAsset } from '@/lib/schoolworkData';

/*
  Interactive charts for the CSC 226 benchmark studies, drawn from each experiment's own
  results.csv. The viewer is always dark, so there is one palette, checked with the dataviz
  validator against the #171717 panel: blue #3987e5 and the site's darker accent #e5533f
  pass the lightness band, chroma floor, CVD separation and contrast checks.
*/
const SERIES = { loser: '#3987e5', winner: '#e5533f' };
const INK = { primary: '#ffffff', secondary: '#c3c2b7', muted: '#898781', grid: '#2c2c2a', axis: '#383835', surface: '#171717' };

type Row = Record<string, number>;

function useCsv(url: string) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((res) => { if (!res.ok) throw new Error(String(res.status)); return res.text(); })
      .then((text) => {
        const [header, ...lines] = text.trim().split(/\r?\n/);
        const cols = header.split(',');
        if (!cancelled) setRows(lines.map((line) => Object.fromEntries(line.split(',').map((v, i) => [cols[i], Number(v)]))));
      })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [url]);
  return { rows, failed };
}

// Pick a time unit so the axis reads in whole-ish numbers.
const UNITS = [
  { label: 'ns', perMs: 1e6, below: 0.001 },
  { label: 'µs', perMs: 1e3, below: 1 },
  { label: 'ms', perMs: 1, below: 1000 },
  { label: 's', perMs: 1e-3, below: Infinity },
];
const pickUnit = (maxMs: number) => UNITS.find((u) => maxMs < u.below)!;

// Evenly spaced ticks from 0, all printed with the same number of decimals.
function niceTicks(max: number, count = 4) {
  const rough = max / count;
  const pow = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= rough)!;
  const values = [];
  for (let t = 0; t <= max + step * 0.001; t += step) values.push(Number(t.toPrecision(10)));
  if (values[values.length - 1] < max) values.push(Number((values[values.length - 1] + step).toPrecision(10)));
  const decimals = Math.max(0, -Math.floor(Math.log10(step)) + (step / pow === 2.5 ? 1 : 0));
  return { values, format: (v: number) => v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) };
}

const formatNumber = (v: number) =>
  v >= 100 ? Math.round(v).toLocaleString() : v >= 10 ? v.toFixed(1) : v >= 1 ? v.toFixed(2) : v.toPrecision(2);

interface Series {
  id: string;
  label: string;
  color: string;
  values: number[];
}

interface LineChartProps {
  label: string;
  xs: number[];
  xDomain: [number, number];
  xTicks: number[];
  formatX: (x: number) => string;
  xTitle: string;
  unit: string;
  series: Series[];
  marker?: { x: number; label: string };
}

const HEIGHT = 260;
const MARGIN = { top: 28, right: 16, bottom: 40, left: 52 };

// A two-series line chart with a snapping crosshair, keyboard control and a table view.
function LineChart({ label, xs, xDomain, xTicks, formatX, xTitle, unit, series, marker }: LineChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [active, setActive] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const tableId = useId();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(260, entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const innerW = width - MARGIN.left - MARGIN.right;
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const yMax = Math.max(...series.flatMap((s) => s.values)) || 1;
  const yTicks = niceTicks(yMax);
  const yTop = yTicks.values[yTicks.values.length - 1];
  const x = (v: number) => MARGIN.left + ((v - xDomain[0]) / (xDomain[1] - xDomain[0])) * innerW;
  const y = (v: number) => MARGIN.top + innerH - (v / yTop) * innerH;
  const path = (values: number[]) => values.map((v, i) => `${i ? 'L' : 'M'}${x(xs[i]).toFixed(1)},${y(v).toFixed(1)}`).join('');

  const nearest = (px: number) => {
    let best = 0;
    xs.forEach((v, i) => { if (Math.abs(x(v) - px) < Math.abs(x(xs[best]) - px)) best = i; });
    return best;
  };
  const onPointer = (e: React.PointerEvent<SVGRectElement>) => {
    const rect = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
    setActive(nearest(e.clientX - rect.left));
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const step = e.key === 'ArrowRight' ? 1 : -1;
      setActive((i) => Math.min(xs.length - 1, Math.max(0, (i ?? (step > 0 ? -1 : xs.length)) + step)));
    }
    if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    if (e.key === 'End') { e.preventDefault(); setActive(xs.length - 1); }
  };

  const TIP_WIDTH = 272;
  // Sit beside the crosshair, flipping to its left side near the right edge.
  const tipLeft = active === null ? 0 : x(xs[active]) + 12 + TIP_WIDTH > width ? Math.max(0, x(xs[active]) - 12 - TIP_WIDTH) : x(xs[active]) + 12;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs" style={{ color: INK.secondary }}>
        {series.map((s) => (
          <span key={s.id} className="viewer-mono flex items-center gap-2">
            <svg width="16" height="2" aria-hidden="true"><line x1="0" y1="1" x2="16" y2="1" stroke={s.color} strokeWidth="2" strokeLinecap="round" /></svg>
            {s.label}
          </span>
        ))}
      </div>

      <div
        ref={wrapRef}
        className="relative outline-none rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        tabIndex={0}
        role="group"
        aria-label={`${label}. Use the left and right arrow keys to read values.`}
        onKeyDown={onKey}
        onFocus={() => setActive((i) => i ?? 0)}
        onBlur={() => setActive(null)}
      >
        <svg width={width} height={HEIGHT} className="block" aria-hidden="true">
          {yTicks.values.map((t) => (
            <g key={t}>
              <line x1={MARGIN.left} x2={width - MARGIN.right} y1={y(t)} y2={y(t)} stroke={t === 0 ? INK.axis : INK.grid} strokeWidth="1" />
              <text x={MARGIN.left - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize="11" fill={INK.muted} style={{ fontVariantNumeric: 'tabular-nums' }}>{yTicks.format(t)}</text>
            </g>
          ))}
          <text x={MARGIN.left - 8} y={MARGIN.top - 12} textAnchor="end" fontSize="11" fill={INK.muted}>{unit}</text>
          {xTicks.map((t) => (
            <text key={t} x={x(t)} y={HEIGHT - MARGIN.bottom + 18} textAnchor="middle" fontSize="11" fill={INK.muted} style={{ fontVariantNumeric: 'tabular-nums' }}>{formatX(t)}</text>
          ))}
          <text x={MARGIN.left + innerW / 2} y={HEIGHT - 4} textAnchor="middle" fontSize="11" fill={INK.muted}>{xTitle}</text>

          {marker && (
            <g>
              <line x1={x(marker.x)} x2={x(marker.x)} y1={MARGIN.top - 4} y2={MARGIN.top + innerH} stroke={INK.secondary} strokeWidth="1" />
              <text
                x={x(marker.x)}
                y={MARGIN.top - 10}
                textAnchor={x(marker.x) > width - 120 ? 'end' : x(marker.x) < MARGIN.left + 120 ? 'start' : 'middle'}
                fontSize="11"
                fill={INK.secondary}
              >
                {marker.label}
              </text>
            </g>
          )}

          {series.map((s) => (
            <path key={s.id} d={path(s.values)} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          ))}

          {active !== null && (
            <g>
              <line x1={x(xs[active])} x2={x(xs[active])} y1={MARGIN.top} y2={MARGIN.top + innerH} stroke={INK.muted} strokeWidth="1" />
              {series.map((s) => (
                <circle key={s.id} cx={x(xs[active])} cy={y(s.values[active])} r="4" fill={s.color} stroke={INK.surface} strokeWidth="2" />
              ))}
            </g>
          )}

          <rect
            x={MARGIN.left}
            y={MARGIN.top}
            width={innerW}
            height={innerH}
            fill="transparent"
            onPointerMove={onPointer}
            onPointerDown={onPointer}
            onPointerLeave={() => setActive(null)}
          />
        </svg>

        {active !== null && (
          <div
            className="pointer-events-none absolute top-2 rounded-sm border px-3 py-2 text-xs shadow-lg"
            style={{ left: tipLeft, width: TIP_WIDTH, background: '#0a0a0a', borderColor: INK.axis }}
            role="status"
          >
            <div className="mb-1" style={{ color: INK.muted }}>{xTitle}: {formatX(xs[active])}</div>
            {series.map((s) => (
              <div key={s.id} className="flex items-baseline gap-2 py-0.5">
                <svg width="12" height="2" aria-hidden="true" className="shrink-0 self-center"><line x1="0" y1="1" x2="12" y2="1" stroke={s.color} strokeWidth="2" /></svg>
                <span className="viewer-mono font-bold whitespace-nowrap" style={{ color: INK.primary, fontVariantNumeric: 'tabular-nums' }}>{formatNumber(s.values[active])} {unit}</span>
                <span className="viewer-mono" style={{ color: INK.secondary }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setShowTable((v) => !v)}
        aria-expanded={showTable}
        aria-controls={tableId}
        className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent rounded-sm"
      >
        {showTable ? 'Hide table' : 'Show as table'}
      </button>
      {showTable && (
        <div id={tableId} className="overflow-x-auto">
          <table className="w-full text-xs" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <caption className="sr-only">{label}</caption>
            <thead>
              <tr style={{ color: INK.muted }}>
                <th scope="col" className="text-left font-normal py-1 pr-4">{xTitle}</th>
                {series.map((s) => <th key={s.id} scope="col" className="text-right font-normal py-1 pl-4">{s.label} ({unit})</th>)}
              </tr>
            </thead>
            <tbody>
              {xs.map((xv, i) => (
                <tr key={xv} className="border-t" style={{ borderColor: INK.grid, color: INK.secondary }}>
                  <th scope="row" className="text-left font-normal py-1 pr-4">{formatX(xv)}</th>
                  {series.map((s) => <td key={s.id} className="text-right py-1 pl-4">{formatNumber(s.values[i])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Control({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
      <span className="uppercase tracking-[0.2em] text-neutral-400">{label}</span>
      {children}
    </div>
  );
}

function Frame({ headline, controls, chart, source }: { headline: ReactNode; controls: ReactNode; chart: ReactNode; source: { repo: string; path: string } }) {
  return (
    <figure className="space-y-4">
      <div className="text-[15px] leading-relaxed text-white" aria-live="polite">{headline}</div>
      <div className="space-y-3">{controls}</div>
      {chart}
      <figcaption className="text-xs text-neutral-500">
        Interactive, drawn from the experiment’s own{' '}
        <a href={`${githubUrl(source.repo)}/blob/HEAD/${source.path}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-accent">
          results.csv <MdArrowOutward aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}

const rangeClass = 'w-full max-w-xs accent-[#e5533f] cursor-pointer';

function HashTableExplorer({ fallback }: { fallback: ReactNode }) {
  const source = { repo: 'uvic-csc-226', path: 'assignments/a1/Plotting/results.csv' };
  const { rows, failed } = useCsv(repoAsset(source.repo, source.path));
  const sizes = useMemo(() => (rows ? [...new Set(rows.map((r) => r.MapSize))].sort((a, b) => a - b) : []), [rows]);
  const [sizeIndex, setSizeIndex] = useState<number | null>(null);

  if (failed) return <>{fallback}</>;
  if (!rows) return <div className="viewer-mono h-80 text-sm text-neutral-500 animate-pulse" role="status">Loading results…</div>;

  const index = sizeIndex ?? Math.max(0, sizes.indexOf(1048576));
  const size = sizes[index];
  const slice = rows.filter((r) => r.MapSize === size).sort((a, b) => a.LoadFactor - b.LoadFactor);
  const unit = pickUnit(Math.max(...slice.flatMap((r) => [r.LP_Median_ms, r.CH_Median_ms])));
  const ratio = slice.reduce((sum, r) => sum + r.CH_Median_ms / r.LP_Median_ms, 0) / slice.length;
  const power = Math.log2(size);

  return (
    <Frame
      source={source}
      headline={<>At <strong>{size.toLocaleString()}</strong> slots, chaining takes <strong>{ratio.toFixed(2)}×</strong> as long as linear probing on average.</>}
      controls={
        <Control label={<label htmlFor="hash-size">Table size</label>}>
          <input id="hash-size" type="range" min={0} max={sizes.length - 1} value={index} onChange={(e) => setSizeIndex(Number(e.target.value))} className={rangeClass} aria-valuetext={`${size.toLocaleString()} slots`} />
          <span className="viewer-mono text-neutral-300" style={{ fontVariantNumeric: 'tabular-nums' }}>2^{power} = {size.toLocaleString()}</span>
        </Control>
      }
      chart={
        <LineChart
          label={`Median time per run against load factor, for a table of ${size.toLocaleString()} slots`}
          xs={slice.map((r) => r.LoadFactor)}
          xDomain={[0.05, 0.95]}
          xTicks={[0.1, 0.3, 0.5, 0.7, 0.9]}
          formatX={(v) => v.toFixed(2)}
          xTitle="Load factor"
          unit={unit.label}
          series={[
            { id: 'probing', label: 'Linear probing', color: SERIES.winner, values: slice.map((r) => r.LP_Median_ms * unit.perMs) },
            { id: 'chaining', label: 'Separate chaining', color: SERIES.loser, values: slice.map((r) => r.CH_Median_ms * unit.perMs) },
          ]}
        />
      }
    />
  );
}

const DENSITIES = [0.25, 0.5, 0.75, 1];

function ShortestPathExplorer({ fallback }: { fallback: ReactNode }) {
  const source = { repo: 'uvic-csc-226', path: 'assignments/a2/Plotting/results.csv' };
  const { rows, failed } = useCsv(repoAsset(source.repo, source.path));
  const [density, setDensity] = useState(0.5);
  const [n, setN] = useState(200);

  if (failed) return <>{fallback}</>;
  if (!rows) return <div className="viewer-mono h-80 text-sm text-neutral-500 animate-pulse" role="status">Loading results…</div>;

  // Small graphs round two k percentages to the same k; keep the first measurement.
  const seen = new Set<number>();
  const slice = rows
    .filter((r) => r.density === density && r.vertex_count === n)
    .sort((a, b) => a.k - b.k)
    .filter((r) => !seen.has(r.k) && seen.add(r.k));
  const xs = slice.map((r) => (r.k / n) * 100);
  const unit = pickUnit(Math.max(...slice.flatMap((r) => [r.dijkstra_median_ms, r.fwr_median_ms])));

  // Where Dijkstra (run k times) stops being faster than one Floyd-Warshall-Roy run.
  const gap = slice.map((r) => r.dijkstra_median_ms - r.fwr_median_ms);
  let crossover: number | null = null;
  for (let i = 1; i < gap.length && crossover === null; i++) {
    if (gap[i - 1] < 0 && gap[i] >= 0) crossover = xs[i - 1] + ((xs[i] - xs[i - 1]) * -gap[i - 1]) / (gap[i] - gap[i - 1]);
  }
  const fwrAlwaysFaster = gap.length > 0 && gap[0] >= 0;

  const headline = crossover !== null
    ? <>With <strong>{n}</strong> vertices at <strong>{density * 100}%</strong> density, Floyd-Warshall-Roy is faster once k passes about <strong>{Math.round(crossover)}%</strong> of n.</>
    : fwrAlwaysFaster
      ? <>With <strong>{n}</strong> vertices at <strong>{density * 100}%</strong> density, Floyd-Warshall-Roy is faster for every k measured.</>
      : <>With <strong>{n}</strong> vertices at <strong>{density * 100}%</strong> density, running Dijkstra k times stays faster for every k measured.</>;

  return (
    <Frame
      source={source}
      headline={headline}
      controls={
        <>
          <Control label="Edge density">
            <div role="group" aria-label="Edge density" className="flex flex-wrap gap-2">
              {DENSITIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDensity(d)}
                  aria-pressed={d === density}
                  className={`rounded-sm border px-2 py-1 uppercase tracking-[0.2em] focus-visible:outline-2 focus-visible:outline-accent ${d === density ? 'border-accent text-accent' : 'border-neutral-600 text-neutral-300 hover:border-white hover:text-white'}`}
                >
                  {d * 100}%
                </button>
              ))}
            </div>
          </Control>
          <Control label={<label htmlFor="sp-n">Vertices</label>}>
            <input id="sp-n" type="range" min={25} max={500} step={25} value={n} onChange={(e) => setN(Number(e.target.value))} className={rangeClass} aria-valuetext={`${n} vertices`} />
            <span className="viewer-mono text-neutral-300" style={{ fontVariantNumeric: 'tabular-nums' }}>n = {n}</span>
          </Control>
        </>
      }
      chart={
        <LineChart
          label={`Time to find shortest paths from k sources against k as a percentage of n, for ${n} vertices at ${density * 100}% density`}
          xs={xs}
          xDomain={[0, 100]}
          xTicks={[0, 20, 40, 60, 80, 100]}
          formatX={(v) => `${Math.round(v)}%`}
          xTitle="k as a share of n"
          unit={unit.label}
          marker={crossover !== null ? { x: crossover, label: `Crossover ≈ ${Math.round(crossover)}%` } : undefined}
          series={[
            { id: 'fwr', label: 'Floyd-Warshall-Roy, once', color: SERIES.winner, values: slice.map((r) => r.fwr_median_ms * unit.perMs) },
            { id: 'dijkstra', label: 'Dijkstra, k times', color: SERIES.loser, values: slice.map((r) => r.dijkstra_median_ms * unit.perMs) },
          ]}
        />
      }
    />
  );
}

export type ExplorerKind = 'hash-tables' | 'shortest-paths';

export default function BenchmarkExplorer({ kind, fallback }: { kind: ExplorerKind; fallback: ReactNode }) {
  return kind === 'hash-tables' ? <HashTableExplorer fallback={fallback} /> : <ShortestPathExplorer fallback={fallback} />;
}
