import { useState } from 'react'
import styled from 'styled-components'
import { products, categories } from '../data/products'
import { theme } from '../styles/theme'
import { useLanguage } from '../contexts/LanguageContext'

const ProductsSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${theme.colors.white};
`

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${theme.colors.primary};
  font-weight: 300;
  
  span {
    color: ${theme.colors.accent};
  }
`

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`

const CategoryTab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.$active ? theme.colors.accent : theme.colors.border};
  background: ${props => props.$active ? theme.colors.accent : theme.colors.white};
  color: ${props => props.$active ? theme.colors.primary : theme.colors.gray};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.$active ? theme.colors.accentDark : theme.colors.accentLight};
    border-color: ${props => props.$active ? theme.colors.accentDark : theme.colors.accent};
    color: ${theme.colors.primary};
  }
`

const CategorySection = styled.div`
  margin-bottom: 4rem;
`

const CategoryTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${theme.colors.primary};
  font-weight: 400;
`

const CategoryDescription = styled.p`
  color: ${theme.colors.gray};
  margin-bottom: 2rem;
  font-size: 1.1rem;
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  @media (min-width: 1440px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`

const ProductCard = styled.div`
  background: ${theme.colors.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${theme.shadows.small};
  transition: all 0.3s;
  border: 1px solid ${theme.colors.border};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
    border-color: ${theme.colors.accentLight};
  }
`

const ProductImage = styled.div<{ $bgImage: string }>`
  height: 200px;
  background: url(${props => props.$bgImage}) center/cover;
  position: relative;
`

const PriceTag = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.1rem;
`

const ProductInfo = styled.div`
  padding: 1.5rem;
`

const ProductName = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.primary};
  font-weight: 600;
`

const ProductDescription = styled.p`
  color: ${theme.colors.gray};
  font-size: 0.95rem;
  line-height: 1.5;
`

const ShowAllButton = styled.button`
  display: block;
  margin: 3rem auto;
  padding: 1rem 2rem;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s;
  
  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showAll, setShowAll] = useState(false)
  const { t } = useLanguage()

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 8)

  return (
    <ProductsSection id="products">
      <SectionTitle>{t('products.title').split(' ')[0]} <span>{t('products.title').split(' ')[1]}</span></SectionTitle>
      
      <CategoryTabs>
        <CategoryTab 
          $active={selectedCategory === 'all'}
          onClick={() => {
            setSelectedCategory('all')
            setShowAll(false)
          }}
        >
          {t('products.all')}
        </CategoryTab>
        {categories.map(category => (
          <CategoryTab
            key={category.id}
            $active={selectedCategory === category.id}
            onClick={() => {
              setSelectedCategory(category.id)
              setShowAll(false)
            }}
          >
            {t(`category.${category.id}`)}
          </CategoryTab>
        ))}
      </CategoryTabs>

      {selectedCategory === 'all' ? (
        <ProductGrid>
          {displayedProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductImage $bgImage={product.image}>
                <PriceTag>£{product.price.toFixed(2)}</PriceTag>
              </ProductImage>
              <ProductInfo>
                <ProductName>{t(`product.${product.id}`)}</ProductName>
                <ProductDescription>{t(`product.${product.id}.desc`)}</ProductDescription>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      ) : (
        <CategorySection>
          <CategoryTitle>
            {t(`category.${selectedCategory}`)}
          </CategoryTitle>
          <CategoryDescription>
            {t(`category.${selectedCategory}.desc`)}
          </CategoryDescription>
          <ProductGrid>
            {displayedProducts.map(product => (
              <ProductCard key={product.id}>
                <ProductImage $bgImage={product.image}>
                  <PriceTag>£{product.price.toFixed(2)}</PriceTag>
                </ProductImage>
                <ProductInfo>
                  <ProductName>{t(`product.${product.id}`)}</ProductName>
                  <ProductDescription>{t(`product.${product.id}.desc`)}</ProductDescription>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        </CategorySection>
      )}
      
      {!showAll && filteredProducts.length > 8 && (
        <ShowAllButton onClick={() => setShowAll(true)}>
          {t('products.showAll')} ({filteredProducts.length})
        </ShowAllButton>
      )}
    </ProductsSection>
  )
}

export default Products
