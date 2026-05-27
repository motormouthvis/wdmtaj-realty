# Dream Neighborhood — Inline Explorer Embed Guide

Instructions for adding the inline neighborhood map to listing or neighborhood pages on your website.

**Live version of this guide:** [embed.html](https://wdmtaj-realty.netlify.app/embed.html)

---

## The embed snippet

Add this once per page, where the map should appear:

```html
<div id="dn-explorer"></div>
<script src="https://app.dreamneighborhood.com/explorer/inline.js" async></script>
```

For staging/testing, use:

```html
<script src="https://staging.dreamneighborhood.com/explorer/inline.js" async></script>
```

The script auto-detects the property or neighborhood address from the page content, the same way the popup SDK does.

Optional: include the popup SDK in your page `<head>` if you also want the floating explorer button:

```html
<script src="https://app.dreamneighborhood.com/explorer/sdk.js" async></script>
```

---

## Most important rule

**Put the embed in its own full-width section — not inside a content column or sidebar layout.**

If the snippet sits inside a narrow column (for example Bootstrap `.col-lg-8`), the map will be squeezed to that column width and may look broken with empty space beside it.

---

## What to avoid

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
      <div id="dn-explorer"></div>
      <script src="https://app.dreamneighborhood.com/explorer/inline.js" async></script>
    </div>
    <div class="col-lg-4">Sidebar</div>
  </div>
</div>
```

The explorer is constrained to ~66% of the page width.

---

## Recommended layout (Bootstrap)

Split the page into three sections: intro, full-width explorer, remaining content.

```html
<!-- Page intro (normal width) -->
<div class="container pt-5">
  <h1>Georgetown</h1>
  <p class="lead">Neighborhood description...</p>
</div>

<!-- Explorer: full page width -->
<div class="container-fluid px-0">
  <div id="dn-explorer"></div>
  <script src="https://app.dreamneighborhood.com/explorer/inline.js" async></script>
</div>

<!-- Rest of page (normal width) -->
<div class="container pb-5">
  <p>More neighborhood details...</p>
</div>
```

---

## Recommended layout (no Bootstrap)

```html
<section class="page-intro">
  <h1>Georgetown</h1>
  <p>Neighborhood description...</p>
</section>

<section style="width: 100%; max-width: 100%;">
  <div id="dn-explorer"></div>
  <script src="https://app.dreamneighborhood.com/explorer/inline.js" async></script>
</section>

<section class="page-content">
  <p>More details...</p>
</section>
```

---

## Pages with a sidebar

Keep the sidebar with the page intro only. Place the explorer in a **separate full-width block below** that row.

```html
<div class="container pt-5">
  <div class="row">
    <div class="col-lg-8">
      <h1>Agent Name</h1>
      <p class="lead">Bio...</p>
    </div>
    <div class="col-lg-4">
      <!-- contact card -->
    </div>
  </div>
</div>

<div class="container-fluid px-0">
  <div id="dn-explorer"></div>
  <script src="https://app.dreamneighborhood.com/explorer/inline.js" async></script>
</div>

<div class="container pb-5">
  <div class="row">
    <div class="col-lg-8">
      <!-- remaining page content -->
    </div>
  </div>
</div>
```

---

## Optional CSS

After the HTML structure is correct, this helps the iframe fill the section:

```css
#dn-explorer,
#dn-explorer iframe {
  width: 100%;
  max-width: 100%;
  display: block;
}
```

**CSS alone cannot fix** a snippet placed inside a narrow column. Fix the HTML layout first.

---

## Do not use CSS "breakout" hacks

Avoid tricks like:

```css
width: 100vw;
margin-left: -50vw;
```

These often fail inside Bootstrap rows/columns, flexbox, grid, or any parent with `overflow: hidden`. Use proper HTML structure instead.

---

## Pre-launch checklist

| Check | |
|-------|---|
| Snippet is **not** inside `.col-*` or a sidebar column | ☐ |
| Snippet is in its own full-width block | ☐ |
| Page intro and body content stay in normal containers above/below | ☐ |
| No `overflow: hidden` on parents wrapping the explorer | ☐ |
| Only **one** `#dn-explorer` element per page | ☐ |
| Address is present on the page (visible text, map link, or structured data) | ☐ |

---

## Example pages

Working inline embed examples on this demo site:

- [Agent: Jane Doe (Detroit)](neighborhoods/agent-jane-doe-detroit.html) — sidebar layout
- [Areas: Georgetown](neighborhoods/areas-georgetown.html) — single-column layout
- [Community #15](neighborhoods/community-15.html) — map + sidebar layout

---

## Support

Questions? Contact **bill@dreamneighborhood.com** or call **678-404-2660**.
