# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Development
```bash
npm run build          # Build TypeScript and generate demo
npm run buildTS        # Compile TypeScript only
npm run start:dev      # Start development environment (server + watch modes)
npm run server         # Start demo server with browser-sync
npm run watch:tsc      # Watch TypeScript compilation
npm run watch:demo     # Watch demo generation
```

### Testing
```bash
npm test               # Run tests once
npm run test:watch     # Run tests in watch mode
npm run coverage       # Run tests with coverage report
```

### Code Quality
```bash
npx biome check --write  # Lint and format (used in git hooks)
npx biome check         # Check without formatting
```

### Documentation
```bash
npm run typedocs       # Generate TypeDoc API documentation
npm run demo           # Generate demo page
```

### Release
```bash
npm run preversion     # Pre-release checks
npm run postversion    # Post-release tasks
npm run release        # Full release process
```

## Architecture

This is a TypeScript utility library for Three.js that provides position calculation functions for 3D geometries and meshes.

### Core Structure
- **src/threejs-position-util.ts**: Main utility functions for position calculations
- **src/index.ts**: Module exports (includes deprecated compatibility export)
- **__test__/**: Vitest tests with jsdom environment
- **demoSrc/demo.js**: Interactive demo showcasing the utilities
- **esm/**: Compiled ES modules output directory

### Key Functions
The library provides static utility functions for:
- `getGeometryCenterInWorld()`: Get geometry center in world coordinates  
- `getGeometryCenterInLocal()`: Get geometry center in local coordinates
- `get2DPosition()`: Convert 3D world position to 2D screen coordinates
- `get2DPositionWithMesh()`: Get 2D screen position from mesh
- `shiftMesh()`: Reposition mesh while maintaining visual position

### Build System
- **TypeScript**: Targets ES2021, outputs ES2022 modules to `esm/`
- **Biome**: Used for linting and formatting (replaces ESLint/Prettier)
- **Vitest**: Testing with jsdom environment for Three.js compatibility
- **Husky + lint-staged**: Pre-commit hooks run Biome on staged files
- **TypeDoc**: Generates API documentation to `docs/api/`
- **Demo system**: Uses `@masatomakino/gulptask-demo-page` for interactive examples

### Dependencies
- **Peer dependency**: three.js (>=0.126.0 <1.0.0)
- **Development**: Uses latest Three.js for development/testing
- **Environment**: ES modules only, no CommonJS support