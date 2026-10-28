import { Link, useParams } from 'react-router-dom'
import { StateMessage } from '../components/StateMessage/StateMessage'
import { useRecipe } from '../hooks/useRecipes'
import { formatMinutes, getTotalTime } from '../utils/time'
import styles from './Detalhe.module.css'

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
          action={<Link to="/" className="btn">Voltar ao catálogo</Link>}
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
          action={<Link to="/" className="btn">Voltar ao catálogo</Link>}
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

  if (!recipe) return null

  return (
    <article className={`container ${styles.page}`}>
      <Link to="/" className={styles.back}>
        ← Voltar ao catálogo
      </Link>

      <header className={styles.header}>
        <p className="eyebrow">{recipe.cuisine}</p>
        <h1 className={styles.title}>{recipe.name}</h1>
        <p className={styles.meta}>
          {recipe.difficulty} · {recipe.servings} porções
        </p>
      </header>

      <img
        className={styles.image}
        src={recipe.image}
        alt={recipe.name}
      />

      <section className={styles.section} aria-labelledby="tempos">
        <h2 id="tempos">Tempo de preparo</h2>
        <div className={styles.times}>
          <div className={styles.timeCard}>
            <span className={styles.timeLabel}>Preparo</span>
            <p className={styles.timeValue}>
              {formatMinutes(recipe.prepTimeMinutes)}
            </p>
          </div>
          <div className={styles.timeCard}>
            <span className={styles.timeLabel}>Cozimento</span>
            <p className={styles.timeValue}>
              {formatMinutes(recipe.cookTimeMinutes)}
            </p>
          </div>
          <div className={styles.timeCard}>
            <span className={styles.timeLabel}>Tempo total</span>
            <p className={styles.timeValue}>
              {formatMinutes(getTotalTime(recipe))}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ingredientes">
        <h2 id="ingredientes">Ingredientes</h2>
        <ul className={styles.list}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={`${ingredient}-${index}`}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="modo-preparo">
        <h2 id="modo-preparo">Modo de preparo</h2>
        <ol className={styles.instructions}>
          {recipe.instructions.map((instruction, index) => (
            <li key={`${index}-${instruction}`}>{instruction}</li>
          ))}
        </ol>
      </section>

      {recipe.mealType.length > 0 && (
        <section className={styles.section} aria-labelledby="tipo-refeicao">
          <h2 id="tipo-refeicao">Tipo de refeição</h2>
          <div className={styles.tags}>
            {recipe.mealType.map((type) => (
              <span className={styles.tag} key={type}>{type}</span>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}