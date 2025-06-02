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

const ConfirmationContainer = styled.div`
  text-align: center;
  padding: 2rem 0;
`

const SuccessIcon = styled.div`
  font-size: 3rem;
  color: #10b981;
  margin-bottom: 1rem;
`

const ConfirmationTitle = styled.h3`
  color: ${theme.colors.primary};
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`

const ReferenceNumber = styled.div`
  background: ${theme.colors.lightGray};
  border: 2px solid ${theme.colors.accent};
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem 0;
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${theme.colors.primary};
`

const PaymentInstructions = styled.div`
  background: ${theme.colors.accentLight};
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem 0;
  text-align: left;
  
  h4 {
    color: ${theme.colors.primary};
    margin: 0 0 0.5rem 0;
  }
  
  p {
    margin: 0.5rem 0;
    color: ${theme.colors.gray};
    font-size: 0.9rem;
  }
`

const PickupDeliveryInfo = styled.div`
  background: ${theme.colors.lightGray};
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  
  h4 {
    color: ${theme.colors.primary};
    margin: 0 0 0.5rem 0;
  }
  
  p {
    margin: 0;
    color: ${theme.colors.gray};
  }
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
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')

  if (!isOpen) return null

  // Generate a random reference number
  const generateReferenceNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    let reference = 'AWA-'
    
    // Add 3 random letters
    for (let i = 0; i < 3; i++) {
      reference += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    
    reference += '-'
    
    // Add 4 random numbers
    for (let i = 0; i < 4; i++) {
      reference += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    
    return reference
  }

  // Calculate delivery fee
  const subtotal = getTotalPrice()
  const deliveryFee = deliveryOption === 'delivery' && subtotal < 45 ? 5 : 0
  const finalTotal = subtotal + deliveryFee

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
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: finalTotal,
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
    
    // Generate reference number and show confirmation
    const refNumber = generateReferenceNumber()
    setReferenceNumber(refNumber)
    setIsOrderConfirmed(true)
    
    // Clear cart
    clearCart()
  }

  return (
    <CheckoutOverlay onClick={handleOverlayClick}>
      <CheckoutModal>
        <CheckoutHeader>
          <CheckoutTitle>{isOrderConfirmed ? 'Order Confirmed!' : 'Checkout'}</CheckoutTitle>
          <CloseButton onClick={onClose} aria-label="Close checkout">
            ×
          </CloseButton>
        </CheckoutHeader>

        {isOrderConfirmed ? (
          <ConfirmationContainer>
            <SuccessIcon>✅</SuccessIcon>
            <ConfirmationTitle>Thank you for your order!</ConfirmationTitle>
            
            <ReferenceNumber>
              <div>Reference Number:</div>
              <div>{referenceNumber}</div>
            </ReferenceNumber>

            <PaymentInstructions>
              <h4>Payment Instructions</h4>
              <p>Please use the reference number above when making payment through:</p>
              <p>• Bank Transfer</p>
              <p>• PayPal</p>
              <p>• Cash on collection/delivery</p>
              <p>• Call us at 07761 901518 for other payment options</p>
            </PaymentInstructions>

            <PickupDeliveryInfo>
              <h4>{deliveryOption === 'pickup' ? 'Collection Information' : 'Delivery Information'}</h4>
              {deliveryOption === 'pickup' ? (
                <p>Your order will be ready for collection on <strong>Wednesday</strong> at our bakery: 2 Bissell St, Birmingham B5 7HP</p>
              ) : (
                <p>Your order will be delivered on <strong>Thursday</strong> to the address you provided.</p>
              )}
            </PickupDeliveryInfo>

            <div style={{ marginTop: '2rem' }}>
              <Button $variant="primary" onClick={onClose} style={{ width: '100%' }}>
                Close
              </Button>
            </div>
          </ConfirmationContainer>
        ) : (
          <>
            <OrderSummary>
              <SummaryTitle>Order Summary</SummaryTitle>
              {items.map(item => (
                <SummaryItem key={item.id}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </SummaryItem>
              ))}
              <SummaryItem>
                <span>Subtotal:</span>
                <span>£{subtotal.toFixed(2)}</span>
              </SummaryItem>
              {deliveryFee > 0 && (
                <SummaryItem>
                  <span>Delivery Fee:</span>
                  <span>£{deliveryFee.toFixed(2)}</span>
                </SummaryItem>
              )}
              {deliveryOption === 'delivery' && deliveryFee === 0 && (
                <SummaryItem style={{ color: theme.colors.accent }}>
                  <span>Free Delivery (orders over £45):</span>
                  <span>£0.00</span>
                </SummaryItem>
              )}
              <TotalAmount>
                <span>Total:</span>
                <span>£{finalTotal.toFixed(2)}</span>
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
                  We'll deliver your fresh order directly to your address. Free delivery on orders over £45, otherwise £5 delivery fee applies.
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
          </>
        )}
      </CheckoutModal>
    </CheckoutOverlay>
  )
}
