# Infrastructure Notes (agent-written)

## Infra Summary

- /* Leader agent will append infra decisions and required resources here. */

## Domain-Driven Design (DDD) - Infrastructure Overview

- **Bounded Contexts**: UI / Presentation, Application (use-cases), Domain (entities + repository interfaces), Infrastructure (adapters/implementations), Data (assets, sprites).
- **Responsibilities**:
	- Presentation: React pages and components in `src/presentation`.
	- Application: Orchestrates domain use-cases in `src/application` (e.g., `SpriteService.ts`).
	- Domain: Domain models and repository interfaces in `src/domain` (e.g., `Sprite.ts`, `SpriteRepository.ts`).
	- Infrastructure: Concrete adapters in `src/infrastructure` (e.g., `StaticSpriteRepository.ts`).
	- Data/Assets: Static data under `src/assets` and `src/data/sprites`.

## Folder Structure (canonical mapping)

- `src/presentation` — UI components, hooks, pages.
- `src/application` — Use-case services, orchestration, input validation.
- `src/domain` — Entities, value objects, repository interfaces, domain logic.
- `src/infrastructure` — Implementations of repository interfaces, storage adapters, adapters to external services.
- `src/assets`, `public` — Static assets, sprite files, images.
- `docs/` — Agent-written memory and infra notes (`tasks.md`, `infrastructure.md`). Agents must read and respect these files.

## Infra Principles (for agents & devs)

- **Single Responsibility by Layer**: Keep domain pure; no framework or I/O concerns in domain files.
- **Ports & Adapters**: Repositories are ports (interfaces) in `src/domain`; concrete adapters live in `src/infrastructure`.
- **Docs as Source-of-Truth**: Agents must consult `docs/infrastructure.md` before creating infra-changing code.
- **Preserve Code Style**: New code must follow existing TypeScript/React style, file layout, and naming conventions in the repo.

## Security & Secrets

- No secrets stored in repo. If required, agent writes a `Need creds. Stop.` caveman message and appends required resource to `/docs/infrastructure.md`.

## Example: Adding a new repository adapter

1. Add interface to `src/domain/SpriteRepository.ts` (if missing).
2. Implement adapter in `src/infrastructure/NewAdapter.ts`.
3. Register adapter in application composition root (if present).
4. Update tests and ensure imports follow existing path aliases.
