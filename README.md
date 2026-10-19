# AURADE

A complete JavaScript Next.js App Router demonstration storefront inspired by the emerald, ivory and champagne landing-page concept. Plain CSS, reusable React components, no UI framework, no TypeScript, no payment keys required.

## Run locally

Requires Node.js 20.9 or newer and npm. From this folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

```bash
npm run lint
npm test
npm run build
npm start
```

If package-lock.json is included, use `npm ci` for repeatable installs. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your public origin before deployment. Restart/rebuild after changing it. This controls metadata, robots and sitemap URLs, not payment settings.

## Included

- Responsive editorial homepage, mobile navigation and accessible skip link.
- Four illustrative watch products with separate `/watches/[id]` detail routes.
- Server-rendered product routes, metadata and not-found handling.
- Search, collection filters and price/name sorting.
- Four collection pages and a collection index.
- Strap choices, quantity controls and catalog-based stock caps.
- Persistent localStorage bag and wishlist; validation, hydration guard, storage-failure notice and cross-tab synchronization.
- Cart line editing, removal, demo shipping threshold and order summary.
- Validated demo checkout and tab-local receipt. No card fields, payment, email, fulfillment or backend.
- About, journal index, two article pages, contact and sell/trade inquiry UI.
- Shipping, returns, care, FAQ, privacy and terms pages. These explain the demo, not legally reviewed retail policies.
- Loading/error/404 states, sitemap, robots, favicon, reduced-motion support and image error fallback.
- Node unit tests and Playwright desktop/mobile interaction tests.

## Structure

```text
app/                    Route entry points and global CSS
  watches/[id]/         Individual watch details
  collections/[slug]/   Collection-specific product lists
  journal/[slug]/       Editorial articles
  support/[slug]/       Information pages
components/             Reusable UI and client interactions
lib/catalog.js          Product/collection data, images, money, shipping
lib/cart.js             Pure cart reducer and saved-state validation
lib/content.js          Editorial and support content
components/StoreProvider.js  Shopping state and persistence
components/CheckoutForm.js   Explicit demo checkout boundary
tests/                  Pure Node unit tests
e2e/                    Browser tests
```

## Browser tests

```bash
npx playwright install chromium
npm run test:e2e
```

The configuration starts the dev server automatically and runs desktop Chromium plus a mobile viewport. Tests cover product routes, wishlist persistence, cart persistence, demo checkout, filters, search, invalid routes and corrupt localStorage recovery. See VALIDATION.md for checks actually executed in the delivery environment. Included tests are not automatically a claim that all tests passed.

## Customize

1. Edit `lib/catalog.js` for actual products, stable IDs, integer-paisa prices, stock, strap options and images. Add multiple accurate images to a product's `images` array to enable gallery thumbnails.
2. Edit CSS variables at the top of `app/globals.css` for brand colors and fonts.
3. Replace remote photos with accurate, licensed local files in `public/images`, then set catalog image paths to `/images/your-photo.jpg`. Keep a photo for every actual variant if you need image switching.
4. Edit `lib/content.js` for editorial and information content.
5. Change the formatter in `lib/catalog.js` to change currency. Also update hard-coded PKR labels, demo shipping text, thresholds and sample prices consistently (amounts are stored as integer paisa, i.e. 1/100 PKR). Changing a currency symbol alone does not convert prices.
6. Connect the contact, trade and newsletter forms to a validated backend before removing demo acknowledgements.

## Important production boundary

This is a complete frontend demo, not a production commerce backend. It has no authentication, database, real-time inventory, real order storage, payment integration, email delivery, admin panel or tax engine. Local state can be modified by users and must never authorize a real charge or inventory allocation.

Before taking payments: implement server-authoritative pricing and inventory, authenticated order access, a secure hosted payment provider, verified payment webhooks with idempotency, shipping/tax calculation, fulfillment, transactional email, abuse controls, monitoring and legally reviewed policies. Never trust client totals or use this demo receipt as proof of payment.

Stock is shared across strap options in the sample catalog, not independently tracked per variant. Browser tabs synchronize with last-write-wins semantics; simultaneous edits are not transaction-safe. Real inventory needs server-side reservation and concurrency control.

Checkout contact/address fields are not persisted by this application. The receipt in sessionStorage stores product details, totals, a timestamp and a generated demo reference only. Newsletter/contact/trade forms do not send or save submissions. No fake customer reviews, authenticity guarantees or sustainability claims are included.

## Images and fonts

See IMAGE_SOURCES.md. Remote images and Google Fonts require internet access; readable system-font and image-error fallbacks are provided. The supplied photographs are clear visual references, but are not guaranteed to match fictional product specifications or strap options. Replace them with your actual inventory photos before launch.

## Deployment

Deploy as a standard Node-hosted Next.js application or import the repository into a compatible Next.js hosting service. Build command: `npm run build`. Start command for a Node host: `npm start`. Install dependencies before building. Do not expose secrets through NEXT_PUBLIC variables.
