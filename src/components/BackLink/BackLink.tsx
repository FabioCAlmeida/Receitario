import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../icons'
import styles from './BackLink.module.css'

interface BackLinkProps {
    to: string
    children: string
}

function Circle() {
    return (
        <span className={styles.circle}>
            <ArrowLeftIcon size={16} strokeWidth={1.8} />
        </span>
    )
}

export function BackLink({ to, children }: BackLinkProps) {
    return (
        <Link to={to} className={styles.link}>
            <Circle />
            {children}
        </Link>
    )
}