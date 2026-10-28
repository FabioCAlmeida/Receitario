import type { ReactNode } from 'react'
import styles from './StateMessage.module.css'

interface StateMessageProps {
  eyebrow?: string
  title: string
  description: ReactNode
  action?: ReactNode
  as?: 'h1' | 'h2'
  bordered?: boolean
}

export function StateMessage({ eyebrow, title, description, action, as: Heading = 'h2', bordered = false }: StateMessageProps) {
  return (
    <section className={`${styles.wrapper} ${bordered ? styles.bordered : ''}`} role={Heading === 'h2' ? 'status' : undefined}>
      <div className={styles.text}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Heading className={Heading === 'h1' ? styles.titleLarge : styles.title}>{title}</Heading>
        <p className={styles.description}>{description}</p>
      </div>
      {action}
    </section>
  )
}