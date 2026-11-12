# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Development Commands

Run every `pnpm` command inside the DevContainer: `devcontainer exec --workspace-folder . <command>`. Git runs on the host.

Each worktree has its own DevContainer. In a new worktree, run `devcontainer up --workspace-folder .` once before the other commands.

### Code Quality

```bash
pnpm exec biome check --write  # Lint and format
pnpm exec biome check         # Check without formatting
```

## Architecture

- **Git hooks**: `.git/hooks/pre-commit` runs `pnpm run pre-commit` (Biome format) on staged files in the container. `.git/hooks/pre-push` runs `pnpm run pre-push` (Biome CI and tests) there
- **Demo system**: `@masatomakino/demo-showcase` (Vite) builds `demoSrc/demo*.js` into `docs/demo/`. `demoSrc/demo.js` imports the compiled `esm/`, so the dev server needs `watch:tsc` (`start:dev` runs both)
