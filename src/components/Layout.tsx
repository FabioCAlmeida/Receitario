import { Outlet } from 'react-router-dom'
import { ScrollToTop } from './ScrollToTop/ScrollToTop'

export default function Layout() {
    return (
        <>
            <header>Receitário</header>
            <main>
                <Outlet />
            </main>
            <footer>FIAP · Checkpoint 5</footer>
            <ScrollToTop />
        </>
    )
}