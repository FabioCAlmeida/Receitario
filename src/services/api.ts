import type { Recipe, RecipesResponse } from '../types/recipe'

const BASE_URL = 'https://dummyjson.com'

export class NotFoundError extends Error {
  constructor(message = 'Recurso não encontrado') {
    super(message)
    this.name = 'NotFoundError'
  }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal })

  if (response.status === 404) {
    throw new NotFoundError()
  }
  if (!response.ok) {
    throw new Error(`Falha na requisição (${response.status})`)
  }

  return response.json() as Promise<T>
}


export function getRecipes(signal?: AbortSignal): Promise<RecipesResponse> {
  return request<RecipesResponse>('/recipes?limit=0', signal)
}

export function getRecipe(id: string, signal?: AbortSignal): Promise<Recipe> {
  return request<Recipe>(`/recipes/${encodeURIComponent(id)}`, signal)
}