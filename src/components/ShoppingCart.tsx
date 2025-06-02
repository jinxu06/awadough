import React, { useState } from 'react'
import styled from 'styled-components'
import { useCart } from '../contexts/CartContext'
import { Checkout } from './Checkout'

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
`

const CartPanel = styled.div`
  background: white;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  overflow-y: auto;
  padding: 1.5rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
`

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  
  &:hover {
    background-color: #f3f4f6;
  }
`

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
`

const ItemImage = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 0.5rem;
`

const ItemDetails = styled.div`
  flex: 1;
`

const ItemName = styled.h4`
  margin: 0 0 0.5rem 0;
  font-weight: 600;
`

const ItemPrice = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
`

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const QuantityButton = styled.button`
  background: #f3f4f6;
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #e5e7eb;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Quantity = styled.span`
  min-width: 2rem;
  text-align: center;
  font-weight: 600;
`

const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  
  &:hover {
    background: #dc2626;
  }
`

const CartTotal = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
`

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const CheckoutButton = styled.button`
  width: 100%;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #2563eb;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`

const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false)
    onClose()
  }

  return (
    <>
      <CartOverlay onClick={handleOverlayClick}>
        <CartPanel>
          <CartHeader>
            <h2>Shopping Cart</h2>
            <CloseButton onClick={onClose} aria-label="Close cart">
              ×
            </CloseButton>
          </CartHeader>

          {items.length === 0 ? (
            <EmptyCart>
              <p>Your cart is empty</p>
            </EmptyCart>
          ) : (
            <>
              {items.map(item => (
                <CartItem key={item.id}>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>£{item.price.toFixed(2)} each</ItemPrice>
                    <QuantityControls>
                      <QuantityButton
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </QuantityButton>
                      <Quantity>{item.quantity}</Quantity>
                      <QuantityButton
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </QuantityButton>
                    </QuantityControls>
                    <RemoveButton onClick={() => removeFromCart(item.id)}>
                      Remove
                    </RemoveButton>
                  </ItemDetails>
                </CartItem>
              ))}

              <CartTotal>
                <TotalPrice>
                  <span>Total:</span>
                  <span>£{getTotalPrice().toFixed(2)}</span>
                </TotalPrice>
                <CheckoutButton onClick={handleCheckout}>
                  Checkout
                </CheckoutButton>
              </CartTotal>
            </>
          )}
        </CartPanel>
      </CartOverlay>
      
      <Checkout isOpen={isCheckoutOpen} onClose={handleCheckoutClose} />
    </>
  )
}
