import type { Sprite } from '../domain/Sprite';
import type { SpriteRepository } from '../domain/SpriteRepository';

export class SpriteService {
  private readonly repository: SpriteRepository;

  constructor(repository: SpriteRepository) {
    this.repository = repository;
  }

  getAllSprites(): Sprite[] {
    return this.repository.getAll();
  }

  getSpriteById(id: string): Sprite | undefined {
    return this.repository.getById(id);
  }

  getSpritesByCategory(category: string): Sprite[] {
    return this.repository.getAll().filter((s) => s.category === category);
  }

  getCategories(): string[] {
    const cats = this.repository.getAll().map((s) => s.category);
    return [...new Set(cats)];
  }
}
