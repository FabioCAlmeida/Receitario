import { useMemo, useState } from 'react'
import { RecipeGrid, RecipeGridSkeleton } from '../../components/RecipeGrid/RecipeGrid'
import { StateMessage } from '../../components/StateMessage/StateMessage'
import { ChevronDownIcon, CloseIcon, HeartIcon, SearchIcon } from '../../components/icons'
import { useRecipes } from '../../hooks/useRecipes'
import styles from './CatalogPage.module.css'

const PAGE_SIZE = 12
const ALL = ''
const COLLAPSED_CUISINES = 7

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function CatalogPage() {
  const { recipes, status, retry } = useRecipes()
  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState(ALL)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [showAllCuisines, setShowAllCuisines] = useState(false)
  const [favorites, setFavorites] = useState<Set<number>>(() => new Set())

  const cuisines = useMemo(
    () =>
      [...new Set(recipes.map((recipe) => recipe.cuisine))].sort((a, b) => a.localeCompare(b)),
    [recipes],
  )

  const hiddenCuisines = Math.max(cuisines.length - COLLAPSED_CUISINES, 0)
  const shownCuisines = showAllCuisines
    ? cuisines
    : cuisines.filter((option, index) => index < COLLAPSED_CUISINES || option === cuisine)

  const filtered = useMemo(() => {
    const term = normalize(query)
    return recipes.filter(
      (recipe) =>
        (cuisine === ALL || recipe.cuisine === cuisine) &&
        normalize(recipe.name).includes(term),
    )
  }, [recipes, query, cuisine])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > PAGE_SIZE
  const expanded = visibleCount >= filtered.length

  function updateQuery(value: string) {
    setQuery(value)
    setVisibleCount(PAGE_SIZE)
  }

  function updateCuisine(value: string) {
    setCuisine(value)
    setVisibleCount(PAGE_SIZE)
  }

  function clearFilters() {
    updateQuery('')
    updateCuisine(ALL)
  }

  function toggleFavorite(id: number) {
    setFavorites((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleMore() {
    setVisibleCount(expanded ? PAGE_SIZE : (count) => count + PAGE_SIZE)
  }

  return (
    <div className={`container ${styles.page}`}>
      <section className={styles.hero} aria-labelledby="titulo-catalogo">
        <div className={styles.heroText}>
          <h1 id="titulo-catalogo" className={styles.title}>
            Catálogo de receitas
          </h1>
          <p className={styles.subtitle}>Busque pelo nome, filtre por culinária e guarde as suas favoritas.</p>
        </div>
        <p className={styles.favoriteCount} role="status">
          <span className={styles.favoriteIcon}>
            <HeartIcon size={17} filled={favorites.size > 0} />
          </span>
          {favorites.size} favoritas
        </p>
      </section>

      <section className={styles.toolbar} aria-label="Busca e filtro">
        <div className={styles.search}>
          <label htmlFor="busca" className="label">
            Buscar receita
          </label>
          <div className={styles.searchField}>
            <SearchIcon className={styles.searchIcon} size={20} strokeWidth={1.6} />
            <input
              id="busca"
              type="search"
              placeholder="Nome da receita"
              autoComplete="off"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
            />
            {query && (
              <button type="button" className={styles.clearSearch} onClick={() => updateQuery('')} aria-label="Limpar busca">
                <CloseIcon size={16} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

        <div className={styles.filter}>
          <span id="rotulo-culinaria" className="label">
            Culinária
          </span>
          <div className={styles.chips} role="group" aria-labelledby="rotulo-culinaria">
            {status === 'loading'
              ? Array.from({ length: 6 }, (_, i) => <span key={i} className={`skeleton ${styles.chipSkeleton}`} />)
              : [ALL, ...shownCuisines].map((option) => (
                  <button
                    key={option || 'todas'}
                    type="button"
                    className={`${styles.chip} ${cuisine === option ? styles.chipActive : ''}`}
                    aria-pressed={cuisine === option}
                    onClick={() => updateCuisine(option)}
                  >
                    {option ? option : 'Todas'}
                  </button>
                ))}
            {status === 'success' && hiddenCuisines > 0 && (
              <button
                type="button"
                className={`${styles.chip} ${styles.chipToggle}`}
                aria-expanded={showAllCuisines}
                onClick={() => setShowAllCuisines((open) => !open)}
              >
                {showAllCuisines ? 'Menos culinárias' : `Mais ${hiddenCuisines} culinárias`}
                <ChevronDownIcon size={16} strokeWidth={2} className={showAllCuisines ? styles.chevronUp : styles.chevron} />
              </button>
            )}
          </div>
        </div>
      </section>

      {status === 'success' && (
        <p className={styles.resultLine} role="status">
          {cuisine ? cuisine : 'Todas as culinárias'} · {filtered.length}{' '}
          {filtered.length === 1 ? 'receita' : 'receitas'}
        </p>
      )}

      {status === 'loading' && <RecipeGridSkeleton />}

      {status === 'error' && (
        <StateMessage
          bordered
          title="Não foi possível carregar as receitas"
          description="Verifique sua conexão e tente novamente."
          action={
            <button type="button" className="btn" onClick={retry}>
              Tentar novamente
            </button>
          }
        />
      )}

      {status === 'success' && filtered.length === 0 && (
        <StateMessage
          bordered
          title="Nenhuma receita encontrada"
          description={
            query
              ? `Não encontramos receitas para “${query.trim()}”${cuisine ? ` na culinária ${cuisine}` : ''}.`
              : `Não há receitas na culinária ${cuisine}.`
          }
          action={
            <button type="button" className="btn" onClick={clearFilters}>
              Limpar busca e filtro
            </button>
          }
        />
      )}

      {status === 'success' && filtered.length > 0 && (
        <>
          <RecipeGrid recipes={visible} favorites={favorites} onToggleFavorite={toggleFavorite} />

          {hasMore && (
            <div className={styles.more}>
              <button type="button" className="btn" onClick={toggleMore} aria-expanded={expanded}>
                {expanded ? 'Ver menos' : 'Ver mais receitas'}
                <ChevronDownIcon size={16} strokeWidth={2} className={expanded ? styles.chevronUp : styles.chevron} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}