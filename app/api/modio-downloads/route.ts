import { NextRequest, NextResponse } from 'next/server';
import { modIoMods } from '@/lib/modio';

/*
  Returns the total download count for one of the mods in lib/modio.ts.
  mod.io requires an API key, which stays on the server. Counts are cached for an hour
  so page views don't spend the key's rate limit.
*/

const API_URL = 'https://u-2620924.modapi.io/v1';
const GAME = '@skaterxl';

export async function GET(req: NextRequest) {
  const modId = Number(req.nextUrl.searchParams.get('mod'));
  if (!modIoMods.some((m) => m.id === modId)) {
    return NextResponse.json({ error: 'Unknown mod' }, { status: 404 });
  }

  const apiKey = process.env.MOD_IO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Stats unavailable' }, { status: 503 });
  }

  const res = await fetch(
    `${API_URL}/games/${GAME}/mods/${modId}/stats?api_key=${encodeURIComponent(apiKey)}`,
    { next: { revalidate: 3600 } },
  ).catch(() => undefined);
  const stats: { downloads_total?: number } | undefined = res?.ok ? await res.json() : undefined;

  if (typeof stats?.downloads_total !== 'number') {
    return NextResponse.json({ error: 'Stats unavailable' }, { status: 502 });
  }

  return NextResponse.json(
    { downloads: stats.downloads_total },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
  );
}
