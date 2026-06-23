import { useNavigate } from 'react-router-dom';
import type { Sprite } from '../../domain/Sprite';
import './SpriteCard.css';

interface Props {
  sprite: Sprite;
}

export function SpriteCard({ sprite }: Props) {
  const navigate = useNavigate();

  return (
    <article
      className="sprite-card"
      onClick={() => navigate(`/preview?id=${sprite.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/preview?id=${sprite.id}`)}
    >
      <div className="sprite-card-image">
        <img src={sprite.fileName} alt={sprite.name} />
      </div>
      <div className="sprite-card-info">
        <h3 className="sprite-card-name">{sprite.name}</h3>
        <span className={`sprite-card-category cat-${sprite.category.toLowerCase()}`}>
          {sprite.category}
        </span>
        <p className="sprite-card-desc">{sprite.description}</p>
        <div className="sprite-card-tags">
          {sprite.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
