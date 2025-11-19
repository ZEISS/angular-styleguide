# Copilot Instructions for ZDI Angular Styleguide Sample Project

## Project Overview

This is an Angular 20 sample ice cream shop application that demonstrates best practices from the [ZDI Angular Styleguide](https://github.com/ZEISS/angular-styleguide/wiki). The project showcases modern Angular development patterns, state management with NgRx, and both standalone components and traditional module-based architecture.

**Live Demo**: https://zeiss.github.io/angular-styleguide/

## Tech Stack

- **Angular**: 20.3.4 (Latest with standalone components)
- **NgRx**: 20.0.1 (Store, Effects, Signals)
- **TypeScript**: 5.9.3
- **SCSS**: Styling with Bootstrap 5.3.2
- **Testing**: Jasmine + Karma (unit), Playwright + WebdriverIO (E2E)
- **Code Quality**: ESLint, Prettier, Stylelint
- **CI/CD**: GitHub Actions with GitHub Pages deployment

## Architecture Patterns

### Component Architecture

- **Primary**: Standalone components (modern Angular approach)
- **Signal Store**: Used for shopping cart state (`ShoppingCartStore`)
- **Traditional NgRx**: Used for product and recommendation state management

### Key Architectural Decisions

1. **Feature-Based Structure**: Organized by business domains (catalog, order, shared)
2. **State Management**: NgRx Store for complex state, Signal Store for simpler state
3. **Change Detection**: OnPush strategy throughout the application

## Project Structure

```
src/
├── app/
│   ├── catalog/                # Catalog feature module
│   │   ├── product/            # Product management
│   │   │   ├── components/     # Product-specific components
│   │   │   ├── services/       # Product data services
│   │   │   └── store/          # NgRx state management
│   │   ├── recommendation/     # Recommendation system
│   │   └── store/              # Feature store combining product + recommendation
│   ├── order/                  # Standalone order components
│   ├── shared/                 # Reusable standalone components
│   │   ├── components/         # UI components (product, theme-switcher, etc.)
│   │   ├── navigation/         # Navigation effects and actions
│   │   └── signal-store/       # Signal-based stores
│   └── reducers/               # Root state configuration
├── assets/                     # Static assets (JSON data, images)
├── environments/               # Environment configurations
├── model/                      # TypeScript interfaces and mappers
└── support/                    # Utilities (styling, testing helpers)
```

## Development Commands

### Essential Commands

```bash
npm start                    # Dev server (http://localhost:4200)
npm run build               # Development build
npm run build:prod          # Production build
npm test                    # Unit tests (Karma)
npm run test:ci             # CI unit tests (headless)
npm run lint                # ESLint
npm run stylelint           # SCSS linting
```

### E2E Testing

```bash
npm run e2e:playwright      # Playwright tests (requires app running)
npm run e2e:playwright:ui   # Playwright UI mode
npm run e2e:wdio           # WebdriverIO tests (requires app running)
npm run e2e:wdio:ci        # WebdriverIO with auto server start
```

## Code Standards & Guidelines

### TypeScript Configuration

- **Path aliases**: Use `@app/*`, `@models/*`, `@environment`, `@support/*`
- **Component prefix**: `app-` for all components
- **Selectors**: kebab-case for elements, camelCase for attributes

### Coding Standards

- **Prettier**: 100 char line width, single quotes, runs on pre-commit
- **ESLint**: Angular-specific rules with Jasmine support
- **Stylelint**: SCSS guidelines with Sass best practices
- **Change Detection**: Always use `OnPush` strategy
- **Testing**: Comprehensive unit tests required (Jasmine conventions)

### File Naming Conventions

- Components: `component-name.component.ts`
- Services: `service-name.service.ts`
- Stores: `feature-name.store.ts` (Signal) or `feature-name.reducer.ts` (NgRx)
- Models: `model-name.ts` (in `/model` directory)
- Test data: `feature-name.testdata.ts`

## State Management Patterns

### NgRx Store (Traditional)

- Used for: Product catalog, recommendations, navigation
- Pattern: Actions → Effects → Reducers → Selectors
- Location: Feature-specific `/store` directories
- Testing: Use `MockStore` and `provideMockStore`

### Signal Store (Modern)

- Used for: Shopping cart functionality
- Location: `src/app/shared/signal-store/`
- Benefits: Simpler API, better performance
- Example: `ShoppingCartStore` with `withState` and `withMethods`

## Testing Guidelines

### Unit Testing

- **Framework**: Jasmine + Karma
- **Mocking**: Use `MockStore` for NgRx, `spyOn` for services
- **Coverage**: Excludes `src/support/testing/**/*.ts`
- **Pattern**: One `.spec.ts` file per component/service
- **Setup**: Always use `provideMockStore` for NgRx-dependent components

### E2E Testing

- **Dual Framework**: Both Playwright and WebdriverIO (for comparison)
- **Page Objects**: Organized in `/page-objects` directories
- **CI Support**: Headless Chrome for CI, BrowserStack integration available
- **Known Issue**: Firefox support disabled (see TODO in configs)

## Build & Deployment

### Build Configuration

- **Development**: Source maps enabled, no optimization
- **Production**: Optimized, hashed outputs, environment replacement
- **Bundle Budgets**: 500KB warning, 1MB error for initial bundle
- **Style Budgets**: 2KB warning, 4KB error per component

### Deployment Process

1. **CI**: GitHub Actions builds on every push/PR
2. **Testing**: Unit tests + E2E tests must pass
3. **Deployment**: Auto-deploy to GitHub Pages on main branch merge
4. **Artifact**: Built files uploaded as GitHub Actions artifacts

## Environment Setup

### Prerequisites

- Node.js 18.x (defined in CI)
- npm (use `npm ci` for clean installs)
- Playwright dependencies: `npx playwright install --with-deps`

### Development Workflow

1. **Start**: `npm start` for dev server
2. **Code**: Follow pre-commit hooks (Prettier auto-formats)
3. **Test**: Run tests early and often
4. **Lint**: Address ESLint/Stylelint issues before commit

## Common Gotchas & Solutions

### Windows-Specific Commands

- E2E scripts use `set TS_NODE_PROJECT=` syntax for Windows compatibility
- Use PowerShell or Command Prompt (not Git Bash) for npm scripts

### Module vs Standalone Integration

- Import standalone components in `imports` array
- Import NgRx modules in `providers` array or `imports` for modules
- Use `CUSTOM_ELEMENTS_SCHEMA` in tests when mixing architectures

### Path Resolution

- Always use TypeScript path aliases (`@app/*`, `@models/*`)
- Import from `@environment` for environment variables
- Use `@support/*` for testing utilities

### State Management

- Use `StateWithCatalog` interface for catalog feature state typing
- Remember to call `store.resetSelectors()` in test `afterEach`
- Signal store methods must be bound properly in components

## Key Files to Reference

- **Style Guide**: [GitHub Wiki](https://github.com/ZEISS/angular-styleguide/wiki)
- **Main Config**: `angular.json`, `tsconfig.json`
- **Code Quality**: `.eslintrc.json`, `.prettierrc.json`, `.stylelintrc.json`
- **Testing**: `karma.conf.js`, `e2e-*/playwright.config.ts`
- **CI/CD**: `.github/workflows/build.yml`
- **State Examples**:
  - NgRx: `src/app/catalog/product/store/`
  - Signals: `src/app/shared/signal-store/shopping-cart.store.ts`

## License & Compliance

- **License**: MIT
- **Copyright**: Carl Zeiss AG
- **REUSE Compliance**: Follow SPDX headers in all source files
- **Asset Attribution**: See `.reuse/dep5` for image licenses
