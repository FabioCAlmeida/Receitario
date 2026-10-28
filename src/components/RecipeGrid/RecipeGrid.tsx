import type { Recipe } from '../../types/recipe'
import { RecipeCard, RecipeCardSkeleton } from '../RecipeCard/RecipeCard'
import styles from './RecipeGrid.module.css'

interface RecipeGridProps {
  recipes: Recipe[]
  favorites: Set<number>
  onToggleFavorite: (id: number) => void
}

export function RecipeGrid({ recipes, favorites, onToggleFavorite }: RecipeGridProps) {
  return (
    <section className={styles.grid} aria-label="Receitas">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.has(recipe.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}

export function RecipeGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <section className={styles.grid} aria-busy="true" aria-label="Carregando receitas">
      {Array.from({ length: count }, (_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </section>
  )
}