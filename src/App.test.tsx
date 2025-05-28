import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { LanguageProvider } from './contexts/LanguageContext'

const renderWithLanguage = (component: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  )
}

describe('App', () => {
  test('renders bakery name', () => {
    renderWithLanguage(<App />)
    const heading = screen.getByText(/Awadough/i)
    expect(heading).toBeInTheDocument()
  })

  test('renders hero section', () => {
    renderWithLanguage(<App />)
    const heroTitle = screen.getByText(/Artisan Bakery/i)
    expect(heroTitle).toBeInTheDocument()
  })

  test('renders products section', () => {
    renderWithLanguage(<App />)
    const productsTitle = screen.getByText(/Our/i)
    expect(productsTitle).toBeInTheDocument()
  })

  test('renders product categories', () => {
    renderWithLanguage(<App />)
    expect(screen.getByText('All Products')).toBeInTheDocument()
    expect(screen.getByText('Artisan Breads')).toBeInTheDocument()
    expect(screen.getByText('Pastries')).toBeInTheDocument()
    expect(screen.getByText('Cakes & Desserts')).toBeInTheDocument()
  })

  test('displays product prices in GBP', () => {
    renderWithLanguage(<App />)
    const priceElements = screen.getAllByText(/£\d+\.\d{2}/)
    expect(priceElements.length).toBeGreaterThan(0)
  })

  test('can switch language', async () => {
    renderWithLanguage(<App />)
    const user = userEvent.setup()
    
    // Find and click language switch button
    const langButton = screen.getByText('中文')
    await user.click(langButton)
    
    // Check if Chinese text appears
    expect(screen.getByText('手工烘焙坊')).toBeInTheDocument()
  })
})
