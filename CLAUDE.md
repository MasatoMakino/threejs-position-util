# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Run every `pnpm` command inside the DevContainer: `devcontainer exec --workspace-folder . <command>`. Git runs on the host.

### Build and Development
```bash
pnpm run build         # Build TypeScript and generate demo
pnpm run buildTS       # Compile TypeScript only
pnpm run start:dev     # Start development environment (server + watch modes)
pnpm run server        # Start demo server with browser-sync
pnpm run watch:tsc     # Watch TypeScript compilation
pnpm run watch:demo    # Watch demo generation
```

### Testing
```bash
pnpm test              # Run tests once
pnpm run test:watch    # Run tests in watch mode
pnpm run coverage      # Run tests with coverage report
```

### Code Quality
```bash
pnpm exec biome check --write  # Lint and format
pnpm exec biome check         # Check without formatting
```

### Demo
```bash
pnpm run demo          # Generate demo page
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
- **DevContainer**: `.devcontainer/` runs pnpm in the `<folder>-pnpm-runner` container. `pnpm-workspace.yaml` sets the release-age gate, the trust policy, and the allowed build scripts
- **Git hooks**: `.git/hooks/pre-commit` runs `pnpm run pre-commit` (Biome format) on staged files in the container. `.git/hooks/pre-push` runs `pnpm run pre-push` (Biome CI and tests) there
- **Demo system**: Uses `@masatomakino/gulptask-demo-page` for interactive examples

### Dependencies
- **Peer dependency**: three.js (>=0.126.0 <1.0.0)
- **Development**: Uses latest Three.js for development/testing
- **Environment**: ES modules only, no CommonJS support