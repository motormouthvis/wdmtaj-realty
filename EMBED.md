# Production embeds

This production-test realtor site features **only** popup + embedded School Explorer and popup + embedded Neighborhood Explorer.

**Write links as:** https://dn-productiontest.netlify.app  
**Current Netlify hostname (until William renames):** https://wdmtaj-realty.netlify.app  
**GitHub repo:** `wdmtaj-realty` (not renamed)

## Snippet host

Neighborhood Explorer / School Explorer tags load from **production** only: `https://app.dreamneighborhood.com` (`sdk.js` + `inline.js`).

Do not use `staging.dreamneighborhood.com`. Do not use the Heroku Schools preview.

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

If a dedicated schools embed is included, use the production schools host:

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

- Intended published URL: https://dn-productiontest.netlify.app
- Current hostname until rename: https://wdmtaj-realty.netlify.app
- Deploy previews today: `https://deploy-preview-<n>--wdmtaj-realty.netlify.app`
- After rename, previews: `https://deploy-preview-<n>--dn-productiontest.netlify.app`

The GitHub repo stays `wdmtaj-realty`.
