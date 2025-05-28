import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Footer from './components/Footer'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <AppContainer>
      <Header />
      <Hero />
      <Products />
      <About />
      <Footer />
    </AppContainer>
  )
}

export default App
