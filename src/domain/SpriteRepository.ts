import type { Sprite } from './Sprite';

export interface SpriteRepository {
  getAll(): Sprite[];
  getById(id: string): Sprite | undefined;
}
