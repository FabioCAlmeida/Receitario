import { Link } from 'react-router-dom'
import type { Recipe } from '../../types/recipe'
import { formatMinutes, getTotalTime } from '../../utils/time'
import { ClockIcon, HeartIcon } from '../icons'
import styles from './RecipeCard.module.css'

interface RecipeCardProps {
  recipe: Recipe
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite }: RecipeCardProps) {
  const label = isFavorite ? `Remover ${recipe.name} das favoritas` : `Favoritar ${recipe.name}`

  return (
    <article className={styles.card}>
      <Link to={`/receitas/${recipe.id}`} className={styles.link}>
        <div className={styles.media}>
          <img src={recipe.image} alt={recipe.name} loading="lazy" decoding="async" />
        </div>
        <div className={styles.body}>
          <span className={styles.cuisine}>{recipe.cuisine}</span>
          <h2 className={styles.name}>{recipe.name}</h2>
          <span className={styles.time}>
            <ClockIcon size={15} />
            {formatMinutes(getTotalTime(recipe))} no total
          </span>
        </div>
      </Link>

      <button
        type="button"
        className={`${styles.favorite} ${isFavorite ? styles.favoriteActive : ''}`}
        aria-pressed={isFavorite}
        aria-label={label}
        title={label}
        onClick={() => onToggleFavorite(recipe.id)}
      >
        <HeartIcon size={19} filled={isFavorite} strokeWidth={1.6} />
      </button>
    </article>
  )
}

export function RecipeCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={`${styles.media} skeleton`} style={{ borderRadius: 'var(--radius-md)' }} />
      <div className={styles.body}>
        <div className="skeleton" style={{ width: '40%', height: 10 }} />
        <div className="skeleton" style={{ width: '85%', height: 16, marginTop: 4 }} />
        <div className="skeleton" style={{ width: '50%', height: 12, marginTop: 6 }} />
      </div>
    </div>
  )
}