import React from 'react';
import styled from 'styled-components';
import { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { theme } from '../styles/theme';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.accent};
  border-radius: 25px;
  padding: 0.25rem;
  box-shadow: ${theme.shadows.small};
`;

const QuantityButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.small};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.medium};
  }

  &:active {
    transform: translateY(0);
  }
`;

const DecrementButton = styled(QuantityButton)`
  background: ${theme.colors.accent};
  color: ${theme.colors.primary};

  &:hover {
    background: ${theme.colors.accentDark};
    color: ${theme.colors.white};
  }
`;

const IncrementButton = styled(QuantityButton)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const QuantityDisplay = styled.span`
  min-width: 1.5rem;
  text-align: center;
  font-weight: 600;
  color: ${theme.colors.primary};
  font-size: 0.9rem;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark});
  color: ${theme.colors.primary};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.small};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
    background: linear-gradient(135deg, ${theme.colors.accentDark}, ${theme.colors.accent});
    color: ${theme.colors.white};

    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  return (
    <ButtonContainer>
      {quantity > 0 ? (
        <QuantityControl>
          <DecrementButton
            onClick={() => removeFromCart(product.id)}
            aria-label="Decrease quantity"
          >
            −
          </DecrementButton>
          <QuantityDisplay>{quantity}</QuantityDisplay>
          <IncrementButton
            onClick={() => addToCart(product)}
            aria-label="Increase quantity"
          >
            +
          </IncrementButton>
        </QuantityControl>
      ) : (
        <AddButton
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </AddButton>
      )}
    </ButtonContainer>
  );
};
