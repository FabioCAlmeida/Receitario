import { useCallback, useEffect, useState } from 'react'
import { NotFoundError } from '../services/api'

export type FetchStatus = 'loading' | 'success' | 'error' | 'not-found'

interface FetchState<T> {
  status: FetchStatus
  data: T | null
}

// Busca genérica com cancelamento: evita atualizar estado depois que o
// componente sai da tela ou quando a dependência muda no meio da requisição.
export function useFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<FetchState<T>>({ status: 'loading', data: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ status: 'loading', data: null })

    fetcher(controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({ status: error instanceof NotFoundError ? 'not-found' : 'error', data: null })
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { ...state, retry }
}