# Decision note

## Public name and email (authorized)

William authorized the public-facing site name and contact email on this production-test realtor host.

- **Public name:** DN Production Test. Buyers see this in nav, titles, footer, meta, and alt text. Do not show “Wdmtaj Realty” as the site name. The site stays clearly fake / test.
- **Public email:** bill@millermailbox.com (replaces bill@dreamneighborhood.com). Shown so William remembers the login.
- **Live hostname:** https://dn-productiontest.netlify.app — do not change it.
- **GitHub repo:** stays `motormouthvis/wdmtaj-realty`. Do not rename the repo.

## Why this structure

This repo is the **production-test** realtor host. Customers on production still see Neighborhood v259 / detector v6, so snippets must load from `app.dreamneighborhood.com`. The site still needed the same **format** as the public staging-test realtor site ([bills-fp-realty-co](https://github.com/motormouthvis/bills-fp-realty-co), live at https://bills-fp-realty-co.netlify.app and `/neighborhoods`).

## What was matched

Inspected the bills-fp-realty-co repo and live site, then copied:

- Nav: Home, Buy, **Neighborhood (T)**, **Neighborhood (F)**, **Schools (T)**, **Schools (M)** — no giant neighborhoods dropdown
- Page layout: breadcrumb intro + `container` for the inline embed (not a tall full-bleed Schools/Neighborhood page)
- How embeds are featured: those four pages load an inline explorer **and** the popup SDK; every other page loads the popup only
- Listing and area page chrome (card grid, listing two-column layout, area hero + sidebar)

Write site links as `https://dn-productiontest.netlify.app`. The GitHub repo name stays `wdmtaj-realty`.

## Snippet host

Production only. Neighborhood Explorer / School Explorer tags:

- Popup: `https://app.dreamneighborhood.com/explorer/sdk.js`
- Embedded Neighborhood Explorer: `https://app.dreamneighborhood.com/explorer/inline.js`

Dedicated School Explorer embed, if included, uses the production schools host:

- `https://www.dreamneighborhoodschools.com/embed.js`

No `staging.dreamneighborhood.com` and no preview Schools Heroku host (`dream-schools-preview-*.herokuapp.com`).

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
