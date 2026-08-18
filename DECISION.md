# Decision note

## Why this structure

This repo is the **production-test** realtor host. Customers on production still see Neighborhood v259 / detector v6, so snippets must load from `app.dreamneighborhood.com`. The site still needed the same **format** as the public staging-test realtor site ([bills-fp-realty-co](https://github.com/motormouthvis/bills-fp-realty-co), live at https://bills-fp-realty-co.netlify.app and `/neighborhoods`).

## What was matched

Inspected the bills-fp-realty-co repo and live site, then copied:

- Nav: Home, Buy, **Neighborhood (T)**, **Neighborhood (F)**, **Schools (T)**, **Schools (M)** — no giant neighborhoods dropdown
- Page layout: breadcrumb intro + `container` for the inline embed (not a tall full-bleed Schools/Neighborhood page)
- How embeds are featured: those four pages load an inline explorer **and** the popup SDK; every other page loads the popup only
- Listing and area page chrome (card grid, listing two-column layout, area hero + sidebar)

The GitHub repo name stays `wdmtaj-realty`. Hardcoded Netlify URLs use `dn-productiontest.netlify.app`.

## Snippet host

Production only:

- Popup: `https://app.dreamneighborhood.com/explorer/sdk.js`
- Embedded Neighborhood Explorer: `https://app.dreamneighborhood.com/explorer/inline.js`
- Embedded School Explorer: `https://www.dreamneighborhoodschools.com/embed.js`

No `staging.dreamneighborhood.com` and no preview Schools Heroku host.

## Test-page intent

Added a few clearly fake/test listing and area pages so production address detection can be flexed without pretending they are live inventory:

| Path | Intent |
| --- | --- |
| `/properties/3335-cunningham-rd-le-grand-ca-95333.html` | Listing, street in URL. Doherty-style: real MLS house at 3335 Cunningham Rd, Le Grand, CA 95333; street file incomplete. Marked TEST. |
| `/properties/test-listing-8841.html` | Listing, no street in URL. Address only in title/heading. |
| `/properties/214-oak-st-austin-tx-78702.html` | Listing, street in URL. Fake. |
| `/neighborhoods/hollywood-hills.html` | Hollywood Hills-style area page. Title-only place name. No street in URL. |
| `/neighborhoods/echo-park.html` | Neighborhood/area page. Title-only place name. |
| `/neighborhoods/8800-sunset-blvd-west-hollywood-ca.html` | Neighborhood/area page with a street in the URL. |

`/neighborhood.html` redirects to `/neighborhoods.html` so old links still work.
