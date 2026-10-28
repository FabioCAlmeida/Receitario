import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '../ScrollToTop/ScrollToTop'
import { Header } from './Header'
import { Footer } from './Footer'
import styles from './Layout.module.css'

export default function Layout() {
    return (
        <div className={styles.layout}>
            <Header />

            <main className={styles.main}>
                <Outlet />
            </main>

            <Footer />

            <ScrollToTop />
        </div>
    )
}