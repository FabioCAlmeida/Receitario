import { useEffect } from 'react'
import { getRecipes } from '../services/api'

export default function Catalogo() {
    useEffect(() => {
        getRecipes().then((recipes) => {
            console.log(recipes)
        })
    }, [])

    return <h1>Catálogo</h1>
}