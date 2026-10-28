import { Link } from 'react-router-dom'
import { StateMessage } from '../components/StateMessage/StateMessage'
import styles from './NaoEncontrado.module.css'

export default function NaoEncontrada() {
  return (
    <div className={`container ${styles.page}`}>
      <StateMessage
        as="h1"
        eyebrow="Erro 404"
        title="Página não encontrada"
        description="O endereço que você tentou acessar não existe. Volte ao catálogo para encontrar sua próxima receita."
        action={
          <Link to="/" className="btn">
            Voltar ao catálogo
          </Link>
        }
      />
    </div>
  )
}