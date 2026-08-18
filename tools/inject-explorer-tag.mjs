#!/usr/bin/env node
/**
 * Injects the production Dream Neighborhood popup tag into every published page.
 *
 * The realtor-facing install is one snippet: snippets/explorer-tag.html
 * (https://app.dreamneighborhood.com/explorer/sdk.js).
 * Pages that already include the tag are left unchanged.
 *
 * Also flips leftover staging / Heroku preview hosts to production, then fails
 * the build if any forbidden snippet host remains.
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SNIPPET_FILE = join(ROOT, 'snippets', 'explorer-tag.html');

const SKIP_DIRS = new Set(['.git', 'libs', 'node_modules', 'snippets', 'tools']);

const HOST_FLIPS = [
  ['https://staging.dreamneighborhood.com/explorer/sdk.js', 'https://app.dreamneighborhood.com/explorer/sdk.js'],
  ['https://staging.dreamneighborhood.com/explorer/inline.js', 'https://app.dreamneighborhood.com/explorer/inline.js'],
  ['https://dream-schools-preview-b6b5fcaf4493.herokuapp.com/embed.js', 'https://www.dreamneighborhoodschools.com/embed.js'],
];

const FORBIDDEN_HOST_SNIPPETS = [
  'staging.dreamneighborhood.com',
  'herokuapp.com/embed',
];

async function htmlPages(dir) {
  const pages = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      pages.push(...(await htmlPages(join(dir, entry.name))));
    } else if (entry.name.endsWith('.html')) {
      pages.push(join(dir, entry.name));
    }
  }
  return pages;
}

const tag = (await readFile(SNIPPET_FILE, 'utf8')).trim();
if (!tag) {
  throw new Error('snippets/explorer-tag.html is empty — nothing to serve on the site.');
}

const pages = (await htmlPages(ROOT)).sort();

let injected = 0;
let already = 0;
let flipped = 0;

for (const page of pages) {
  let html = await readFile(page, 'utf8');
  let next = html;
  for (const [from, to] of HOST_FLIPS) {
    if (next.includes(from)) {
      next = next.split(from).join(to);
    }
  }
  if (next !== html) {
    await writeFile(page, next);
    html = next;
    flipped++;
  }

  if (html.includes('app.dreamneighborhood.com/explorer/sdk.js')) {
    already++;
    continue;
  }

  const close = html.lastIndexOf('</body>');
  if (close === -1) {
    throw new Error(`${relative(ROOT, page)} has no </body> to inject the explorer tag into.`);
  }

  const indent = /(^|\n)([ \t]*)<\/body>/.exec(html.slice(0, close + 7))?.[2] ?? '';
  await writeFile(page, `${html.slice(0, close)}${indent}    ${tag}\n${indent}${html.slice(close)}`);
  injected++;
}

const leftover = [];
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const bad of FORBIDDEN_HOST_SNIPPETS) {
    if (html.includes(bad)) {
      leftover.push(`${relative(ROOT, page)} still points at ${bad}`);
    }
  }
}
if (leftover.length) {
  throw new Error(
    `Production-test site must not ship staging or Heroku preview snippet hosts:\n- ${leftover.join('\n- ')}`
  );
}

console.log(
  `Explorer tag injected into ${injected} page(s); ${already} page(s) already had the production popup; flipped ${flipped} leftover staging/preview host(s).`
);
