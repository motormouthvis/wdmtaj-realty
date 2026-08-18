# Production embeds

This production-test realtor site features **only** popup + embedded School Explorer and popup + embedded Neighborhood Explorer.

**Live:** https://dn-productiontest.netlify.app  
**GitHub repo:** `wdmtaj-realty` (not renamed)

## Snippet host

All Neighborhood snippets load from **production**: `https://app.dreamneighborhood.com`.

### Popup

```html
<script src="https://app.dreamneighborhood.com/explorer/sdk.js"></script>
```

### Embedded Neighborhood Explorer

```html
<div id="dn-explorer"></div>
<script src="https://app.dreamneighborhood.com/explorer/inline.js" async></script>
```

Full variant: add `data-variant="full"` on `#dn-explorer`.

### Embedded School Explorer

```html
<div id="dream-schools-explorer"></div>
<script src="https://www.dreamneighborhoodschools.com/embed.js" async></script>
```

Minimalist variant: add `data-variant="minimalist"` on `#dream-schools-explorer`.

## Featured pages (bills-fp-realty-co format)

- [Neighborhood (T)](neighborhoods.html)
- [Neighborhood (F)](neighborhoods-full.html)
- [Schools (T)](schools.html)
- [Schools (M)](schools-minimalist.html)

Every other page carries the popup tag only.

## Netlify

- `main` publishes https://dn-productiontest.netlify.app
- Deploy previews: `https://deploy-preview-<n>--dn-productiontest.netlify.app`

The GitHub repo stays `wdmtaj-realty`.
