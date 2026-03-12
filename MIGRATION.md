# Cinolu Client — Migration Guide

> Angular 21 + PrimeNG Removal + Code Cleanup

---

## ✅ What's already done

### Angular 21 Upgrade
- All `@angular/*` packages updated from v20 → v21
- `@ngrx/signals` updated 20 → 21
- `@angular-eslint/*` updated to match Angular 21
- TypeScript bumped to `~5.9.3`
- `provideAnimations()` replaced with `provideAnimationsAsync()`

### PrimeNG Removal
- `primeng`, `@primeng/themes`, `primeicons` uninstalled
- `providePrimeNG` removed from `app.config.ts`
- PrimeNG CSS imports removed from `styles.css`
- `src/app/shared/config/primeng.config.ts` deleted
- `src/styles/overrides/primeng.css` deleted (251 lines)
- All 142 affected files migrated away from PrimeNG imports

### Local UI Components
Created in `src/app/shared/ui/` — import via `@shared/ui`:

| Component | Selector | Replaces |
|---|---|---|
| `ButtonComponent` | `ui-button` | `pButton`, `p-button` |
| `InputComponent` | `ui-input` | `pInputText`, `p-inputtext` |
| `SelectComponent` | `ui-select` | `p-dropdown`, `p-select`, `p-multiselect` |
| `DialogComponent` | `ui-dialog` | `p-dialog`, `p-confirmDialog` |
| `BadgeComponent` | `ui-badge` | `p-badge` |
| `TagComponent` | `ui-tag` | `p-tag` |
| `SpinnerComponent` | `ui-spinner` | `p-progressSpinner` |
| `CardComponent` | `ui-card` | `p-card` |
| `PaginationComponent` | `ui-pagination` | `p-paginator` |
| `GalleryComponent` | `ui-gallery` | `p-galleria` |

All components are standalone and use Tailwind CSS v4.

### Code Cleanup
- `app.routes.server.ts` simplified — no more `RenderMode.Prerender` wildcard
- `app.provider.ts` — `auth/me` HTTP call guarded for SSR (`isPlatformBrowser`)
- `IS_DISCOVERING_ROUTES` injection guard added during route extraction
- Circular dependency removed (`APP_CONFIG` token was importing `appConfig` back into `app.provider.ts`)
- `ServerTranslateLoader` added to `app.config.server.ts` (reads i18n files via `fs.readFileSync` — no HTTP during SSR)

---

## 🔧 Remaining: 1 Fix Required

### The error

```
✘ [ERROR] An error occurred while extracting routes.
NG0401
```

### Root cause

Angular 21 changed how SSR route extraction bootstraps the app. The extractor passes a `platformRef` via a `BootstrapContext` argument to the bootstrap function. esbuild tree-shakes the context parameter away when an arrow function is used — so `platformRef` arrives as `undefined`, and Angular throws `NG0401` (NullInjectorError).

### Fix — `src/main.server.ts`

```ts
// ❌ BROKEN — esbuild strips the unused context param from arrow functions
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, config, context);

export default bootstrap;
```

```ts
// ✅ CORRECT — named function declaration prevents esbuild from collapsing the param
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

export default function bootstrap(context?: BootstrapContext) {
  return bootstrapApplication(App, config, context);
}
```

> **Why this works:** esbuild respects named exported function declarations and preserves all parameters. Arrow functions assigned to `const` are more aggressively optimized when the parameter appears unused at the call site.

---

## 🚀 Build Steps

```bash
# 1. Apply the fix above to src/main.server.ts

# 2. Install (already done — pnpm-lock.yaml is updated)
pnpm install

# 3. Build
pnpm run build

# 4. Verify
pnpm run lint
```

Expected output after the fix:

```
✔ Building...
Prerendered 0 static routes.
Application bundle generation complete.
```

---

## 📦 Packages removed

```
primeng
@primeng/themes
primeicons
```

## 📦 Packages kept (untouched)

```
lucide-angular       — icons
notyf                — toast notifications
ngx-filepond         — file upload
ngx-quill            — rich text editor
ng2-charts           — charts
chart.js             — charts
@ngx-translate       — i18n
ngx-pagination       — pagination (or use ui-pagination)
@ngrx/signals        — state management
```

---

## 🗂 Changed files summary

| Category | Files changed |
|---|---|
| `package.json` + lockfile | 2 |
| `app.config.ts` / `app.config.server.ts` | 2 |
| `app.routes.server.ts` | 1 |
| `app.provider.ts` | 1 |
| `styles.css` | 1 |
| Feature components (auth, blog, dashboard, events, programs, etc.) | ~75 |
| New UI components in `shared/ui/` | 10+ |
| Deleted files | 2 |
