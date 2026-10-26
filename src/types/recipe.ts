export interface Recipe {
    id: number
    name: string
    image: string
    cuisine: string
    difficulty: string
    prepTimeMinutes: number
    cookTimeMinutes: number
    ingredients: string[]
    instructions: string[]
    tags: string[]
    mealType: string[]
}

export interface RecipesResponse {
    recipes: Recipe[]
    total: number
    skip: number
    limit: number
}