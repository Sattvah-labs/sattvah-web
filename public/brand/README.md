# Brand assets

Single source of truth for the site's visual identity. Replace these
files to rebrand the entire site, no code change needed.

| File | Used by |
| --- | --- |
| `mark.svg`             | `<BrandMark/>` (color), browser favicon, PWA manifest |
| `mark-mono.svg`        | `<BrandMark mono/>` (monochrome surfaces) |
| `icon-192.png`         | PWA manifest (Android home screen) |
| `icon-512.png`         | PWA manifest |
| `icon-maskable.png`    | PWA manifest (Android adaptive icon) |
| `apple-touch-icon.png` | iOS home screen (180x180) |
| `favicon.ico`          | Legacy browser favicon (Windows, older clients) |

References:
- `src/app/layout.tsx` → `metadata.icons`
- `public/manifest.webmanifest` → `icons`
- `src/components/brand-mark.tsx` → inline render
