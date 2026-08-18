#!/usr/bin/env node
/**
 * Injects the production Dream Neighborhood popup tag into every published page.
 *
 * The realtor-facing install is one snippet: snippets/explorer-tag.html
 * (https://app.dreamneighborhood.com/explorer/sdk.js).
 * Pages that already include the tag are left unchanged.
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SNIPPET_FILE = join(ROOT, 'snippets', 'explorer-tag.html');

const SKIP_DIRS = new Set(['.git', 'libs', 'node_modules', 'snippets', 'tools']);

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

for (const page of pages) {
  const html = await readFile(page, 'utf8');
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

console.log(
  `Explorer tag injected into ${injected} page(s); ${already} page(s) already had the production popup.`
);
