import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <header>Receitário</header>
            <main>
                <Outlet />
            </main>
            <footer>FIAP · Checkpoint 5</footer>
        </>
    )
}