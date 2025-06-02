import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { products, categories, Product } from '../data/products';
import { AddToCartButton } from '../components/AddToCartButton';
import { ShoppingCart } from '../components/ShoppingCart';
import { CartIcon } from '../components/CartIcon';
import { theme } from '../styles/theme';

const MenuContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${theme.colors.white};
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const MenuTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  font-weight: 300;
  margin: 0;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

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
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$active ? theme.colors.accentDark : theme.colors.accentLight};
    border-color: ${props => props.$active ? theme.colors.accentDark : theme.colors.accent};
    color: ${theme.colors.primary};
  }
`;

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
`;

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
`;

const ProductImage = styled.div<{ $bgImage: string }>`
  height: 200px;
  background: url(${props => props.$bgImage}) center/cover;
  position: relative;
`;

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
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  color: ${theme.colors.primary};
  font-weight: 600;
`;

const ProductDescription = styled.p`
  color: ${theme.colors.gray};
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Menu: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    console.log("Menu component rendered.");
    console.log("Total products (unfiltered):", products.length);
    console.log("Selected category:", selectedCategory);
    console.log("Filtered products count:", filteredProducts.length);
    if (filteredProducts.length === 0 && products.length > 0) {
      console.warn("Warning: filteredProducts is empty, but products array is not. Check category filtering logic or data.");
    }
  }, [selectedCategory, filteredProducts]);

  if (products.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading products or no products available...</div>;
  }

  return (
    <MenuContainer id="products">
      <MenuHeader>
        <MenuTitle>Our Menu</MenuTitle>
        <CartIcon onClick={() => setIsCartOpen(true)} />
      </MenuHeader>

      <CategoryTabs>
        <CategoryTab
          $active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        >
          All Items
        </CategoryTab>
        {categories.map(category => (
          <CategoryTab
            key={category.id}
            $active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </CategoryTab>
        ))}
      </CategoryTabs>

      <ProductGrid>
        {filteredProducts.map((product: Product, index) => {
          console.log(`Rendering product card ${index + 1}:`, product.name);
          return (
            <ProductCard key={product.id}>
              <ProductImage $bgImage={product.image}>
                <PriceTag>${product.price.toFixed(2)}</PriceTag>
              </ProductImage>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductFooter>
                  <AddToCartButton product={product} />
                </ProductFooter>
              </ProductInfo>
            </ProductCard>
          );
        })}
      </ProductGrid>

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </MenuContainer>
  );
};