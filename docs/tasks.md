# Project Tasks (agent-written)

## Plan (auto-generated)

- Goal: Add spritesheet slicing feature. One iteration implemented.

1. Design UI: `/spritesheets` page inputs for `tileWidth`, `tileHeight`, `spacing`, `margin`, grid preview overlay, and `crop` button.
2. Implement client-side cropping using canvas and create ZIP of tiles for download (use `jszip`).
3. Provide visual feedback: live grid overlay on uploaded image showing crop boundaries.
4. Add download of a map (data JSON) describing sprite positions; later export as image.
5. Iterate: developer implements first iteration (grid overlay + zip download). Test manually.

Notes:
- Agents must respect `docs/infrastructure.md` and existing code style.

One-iteration scope:
- Add inputs for `tileWidth`, `tileHeight`, `spacingX`, `spacingY`.
- Show live overlay grid on uploaded spritesheet matching user inputs.
- Add `Crop & Download ZIP` button that crops and packages tiles into a .zip (client-side).
- Do not implement server-side storage or advanced editing in this iteration.

Implementation note (one-iteration):
- Implemented inputs and overlay grid on `SpritesheetsPage`.
- Implemented `Crop & Download ZIP` using `jszip` client-side.
- Added `jszip` to `package.json` dependencies. Run `npm install`.

Caveman: "Slice good. Press crop. Get zip."

