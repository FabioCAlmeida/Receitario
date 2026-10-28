
export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: string
  cuisine: string
  tags: string[]
  mealType: string[]
  image: string
}


export interface RecipesResponse {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}