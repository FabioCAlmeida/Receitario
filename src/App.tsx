import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { CatalogPage } from './pages/Catalog/CatalogPage'
import Detalhe from './pages/Detalhe'
import NaoEncontrada from './pages/NaoEncontrado'

export default function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route index element={<CatalogPage />} />

        <Route path="receitas/:id" element={<Detalhe />} />

        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  )
}