# Changelog

All notable changes to `@julianm-lrj/particles.js` are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [2.0.0] – 2026-03-04

> First release of the `@julianm-lrj/particles.js` community fork.

### Added
- **ESM / CJS / IIFE builds** via `tsup` (`dist/index.mjs`, `dist/index.cjs`, `dist/particles.min.js`)
- **TypeScript declarations** (`src/index.d.ts`) with full `ParticlesConfig` types, named exports, and `Window` global augmentation
- **`exports` map** in `package.json` (`types` / `import` / `require` / `default`)
- **`engines: { node: ">=18" }`** – safe to import in Node without a DOM
- **Vitest + jsdom test suite** (`test/particles.test.js`) – 9 tests covering canvas creation, `pJSDom` population, `particlesJS.load`, module exports, and window globals
- **GitHub Actions CI** (`.github/workflows/ci.yml`) – Node 18 / 20 / 22 matrix with `npm audit` (informational)
- **Dependabot** (`.github/dependabot.yml`) – weekly npm dependency updates
- **`CHANGELOG.md`** (this file)

### Changed
- Package renamed to scoped `@julianm-lrj/particles.js` (`version: 2.0.0`)
- `src/index.js` – replaced `arguments.callee` with named recursive `deepExtend`
- All top-level `window.*` assignments guarded behind `typeof window !== 'undefined'`
- Named ESM exports (`particlesJS`, `pJSDom`) added; browser globals set only when `window` exists
- `demo/index.html` updated to reference `../dist/particles.min.js`
- `LICENSE.md` updated to include `julianm-lrj` copyright (2026) alongside the original Vincent Garreau copyright (2015)

### Compatibility
- Browser `<script>` usage (IIFE) is **fully backwards compatible** with the original `particles.js`
- Original `particles.js` (npm) is unaffected; this fork is published separately

---

## [1.0.3] and earlier

See the [original particles.js repository](https://github.com/VincentGarreau/particles.js) maintained by Vincent Garreau.
