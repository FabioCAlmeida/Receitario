import { useEffect, useState } from 'react'
import { ArrowLeftIcon } from '../icons'
import styles from './ScrollToTop.module.css'

const SHOW_AFTER = 400

// Botão fixo no canto direito, visível depois de rolar a página.
export function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const update = () => setVisible(window.scrollY > SHOW_AFTER)
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])

    return (
        <button
            type="button"
            className={`${styles.button} ${visible ? styles.visible : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao topo"
            tabIndex={visible ? 0 : -1}
            aria-hidden={!visible}
        >
            <ArrowLeftIcon size={18} strokeWidth={1.8} className={styles.icon} />
        </button>
    )
}