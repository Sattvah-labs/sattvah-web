# Deferred routes — restored after we move off static export

Two route groups live here because they're incompatible with
`next.config.js → output: 'export'` (Next 14 static export):

- `community-original/` — listing + post detail, uses `searchParams`
  and runtime API fetches
- `experts-original/` — listing + detail, same shape

Routes outside `src/app/` aren't compiled, so the marketing site builds
clean while these wait.

## To restore later, pick one:

1. **Move to Vercel hosting** — restore the directories under `src/app/`,
   remove `output: 'export'` from `next.config.js`, deploy via Vercel.
   Full SSR + ISR available.

2. **Stay on CloudFront, convert to client-side** — restore the
   directories, add `'use client'` to the top of each `page.tsx`,
   refactor data-fetching into `useEffect` + the existing `@/lib/api`
   client. Lose server-rendered metadata; you'd build `<head>` tags
   client-side or via `generateMetadata` in a separate parent layout.

3. **Stay on CloudFront, pre-render at build time** — restore the
   directories, replace the empty `generateStaticParams` with a real
   fetch from the Sattvah API at build time, build CI picks up new
   posts/experts and redeploys.

## Why this exists
Static export caught these errors during the Sattvah migration build.
Shipping landing + about + privacy + terms first; deep-link pages second.
