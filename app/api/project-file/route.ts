import { NextRequest, NextResponse } from 'next/server';
import { createHighlighter, type ThemeRegistration } from 'shiki';
import { schoolProjects, resolveFile } from '@/lib/schoolworkData';

/*
  Returns one source file from a school project as syntax-highlighted HTML.
  Only files listed in lib/schoolworkData.ts can be requested. PDFs are served
  to the viewer directly from jsDelivr and never pass through here.
*/

// Site palette: neutral greys with the accent for keywords.
const theme: ThemeRegistration = {
  name: 'dryd3n',
  type: 'dark',
  colors: { 'editor.background': '#0a0a0a', 'editor.foreground': '#d4d4d4' },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#737373', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.other'], settings: { foreground: '#f76855' } },
    { scope: ['string', 'string.quoted', 'punctuation.definition.string'], settings: { foreground: '#e8b4a6' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character', 'support.constant'], settings: { foreground: '#f0a58f' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#ffffff' } },
    { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'], settings: { foreground: '#d6d3d1' } },
    { scope: ['keyword.operator', 'punctuation'], settings: { foreground: '#a3a3a3' } },
    { scope: ['entity.name.tag'], settings: { foreground: '#f76855' } },
    { scope: ['entity.other.attribute-name'], settings: { foreground: '#d6d3d1' } },
  ],
};

const languages: Record<string, string> = {
  js: 'javascript', html: 'html', py: 'python', c: 'c', h: 'c', java: 'java', asm: 'asm',
};

let highlighter: ReturnType<typeof createHighlighter> | undefined;
const getHighlighter = () =>
  (highlighter ??= createHighlighter({ themes: [theme], langs: [...new Set(Object.values(languages))] }));

const rawUrl = (repo: string, path: string) =>
  `https://raw.githubusercontent.com/Dryd33n/${repo}/HEAD/${path.split('/').map(encodeURIComponent).join('/')}`;

// Some assignment headers include a student number; keep it off the site.
const redactStudentId = (source: string) =>
  source
    .replace(/^(.*student\s*(?:number|no\.?|id)\s*:?\s*).+$/gim, '$1[removed]')
    .replace(/\bV0\d{7}\b/g, '[removed]');

export async function GET(request: NextRequest) {
  const project = schoolProjects.find((p) => p.slug === request.nextUrl.searchParams.get('project'));
  const file = request.nextUrl.searchParams.get('file') ?? '';
  const location = project && resolveFile(project, file);
  const language = languages[file.split('.').pop()?.toLowerCase() ?? ''];

  if (!location || !language) {
    return NextResponse.json({ error: 'That file is not part of this project.' }, { status: 404 });
  }

  const upstream = await fetch(rawUrl(location.repo, location.path), { next: { revalidate: 86400 } });
  if (!upstream.ok) {
    return NextResponse.json({ error: `GitHub returned ${upstream.status} for this file.` }, { status: 502 });
  }
  const source = redactStudentId((await upstream.text()).replace(/\r\n/g, '\n'));
  const html = (await getHighlighter()).codeToHtml(source, { lang: language, theme: 'dryd3n' });

  return NextResponse.json(
    { html },
    { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } },
  );
}
