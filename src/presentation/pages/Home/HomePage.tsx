import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  return (
    <main className="home-page">
      <div className="home-hero">
        <div className="home-badge">🎮 Sprite Previewer</div>
        <h1 className="home-title">
          Explore Your<br />
          <span className="gradient-text">Sprite Collection</span>
        </h1>
        <p className="home-subtitle">
          A professional tool for browsing, previewing, and managing game sprites.
        </p>
        <div className="home-actions">
          <Link to="/list" className="btn-primary-lg">Browse Gallery</Link>
          <Link to="/preview" className="btn-outline-lg">Open Previewer</Link>
        </div>
      </div>
      <div className="home-features">
        <div className="feature-card">
          <span className="feature-icon">🗂️</span>
          <h3>Gallery View</h3>
          <p>Browse all sprites with category filters and instant search.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Detailed Preview</h3>
          <p>Zoom in, change backgrounds, and navigate between sprites easily.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🏷️</span>
          <h3>Rich Metadata</h3>
          <p>View names, categories, tags, and descriptions for every sprite.</p>
        </div>
      </div>
    </main>
  );
}
