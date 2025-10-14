# Changelog

## [0.1.0] - 2025-10-14

### Security Updates & Fixes

#### Fixed All npm Vulnerabilities
- **Updated Next.js**: `14.2.5` → `15.5.5` (Fixed critical security vulnerabilities)
  - Fixed DoS vulnerability with Server Actions
  - Fixed information exposure in dev server
  - Fixed cache key confusion for Image Optimization
  - Fixed content injection vulnerability
  - Fixed middleware redirect handling SSRF
  - Fixed race condition to cache poisoning
  - Fixed authorization bypass in middleware

- **Updated Nodemailer**: `6.9.14` → `7.0.9` (Fixed moderate security vulnerability)
  - Fixed email to unintended domain issue due to interpretation conflict

- **Updated React**: `18.3.1` → `19.0.0`
  - Latest stable version with improved performance and features

#### Updated Dependencies
- **ESLint**: `8.57.0` → `9.14.0` (Removed deprecation warnings)
- **Added @eslint/eslintrc**: `3.1.0` (Required for ESLint 9 compatibility)
- **Updated TypeScript types**:
  - `@types/react`: `18.3.3` → `19.0.2`
  - `@types/react-dom`: `18.3.0` → `19.0.2`
  - `@types/node`: `20.14.12` → `22.9.0`
- **Updated build tools**:
  - `typescript`: `5.5.4` → `5.6.3`
  - `tailwindcss`: `3.4.7` → `3.4.14`
  - `postcss`: `8.4.40` → `8.4.47`
  - `lucide-react`: `0.427.0` → `0.454.0`
  - `eslint-config-next`: `14.2.5` → `15.5.5`

#### Configuration Updates
- Created `eslint.config.mjs` for ESLint 9 flat config compatibility
- Updated `package.json` with latest secure versions
- All npm audit vulnerabilities resolved (0 vulnerabilities)

### Result
✅ **0 vulnerabilities** found after updates
✅ All deprecated packages updated
✅ Compatible with latest Next.js 15 and React 19
✅ Production-ready and secure
