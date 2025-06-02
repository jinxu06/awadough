import React from 'react'
import styled from 'styled-components'
import { useCart } from '../contexts/CartContext'

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const CartIconSvg = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
`

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  transform: translate(25%, -25%);
`

interface CartIconProps {
  onClick: () => void
}

export const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <CartButton onClick={onClick} aria-label="Open shopping cart">
      <CartIconSvg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17A2 2 0 0115 19H9A2 2 0 017 17V13M17 13H7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </CartIconSvg>
      {totalItems > 0 && <Badge>{totalItems}</Badge>}
    </CartButton>
  )
}
