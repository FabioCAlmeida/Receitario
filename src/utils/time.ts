import type { Recipe } from '../types/recipe'

export function getTotalTime(recipe: Pick<Recipe, 'prepTimeMinutes' | 'cookTimeMinutes'>): number {
  return recipe.prepTimeMinutes + recipe.cookTimeMinutes
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`

  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`
}