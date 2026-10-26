import type { Recipe, RecipesResponse } from '../types/recipe'

const API = 'https://dummyjson.com'

export function getRecipes(): Promise<Recipe[]> {
    const response = fetch(`${API}/recipes?limit=0`)
        .then((data) => {
            if (!data.ok) {
                throw new Error('Erro ao buscar receitas')
            }
            return data.json()
        })
        .then((json: RecipesResponse) => {
            return json.recipes
        })

    return response
}

export function getRecipeById(id: string): Promise<Recipe> {
    const response = fetch(`${API}/recipes/${id}`)
        .then((data) => {
            if (!data.ok) {
                throw new Error('Receita não encontrada')
            }
            return data.json()
        })

    return response
}