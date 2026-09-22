import { NextRequest, NextResponse } from 'next/server';
import { createHighlighter, type ThemeRegistration } from 'shiki';
import { marked } from 'marked';
import { courses } from '@/lib/schoolworkData';

/*
  Returns one file from a course repo as ready-to-display HTML: source files are
  syntax-highlighted, READMEs are rendered from Markdown. Only files listed in
  lib/schoolworkData.ts can be requested. PDFs are served to the viewer directly
  from jsDelivr and never pass through here.
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

// Grades are kept off the site; the READMEs put them at the end of assignment headings,
// e.g. "## [Assignment 1](./a1) 147%" or "### [Assignment 1](a1.pdf) 39/40".
const stripGrades = (markdown: string) =>
  markdown.replace(/^(#{1,6} .*?)\s+\d+(?:\.\d+)?\s*(?:%|\/\s*\d+)\s*$/gm, '$1');

// Point README links and images at GitHub, and open links in a new tab.
function renderReadme(markdown: string, repo: string) {
  const html = marked.parse(stripGrades(markdown), { async: false }) as string;
  const isAbsolute = (url: string) => /^(https?:|mailto:|#)/.test(url);
  return html
    .replace(/<img([^>]*?)src="([^"]+)"/g, (_, attrs, src) => {
      const url = isAbsolute(src) ? src.replace(/^(https:\/\/github\.com\/[^/]+\/[^/]+)\/blob\//, '$1/raw/') : rawUrl(repo, decodeURIComponent(src));
      return `<img${attrs}src="${url}"`;
    })
    .replace(/<a href="([^"]+)"/g, (_, href) => {
      const url = isAbsolute(href) ? href : `https://github.com/Dryd33n/${repo}/blob/HEAD/${href.replace(/^\.\//, '')}`;
      return url.startsWith('#') ? `<a href="${url}"` : `<a target="_blank" rel="noopener noreferrer" href="${url}"`;
    });
}

export async function GET(request: NextRequest) {
  const course = courses.find((c) => c.slug === request.nextUrl.searchParams.get('course'));
  const file = request.nextUrl.searchParams.get('file') ?? '';
  const path = course?.files[file];
  const extension = file.split('.').pop()?.toLowerCase() ?? '';
  const isReadme = extension === 'md';

  if (!course || !path || (!isReadme && !languages[extension])) {
    return NextResponse.json({ error: 'That file is not part of this project.' }, { status: 404 });
  }

  const upstream = await fetch(rawUrl(course.repo, path), { next: { revalidate: 86400 } });
  if (!upstream.ok) {
    return NextResponse.json({ error: `GitHub returned ${upstream.status} for this file.` }, { status: 502 });
  }
  const text = await upstream.text();

  const html = isReadme
    ? renderReadme(text, course.repo)
    : (await getHighlighter()).codeToHtml(text.replace(/\r\n/g, '\n'), { lang: languages[extension], theme: 'dryd3n' });

  return NextResponse.json(
    { html },
    { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } },
  );
}
