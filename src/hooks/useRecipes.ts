import { getRecipe, getRecipes } from '../services/api'
import { useFetch } from './useFetch'

export function useRecipes() {
  const { data, ...rest } = useFetch((signal) => getRecipes(signal), [])
  return { recipes: data?.recipes ?? [], ...rest }
}

export function useRecipe(id: string) {
  const { data, ...rest } = useFetch((signal) => getRecipe(id, signal), [id])
  return { recipe: data, ...rest }
}