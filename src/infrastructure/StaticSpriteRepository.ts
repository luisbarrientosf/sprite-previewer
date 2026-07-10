import type { Sprite } from '../domain/Sprite';
import type { SpriteRepository } from '../domain/SpriteRepository';

import dragonUrl from '../data/sprites/dragon.svg';
import wizardUrl from '../data/sprites/wizard.svg';
import slimeUrl from '../data/sprites/slime.svg';
import coinUrl from '../data/sprites/coin.svg';
import knightUrl from '../data/sprites/knight.svg';
import orbUrl from '../data/sprites/orb.svg';
import swordUrl from '../data/sprites/sword.svg';
import chestUrl from '../data/sprites/chest.svg';

const sprites: Sprite[] = [
  {
    id: 'dragon',
    name: 'Red Dragon',
    fileName: dragonUrl,
    category: 'Enemy',
    description: 'A fearsome red dragon that breathes fire and hoards gold.',
    tags: ['enemy', 'boss', 'fire'],
  },
  {
    id: 'wizard',
    name: 'Wizard',
    fileName: wizardUrl,
    category: 'Character',
    description: 'A powerful wizard capable of casting devastating spells.',
    tags: ['character', 'magic', 'player'],
  },
  {
    id: 'slime',
    name: 'Slime',
    fileName: slimeUrl,
    category: 'Enemy',
    description: 'A bouncy green slime that multiplies when slain.',
    tags: ['enemy', 'common', 'slime'],
  },
  {
    id: 'coin',
    name: 'Gold Coin',
    fileName: coinUrl,
    category: 'Item',
    description: 'Standard gold currency used throughout the realm.',
    tags: ['item', 'currency', 'collectible'],
  },
  {
    id: 'knight',
    name: 'Knight',
    fileName: knightUrl,
    category: 'Character',
    description: 'A heavily armored knight wielding a flaming sword.',
    tags: ['character', 'warrior', 'player'],
  },
  {
    id: 'orb',
    name: 'Magic Orb',
    fileName: orbUrl,
    category: 'Item',
    description: 'A mysterious orb pulsing with arcane energy.',
    tags: ['item', 'magic', 'collectible'],
  },
  {
    id: 'sword',
    name: 'Fire Sword',
    fileName: swordUrl,
    category: 'Item',
    description: 'An enchanted sword imbued with the essence of fire.',
    tags: ['item', 'weapon', 'fire'],
  },
  {
    id: 'chest',
    name: 'Treasure Chest',
    fileName: chestUrl,
    category: 'Object',
    description: 'A locked chest filled with precious gems and gold.',
    tags: ['object', 'loot', 'treasure'],
  },
];

export class StaticSpriteRepository implements SpriteRepository {
  getAll(): Sprite[] {
    return sprites;
  }

  getById(id: string): Sprite | undefined {
    return sprites.find((s) => s.id === id);
  }
}
