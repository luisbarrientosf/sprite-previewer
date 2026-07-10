# Sprite Previewer

A professional Vite + React + TypeScript SPA for browsing and previewing game sprites.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with feature highlights |
| `/list` | Gallery of all sprites with search & category filter |
| `/preview` | Detailed previewer with zoom, background toggle, and metadata |

## Architecture — DDD

```
src/
├── domain/               # Entities & repository interfaces
│   ├── Sprite.ts
│   └── SpriteRepository.ts
├── application/          # Use-case services
│   └── SpriteService.ts
├── infrastructure/       # Concrete implementations
│   └── StaticSpriteRepository.ts
├── presentation/         # React UI layer
│   ├── components/       # Navbar, SpriteCard
│   ├── hooks/            # useSprites, useSpriteById
│   └── pages/            # HomePage, ListPage, PreviewPage
└── data/sprites/         # SVG sprite assets
```

## Getting Started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
```

## Sprites

Eight hand-crafted SVG sprites are included: Dragon, Wizard, Slime, Gold Coin, Knight, Magic Orb, Fire Sword, and Treasure Chest.
