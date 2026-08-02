# Dream Neighborhood Schools — Embed Guide

How to add the **School Rating Explorer** widget to listing or neighborhood pages
on your website. The widget shows nearby school ratings scoped to the page's
address, which it scrapes automatically.

**Live version of this guide:** [embed.html](https://wdmtaj-realty.netlify.app/embed.html)

---

## The snippet

### Popup (floating bubble) — site-wide

Add this once, anywhere on the page (the shared `<head>` or just before
`</body>`). A floating explorer button appears in the corner and opens a
chrome-less explorer when clicked:

```html
<script src="https://staging.dreamneighborhood.com/explorer/sdk.js" async></script>
```

This single tag is the whole popup install. It resolves the site's subscription
and shows either the **Neighborhood Explorer** or the **School Rating
Explorer** — when the site isn't entitled to the Neighborhood Explorer, the SDK
loads the Schools widget itself, so there is no second popup snippet to paste.

### Inline School Rating Explorer

Add a container **before** the script. The explorer renders directly in that
container instead of as a floating bubble:

```html
<div id="dream-schools-explorer"></div>
<script src="https://dream-schools-preview-b6b5fcaf4493.herokuapp.com/embed.js" async></script>
```

The inline container is auto-detected via any of:

- `#dream-schools-explorer`
- `.dream-schools-explorer`
- `[data-dream-schools-explorer]`

### Inline Neighborhood Explorer

Same idea, with the Neighborhood Explorer's own container and script:

```html
<div id="dn-explorer"></div>
<script src="https://staging.dreamneighborhood.com/explorer/inline.js" async></script>
```

### Popup vs inline — important

The SDK **self-detects** which mode to use: if it finds an inline container
anywhere on the page it mounts **inline**; otherwise it shows the **popup**
bubble. A single page is therefore *either* popup *or* inline — putting an inline
container on a page turns off the floating bubble for that page. Use the popup
site-wide and the inline embed on the specific listing/neighborhood pages where
you want the explorer rendered in the layout.

---

## How it works

1. Resolves per-host config from `GET /api/embed/config?host=…` (unregistered
   hosts get a permissive default with `enabled: true`).
2. Best-effort scrapes the page address (see scraping order below).
3. Sends `{page_url, page_title, page_address}` to `POST /api/embed/scrape`,
   which validates + server-side geocodes and returns `{address, lat, lon}`.
4. Opens the explorer iframe at `/embed` scoped to that address.

All endpoints live on `https://dream-schools-preview-b6b5fcaf4493.herokuapp.com`
and are CORS / iframe enabled, so `embed.js` works from any host over https.

---

## Address scraping order

The SDK tries these sources in order and uses the first that yields an address:

1. `document.title` (e.g. `123 Main St, City, ST 12345` or `123 Main St in City, ST`)
2. Structured data: JSON-LD `PostalAddress`, then `og:` address meta, then
   `itemprop` microdata
3. Visible body text — **only** when `data-search-page-content="true"` is set
4. Page footer (`<footer>` / `[class*="footer"]`)
5. URL slug (e.g. `…/123-main-st-city-st-12345`)
6. Neighborhood / city from the title or URL (resolved server-side)
7. The host's configured default address (set in the admin)
8. Manual entry inside the explorer

> Tip: because `document.title` is checked first, the most reliable thing you can
> do is put the full address in the page title.

This demo site has a page that isolates **each** of these paths — see
[neighborhoods/test-index.html](neighborhoods/test-index.html).

---

## Optional `data-*` overrides

Set these on the `<script>` tag (popup) **or** on the inline container. They
override the server-resolved per-host config.

| Attribute | Purpose |
|-----------|---------|
| `data-partner-id` | Partner identifier |
| `data-widget-number` | Which configured widget to load (default `1`) |
| `data-accent-color` | Accent color, e.g. `#1fa55f` |
| `data-position` | Bubble side: `left` or `right` (popup) |
| `data-bottom-offset` | Extra bottom offset in px (popup) |
| `data-tooltip-message` | Bubble tooltip text; supports `{{address}}` |
| `data-require-address` | `true` to hide the popup when no address resolves |
| `data-search-page-content` | `true` to allow scraping visible body text |
| `data-suppress-on-inline` | `true` to hide the popup when an inline embed is present |
| `data-min-height` | Inline iframe min-height in px |
| `data-show-header` | `true` to show the explorer header in inline mode |
| `data-address` | Hard-code the address (skips scraping) |
| `data-lat` / `data-lng` | Hard-code coordinates (skips geocoding) |
| `data-api-base` | Override the API origin (advanced / testing) |

> **Environments:** this site points at the **staging** Neighborhood Explorer
> (`staging.dreamneighborhood.com`) and the **preview** Schools build
> (`dream-schools-preview-b6b5fcaf4493.herokuapp.com`). If you need to point at a
> different backend, set `data-api-base` on the script/container.

---

## Layout rules (inline embeds)

**Put the inline embed in its own full-width section — not inside a content
column or sidebar layout.** If the snippet sits inside a narrow column (for
example Bootstrap `.col-lg-8`), the explorer is squeezed to that column width and
may look broken.

Do **not** place the snippet inside:

- Bootstrap columns (`.col-*`, `.col-lg-8`, etc.)
- Side-by-side layouts (main content + sidebar)
- Fixed-width wrappers, cards, or `max-width` containers
- Parents with `overflow: hidden`

### Bad example

```html
<div class="container">
  <div class="row">
    <div class="col-lg-8">
      <h1>Neighborhood Name</h1>
      <div id="dream-schools-explorer"></div>  <!-- constrained — do not do this -->
      <script src="https://dream-schools-preview-b6b5fcaf4493.herokuapp.com/embed.js" async></script>
    </div>
    <div class="col-lg-4">Sidebar</div>
  </div>
</div>
```

### Recommended layout (Bootstrap)

Split the page into three sections: intro, full-width explorer, remaining content.

```html
<!-- Page intro (normal width) -->
<div class="container pt-5">
  <h1>Georgetown</h1>
  <p class="lead">Neighborhood description...</p>
</div>

<!-- Explorer: full page width -->
<div class="container-fluid px-0">
  <div id="dream-schools-explorer"></div>
  <script src="https://dream-schools-preview-b6b5fcaf4493.herokuapp.com/embed.js" async></script>
</div>

<!-- Rest of page (normal width) -->
<div class="container pb-5">
  <p>More neighborhood details...</p>
</div>
```

### Pages with a sidebar

Keep the sidebar with the page intro only. Place the explorer in a **separate
full-width block below** that row.

```html
<div class="container pt-5">
  <div class="row">
    <div class="col-lg-8"><h1>Agent Name</h1><p class="lead">Bio...</p></div>
    <div class="col-lg-4"><!-- contact card --></div>
  </div>
</div>

<div class="container-fluid px-0">
  <div id="dream-schools-explorer"></div>
  <script src="https://dream-schools-preview-b6b5fcaf4493.herokuapp.com/embed.js" async></script>
</div>

<div class="container pb-5">
  <div class="row"><div class="col-lg-8"><!-- remaining content --></div></div>
</div>
```

### Optional CSS

After the HTML structure is correct, this helps the iframe fill the section:

```css
#dream-schools-explorer,
#dream-schools-explorer iframe {
  width: 100%;
  max-width: 100%;
  display: block;
}
```

**CSS alone cannot fix** a snippet placed inside a narrow column, and avoid
`width: 100vw; margin-left: -50vw;` breakout hacks — fix the HTML layout instead.

---

## Pre-launch checklist

| Check | |
|-------|---|
| Inline snippet is **not** inside `.col-*` or a sidebar column | ☐ |
| Inline snippet is in its own full-width block | ☐ |
| No `overflow: hidden` on parents wrapping the explorer | ☐ |
| Only **one** inline container per page | ☐ |
| Address is present on the page (title, structured data, footer, or slug) | ☐ |

---

## Example pages

Working inline embed examples on this demo site:

- [Schools](schools.html) — inline School Rating Explorer, tall full-page layout
- [Neighborhood](neighborhood.html) — inline Neighborhood Explorer, tall full-page layout

Every other page on the site carries the one-line popup tag and nothing else.

Isolated scraping-path examples and the full test matrix:
[neighborhoods/test-index.html](neighborhoods/test-index.html).

---

## Deploying (Netlify)

This repo auto-deploys via Netlify:

- Pushes to `main` publish **production**: <https://wdmtaj-realty.netlify.app>
- Every pull request gets a **Deploy Preview** at
  `https://deploy-preview-<n>--wdmtaj-realty.netlify.app`

It's a static site — no build step or config is needed; Netlify just publishes
the files, and the explorer scripts load from their hosted origins over https on
any host. The widget renders on any host (unknown hosts get the permissive
`enabled: true` default), so a Deploy Preview URL is a perfectly good live test
host.

If you register a per-host default address in the Schools admin
(<https://app.dreamneighborhoodschools.com>), register the host you'll actually
test on — production is `wdmtaj-realty.netlify.app`; previews are
`deploy-preview-<n>--wdmtaj-realty.netlify.app`.

---

## Admin (optional)

<https://app.dreamneighborhoodschools.com> (password-gated) lets you set a
per-host default address, accent color, and position. You don't need it for
basic testing because unregistered hosts already render with a permissive
default.

---

## Support

Questions? Contact **bill@dreamneighborhood.com** or call **678-404-2660**.
