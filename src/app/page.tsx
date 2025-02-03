import { Header } from '@/components/ui/header/header'
import CatalogPage from './catalog/page'
import Footer from '@/components/ui/footer/footer'

export default function Home() {
  return (
    <main>
      <Header />

      <CatalogPage />

      <Footer />
    </main>
  )
}
