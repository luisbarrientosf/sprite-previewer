import { useState } from 'react';
import { SpriteCard } from '../components/SpriteCard';
import { useSprites } from '../hooks/useSprites';
import './ListPage.css';
import TextInput from '../components/TextInput/TextInput';

export function ListPage() {
  const { sprites, categories } = useSprites();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = sprites.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="list-page">
      <header className="list-header">
        <h1 className="list-title">Sprite Gallery</h1>
        <p className="list-subtitle">
          Browse and preview the complete sprite collection
        </p>
      </header>

      <div className="list-controls">
        <TextInput
          type="search"
          className="list-search"
          placeholder="Search sprites..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search sprites"
        />
        <div className="list-filters" role="group" aria-label="Filter by category">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="list-empty">
          <span>🔍</span>
          <p>No sprites match your search.</p>
        </div>
      ) : (
        <>
          <p className="list-count">{filtered.length} sprite{filtered.length !== 1 ? 's' : ''} found</p>
          <div className="sprite-grid">
            {filtered.map((sprite) => (
              <SpriteCard key={sprite.id} sprite={sprite} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
