import { Link, useParams } from 'react-router-dom'
import { StateMessage } from '../components/StateMessage/StateMessage'
import { useRecipe } from '../hooks/useRecipes'
import { formatMinutes, getTotalTime } from '../utils/time'

export default function Detalhe() {
  const { id } = useParams()
  const { recipe, status, retry } = useRecipe(id ?? '')

  if (!id) {
    return (
      <div className="container">
        <StateMessage
          as="h1"
          title="Receita não encontrada"
          description="O endereço informado não corresponde a uma receita válida."
          action={
            <Link to="/" className="btn">
              Voltar ao catálogo
            </Link>
          }
        />
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="container">
        <StateMessage
          title="Carregando receita..."
          description="Estamos buscando os detalhes dessa receita."
        />
      </div>
    )
  }

  if (status === 'not-found') {
    return (
      <div className="container">
        <StateMessage
          as="h1"
          title="Receita não encontrada"
          description="Não encontramos uma receita com esse identificador."
          action={
            <Link to="/" className="btn">
              Voltar ao catálogo
            </Link>
          }
        />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="container">
        <StateMessage
          title="Não foi possível carregar a receita"
          description="Verifique sua conexão e tente novamente."
          action={
            <button type="button" className="btn" onClick={retry}>
              Tentar novamente
            </button>
          }
        />
      </div>
    )
  }

  if (!recipe) {
    return null
  }

  return (
    <article className="container">
      <Link to="/" className="btn">
        Voltar ao catálogo
      </Link>

      <header>
        <p className="eyebrow">{recipe.cuisine}</p>
        <h1>{recipe.name}</h1>
        <p>
          {recipe.difficulty} · {recipe.servings} porções
        </p>
      </header>

      <img
        src={recipe.image}
        alt={recipe.name}
        width="600"
        height="400"
      />

      <section aria-label="Tempos da receita">
        <h2>Tempo de preparo</h2>
        <p>Preparo: {formatMinutes(recipe.prepTimeMinutes)}</p>
        <p>Cozimento: {formatMinutes(recipe.cookTimeMinutes)}</p>
        <p>Tempo total: {formatMinutes(getTotalTime(recipe))}</p>
      </section>

      <section aria-labelledby="ingredientes">
        <h2 id="ingredientes">Ingredientes</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={`${ingredient}-${index}`}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="modo-preparo">
        <h2 id="modo-preparo">Modo de preparo</h2>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={`${index}-${instruction}`}>{instruction}</li>
          ))}
        </ol>
      </section>

      {recipe.mealType.length > 0 && (
        <section aria-labelledby="tipo-refeicao">
          <h2 id="tipo-refeicao">Tipo de refeição</h2>
          <p>{recipe.mealType.join(', ')}</p>
        </section>
      )}
    </article>
  )
}
