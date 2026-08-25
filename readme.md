# DN Production Test — production-test host

Fake / test realtor site used to show what customers see on **production** Neighborhood (v259 / detector v6).

- **Public site name:** DN Production Test (nav, titles, footer, meta, alt text)
- **Public email:** bill@millermailbox.com
- **Live Netlify hostname:** https://dn-productiontest.netlify.app
- **GitHub repo:** [motormouthvis/wdmtaj-realty](https://github.com/motormouthvis/wdmtaj-realty) (repo name stays `wdmtaj-realty`)
- **Snippet host:** `https://app.dreamneighborhood.com` (`sdk.js` + `inline.js`) — never `staging.dreamneighborhood.com`

## Featured embeds

Same format as [bills-fp-realty-co](https://github.com/motormouthvis/bills-fp-realty-co) / https://bills-fp-realty-co.netlify.app

| Page | What it features |
| --- | --- |
| `/neighborhoods.html` | Embedded Neighborhood Explorer (tabbed) + popup |
| `/neighborhoods-full.html` | Embedded Neighborhood Explorer (full) + popup |
| `/schools.html` | Embedded School Explorer (default) + popup |
| `/schools-minimalist.html` | Embedded School Explorer (minimalist) + popup |

Popup on every page (Neighborhood Explorer / School Explorer tag):

```html
<script src="https://app.dreamneighborhood.com/explorer/sdk.js"></script>
```

Embedded Neighborhood Explorer:

```html
<div id="dn-explorer" data-min-height="900"></div>
<script src="https://app.dreamneighborhood.com/explorer/inline.js" async></script>
```

Embedded School Explorer, when a dedicated embed is included, uses the **production** schools host — not the Heroku preview:

```html
<div id="dream-schools-explorer" data-min-height="900"></div>
<script src="https://www.dreamneighborhoodschools.com/embed.js" async></script>
```

Do not leave `staging.dreamneighborhood.com` or `dream-schools-preview-*.herokuapp.com` on any page.

Nothing else is featured (no other product widgets).

## Address-detection test pages

All marked TEST / fake. See [neighborhoods/test-index.html](neighborhoods/test-index.html) and [DECISION.md](DECISION.md).

## Template

Built on the eStateX Bootstrap real-estate template (MIT).
