import { NextRequest, NextResponse } from 'next/server';
import * as projects from '@/lib/projectsData';

/*
  Returns the download count for one of the Obsidian plugins in lib/projectsData.ts.
  Reads Obsidian's community stats first; a plugin not yet listed there falls back to
  the main.js download total across its GitHub releases (the file Obsidian installs).
  The stats file is ~2.5MB, over Next's fetch cache limit, so caching happens at the CDN.
*/

const STATS_URL = 'https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json';

const plugins = new Map(
  Object.values(projects)
    .filter((p): p is projects.ProjectData => typeof p === 'object' && !!p.obsidianPluginId)
    .map((p) => [p.obsidianPluginId!, p.links.find((l) => l.href.startsWith('https://github.com/'))?.href])
);

async function fromObsidian(pluginId: string): Promise<number | undefined> {
  const res = await fetch(STATS_URL, { cache: 'no-store' });
  if (!res.ok) return undefined;
  const stats: Record<string, { downloads?: number }> = await res.json();
  return stats[pluginId]?.downloads;
}

async function fromGitHub(repoUrl: string): Promise<number | undefined> {
  const repo = new URL(repoUrl).pathname.slice(1);
  const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, { cache: 'no-store' });
  if (!res.ok) return undefined;
  const releases: { assets: { name: string; download_count: number }[] }[] = await res.json();
  return releases
    .flatMap((r) => r.assets)
    .filter((a) => a.name === 'main.js')
    .reduce((sum, a) => sum + a.download_count, 0);
}

export async function GET(req: NextRequest) {
  const pluginId = req.nextUrl.searchParams.get('plugin') ?? '';
  if (!plugins.has(pluginId)) {
    return NextResponse.json({ error: 'Unknown plugin' }, { status: 404 });
  }

  const repoUrl = plugins.get(pluginId);
  const downloads = (await fromObsidian(pluginId).catch(() => undefined))
    ?? (repoUrl ? await fromGitHub(repoUrl).catch(() => undefined) : undefined);

  if (downloads === undefined) {
    return NextResponse.json({ error: 'Stats unavailable' }, { status: 502 });
  }

  return NextResponse.json(
    { downloads },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
  );
}
