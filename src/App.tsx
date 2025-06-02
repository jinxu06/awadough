import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Footer from './components/Footer'
import styled from 'styled-components'
import { CartProvider } from './contexts/CartContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { Menu } from './pages/Menu'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContainer>
          <Header />
          <Hero />
          <Menu />
          <About />
          <Footer />
        </AppContainer>
      </CartProvider>
    </LanguageProvider>
  )
}

export default App
