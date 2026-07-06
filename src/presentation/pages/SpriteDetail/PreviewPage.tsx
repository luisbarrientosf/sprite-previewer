import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useSpriteById, useSprites } from '../../hooks/useSprites';
import './PreviewPage.css';

export function PreviewPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('id') ?? undefined;
  const navigate = useNavigate();

  const { sprites } = useSprites();
  const sprite = useSpriteById(selectedId);

  const [zoom, setZoom] = useState(1);
  const [bg, setBg] = useState<'dark' | 'light' | 'checker'>('dark');

  const currentIndex = sprites.findIndex((s) => s.id === selectedId);
  const prevSprite = currentIndex > 0 ? sprites[currentIndex - 1] : undefined;
  const nextSprite = currentIndex < sprites.length - 1 ? sprites[currentIndex + 1] : undefined;

  function selectSprite(id: string) {
    setZoom(1);
    setSearchParams({ id });
  }

  if (!sprite) {
    return (
      <main className="preview-page preview-empty">
        <div className="preview-empty-card">
          <span className="preview-empty-icon">🎨</span>
          <h2>No sprite selected</h2>
          <p>Choose a sprite from the gallery to preview it here.</p>
          <Link to="/list" className="btn-primary">Open Gallery</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="preview-page">
      <div className="preview-layout">
        {/* Sidebar */}
        <aside className="preview-sidebar">
          <div className="sidebar-header">
            <button className="btn-back" onClick={() => navigate('/list')}>
              ← Gallery
            </button>
          </div>
          <div className="sidebar-list">
            {sprites.map((s) => (
              <button
                key={s.id}
                className={`sidebar-item${s.id === selectedId ? ' active' : ''}`}
                onClick={() => selectSprite(s.id)}
              >
                <img src={s.fileName} alt={s.name} className="sidebar-thumb" />
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main canvas */}
        <section className="preview-main">
          <div className="preview-toolbar">
            <div className="toolbar-nav">
              <button
                className="btn-nav"
                disabled={!prevSprite}
                onClick={() => prevSprite && selectSprite(prevSprite.id)}
                aria-label="Previous sprite"
              >
                ‹
              </button>
              <span className="toolbar-name">{sprite.name}</span>
              <button
                className="btn-nav"
                disabled={!nextSprite}
                onClick={() => nextSprite && selectSprite(nextSprite.id)}
                aria-label="Next sprite"
              >
                ›
              </button>
            </div>
            <div className="toolbar-controls">
              <span className="toolbar-label">Background</span>
              {(['dark', 'light', 'checker'] as const).map((b) => (
                <button
                  key={b}
                  className={`btn-bg bg-${b}${bg === b ? ' active' : ''}`}
                  onClick={() => setBg(b)}
                  aria-label={`${b} background`}
                  title={b}
                />
              ))}
              <span className="toolbar-label">Zoom</span>
              <button className="btn-zoom" onClick={() => setZoom((z) => Math.max(0.5, z - 0.5))}>−</button>
              <span className="zoom-value">{Math.round(zoom * 100)}%</span>
              <button className="btn-zoom" onClick={() => setZoom((z) => Math.min(6, z + 0.5))}>+</button>
              <button className="btn-zoom" onClick={() => setZoom(1)}>Reset</button>
            </div>
          </div>

          <div className={`preview-canvas bg-${bg}`}>
            <img
              src={sprite.fileName}
              alt={sprite.name}
              className="preview-image"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>

          <div className="preview-info">
            <div className="info-header">
              <h2 className="info-name">{sprite.name}</h2>
              <span className={`info-category cat-${sprite.category.toLowerCase()}`}>
                {sprite.category}
              </span>
            </div>
            <p className="info-desc">{sprite.description}</p>
            <div className="info-tags">
              {sprite.tags.map((tag) => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
            <div className="info-meta">
              <div className="meta-item">
                <span className="meta-label">File</span>
                <span className="meta-value">{sprite.id}.svg</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Format</span>
                <span className="meta-value">SVG</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">ID</span>
                <span className="meta-value">{sprite.id}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
