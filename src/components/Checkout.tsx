import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { useCart } from '../contexts/CartContext'

const CheckoutOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const CheckoutModal = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  box-shadow: ${theme.shadows.large};
`

const CheckoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
`

const CheckoutTitle = styled.h2`
  color: ${theme.colors.primary};
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  color: ${theme.colors.gray};
  
  &:hover {
    background-color: ${theme.colors.lightGray};
  }
`

const OrderSummary = styled.div`
  background: ${theme.colors.lightGray};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`

const SummaryTitle = styled.h3`
  color: ${theme.colors.primary};
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
`

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1rem;
  color: ${theme.colors.primary};
  border-top: 1px solid ${theme.colors.border};
  padding-top: 0.5rem;
  margin-top: 0.5rem;
`

const DeliveryOptions = styled.div`
  margin-bottom: 2rem;
`

const OptionTitle = styled.h3`
  color: ${theme.colors.primary};
  margin: 0 0 1rem 0;
`

const OptionButton = styled.button<{ $selected: boolean }>`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid ${props => props.$selected ? theme.colors.accent : theme.colors.border};
  background: ${props => props.$selected ? theme.colors.accentLight : theme.colors.white};
  color: ${theme.colors.primary};
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s;
  
  &:hover {
    border-color: ${theme.colors.accent};
    background: ${theme.colors.accentLight};
  }
`

const OptionHeader = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const OptionDescription = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray};
`

const FormSection = styled.div`
  margin-bottom: 2rem;
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${theme.colors.primary};
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  ${props => props.$variant === 'primary' ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    
    &:hover {
      background: ${theme.colors.primaryDark};
    }
  ` : `
    background: ${theme.colors.lightGray};
    color: ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.border};
    }
  `}
`

interface CheckoutProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  phone: string
  address: string
  notes: string
}

export const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, clearCart } = useCart()
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    notes: ''
  })

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in your name and phone number.')
      return
    }

    if (deliveryOption === 'delivery' && !formData.address.trim()) {
      alert('Please provide your delivery address.')
      return
    }

    // Create order summary
    const orderDetails = {
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: getTotalPrice(),
      deliveryOption,
      customerInfo: {
        name: formData.name,
        phone: formData.phone,
        ...(deliveryOption === 'delivery' && { address: formData.address }),
        ...(formData.notes && { notes: formData.notes })
      },
      orderDate: new Date().toISOString()
    }

    // In a real app, you would send this to your backend
    console.log('Order submitted:', orderDetails)
    
    // Show success message
    alert(`Order confirmed! ${deliveryOption === 'pickup' ? 'You can pick up your order on Wednesday.' : 'Your order will be delivered on Thursday.'}`)
    
    // Clear cart and close modals
    clearCart()
    onClose()
  }

  return (
    <CheckoutOverlay onClick={handleOverlayClick}>
      <CheckoutModal>
        <CheckoutHeader>
          <CheckoutTitle>Checkout</CheckoutTitle>
          <CloseButton onClick={onClose} aria-label="Close checkout">
            ×
          </CloseButton>
        </CheckoutHeader>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          {items.map(item => (
            <SummaryItem key={item.id}>
              <span>{item.name} × {item.quantity}</span>
              <span>£{(item.price * item.quantity).toFixed(2)}</span>
            </SummaryItem>
          ))}
          <TotalAmount>
            <span>Total:</span>
            <span>£{getTotalPrice().toFixed(2)}</span>
          </TotalAmount>
        </OrderSummary>

        <DeliveryOptions>
          <OptionTitle>Delivery Option</OptionTitle>
          
          <OptionButton
            $selected={deliveryOption === 'pickup'}
            onClick={() => setDeliveryOption('pickup')}
          >
            <OptionHeader>Pickup - Wednesday</OptionHeader>
            <OptionDescription>
              Collect your order from our bakery at 2 Bissell St, Birmingham B5 7HP
            </OptionDescription>
          </OptionButton>

          <OptionButton
            $selected={deliveryOption === 'delivery'}
            onClick={() => setDeliveryOption('delivery')}
          >
            <OptionHeader>Delivery - Thursday</OptionHeader>
            <OptionDescription>
              We'll deliver your fresh order directly to your address
            </OptionDescription>
          </OptionButton>
        </DeliveryOptions>

        <FormSection>
          <FormGroup>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </FormGroup>

          {deliveryOption === 'delivery' && (
            <FormGroup>
              <Label htmlFor="address">Delivery Address *</Label>
              <TextArea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your full delivery address including postcode"
                required
              />
            </FormGroup>
          )}

          <FormGroup>
            <Label htmlFor="notes">Special Notes (Optional)</Label>
            <TextArea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any special instructions or dietary requirements"
            />
          </FormGroup>
        </FormSection>

        <ActionButtons>
          <Button $variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button $variant="primary" onClick={handleSubmit}>
            Confirm Order
          </Button>
        </ActionButtons>
      </CheckoutModal>
    </CheckoutOverlay>
  )
}
