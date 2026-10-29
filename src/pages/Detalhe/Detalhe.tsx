import { Link, useParams } from 'react-router-dom'
import { BackLink } from '../../components/BackLink/BackLink'
import { StateMessage } from '../../components/StateMessage/StateMessage'
import { DifficultyIcon, GlobeIcon, ServingsIcon } from '../../components/icons'
import { useRecipe } from '../../hooks/useRecipes'
import type { Recipe } from '../../types/recipe'
import { formatMinutes, getTotalTime } from '../../utils/time'
import styles from './Detalhe.module.css'

export function RecipeDetailPage() {
  const { id = '' } = useParams()
  const { recipe, status, retry } = useRecipe(id)

  return (
    <div className={`container ${styles.page}`}>
      <BackLink to="/">Voltar ao catálogo</BackLink>

      {status === 'loading' && <DetailSkeleton />}

      {
        status === 'not-found' && (
          <StateMessage
            as="h1"
            eyebrow="Receita não encontrada"
            title="Esta receita não existe"
            description={
              <>
                Não encontramos nenhuma receita com o identificador <span className={styles.code}>/receitas/{id}</span>.
                Confira o endereço ou escolha outra receita no catálogo.
              </>
            }
            action={
              <Link to="/" className="btn">
                Voltar ao catálogo
              </Link>
            }
          />
        )
      }

      {
        status === 'error' && (
          <StateMessage
            bordered
            title="Não foi possível carregar a receita"
            description="Verifique sua conexão e tente novamente."
            action={
              <button type="button" className="btn" onClick={retry}>
                Tentar novamente
              </button>
            }
          />
        )
      }

      {status === 'success' && recipe && <RecipeContent recipe={recipe} />}
    </div >
  )
}

function RecipeContent({ recipe }: { recipe: Recipe }) {
  const times = [
    { label: 'Preparo', value: recipe.prepTimeMinutes },
    { label: 'Cozimento', value: recipe.cookTimeMinutes },
    { label: 'Tempo total', value: getTotalTime(recipe), highlight: true },
  ]

  const info = [
    { label: 'Culinária', value: recipe.cuisine, Icon: GlobeIcon },
    { label: 'Porções', value: String(recipe.servings), Icon: ServingsIcon },
    { label: 'Dificuldade', value: recipe.difficulty, Icon: DifficultyIcon },
  ]

  return (
    <article className={styles.article}>
      <header className={styles.hero}>
        <div className={styles.media}>
          <img src={recipe.image} alt={recipe.name} />
        </div>

        <div className={styles.heroText}>
          <div className={styles.heading}>
            <span className="eyebrow">{recipe.cuisine}</span>
            <h1 className={styles.title}>{recipe.name}</h1>
          </div>

          <dl className={styles.times} aria-label="Tempos">
            {times.map(({ label, value, highlight }) => (
              <div key={label} className={styles.time}>
                <dt>{label}</dt>
                <dd className={highlight ? styles.timeHighlight : undefined}>{formatMinutes(value)}</dd>
              </div>
            ))}
          </dl>

          <dl className={styles.info} aria-label="Informações">
            {info.map(({ label, value, Icon }) => (
              <div key={label} className={styles.infoItem}>
                <Icon size={24} strokeWidth={1.5} />
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className={styles.content}>
        <section className={styles.ingredients} aria-labelledby="titulo-ingredientes">
          <div className={styles.sectionHeader}>
            <h2 id="titulo-ingredientes">Ingredientes</h2>
            <span>{recipe.ingredients.length} itens</span>
          </div>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${index}- ${ingredient}`}>
                <span className={styles.bullet} aria-hidden="true" />
                {ingredient}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.steps} aria-labelledby="titulo-preparo">
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderRule}`}>
            <h2 id="titulo-preparo">Modo de preparo</h2>
            <span>{recipe.instructions.length} etapas</span>
          </div>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={styles.stepText}>
                  <span className={styles.stepLabel}>Etapa {index + 1}</span>
                  <p>{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div >
    </article >
  )
}

function DetailSkeleton() {
  return (
    <div className={styles.article} aria-busy="true" aria-label="Carregando receita">
      <div className={styles.hero} aria-hidden="true">
        <div className={`${styles.media} skeleton`} />
        <div className={styles.heroText}>
          <div className="skeleton" style={{ width: '22%', height: 12 }} />
          <div className="skeleton" style={{ width: '90%', height: 34 }} />
          <div className="skeleton" style={{ width: '60%', height: 34 }} />
          <div className="skeleton" style={{ width: '70%', height: 44, borderRadius: 12 }} />
          <div className="skeleton" style={{ height: 110, borderRadius: 20 }} />
        </div>
      </div>
    </div>
  )
}