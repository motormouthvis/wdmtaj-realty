# Production embeds

This production-test realtor site (**DN Production Test**) features **only** popup + embedded School Explorer and popup + embedded Neighborhood Explorer.

**Public email:** bill@millermailbox.com  
**Live Netlify hostname:** https://dn-productiontest.netlify.app  
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
<div id="dn-explorer" data-min-height="900"></div>
<script src="https://app.dreamneighborhood.com/explorer/inline.js" async></script>
```

Full variant: add `data-variant="full"` on `#dn-explorer`.

### Embedded School Explorer

If a dedicated schools embed is included, use the production schools host:

```html
<div id="dream-schools-explorer" data-min-height="900"></div>
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

- Published URL: https://dn-productiontest.netlify.app
- Do not change that hostname
- Deploy previews: `https://deploy-preview-<n>--dn-productiontest.netlify.app`

The GitHub repo stays `wdmtaj-realty`.
