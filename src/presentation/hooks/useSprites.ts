import { useMemo } from 'react';
import { SpriteService } from '../../application/SpriteService';
import { StaticSpriteRepository } from '../../infrastructure/StaticSpriteRepository';

const service = new SpriteService(new StaticSpriteRepository());

export function useSprites() {
  const sprites = useMemo(() => service.getAllSprites(), []);
  const categories = useMemo(() => service.getCategories(), []);
  return { sprites, categories };
}

export function useSpriteById(id: string | undefined) {
  return useMemo(
    () => (id ? service.getSpriteById(id) : undefined),
    [id],
  );
}
