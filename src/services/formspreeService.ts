// Formspree Order Service - Alternative to Google Apps Script
// Formspree provides reliable form handling with built-in CORS support

interface OrderSubmissionData {
  // Customer information
  customerName: string
  customerPhone: string
  customerAddress?: string
  customerNotes?: string
  
  // Order details
  deliveryOption: 'pickup' | 'delivery'
  orderItems: string
  subtotal: number
  deliveryFee: number
  totalAmount: number
  referenceNumber: string
  
  // Metadata
  orderDate: string
  orderTime: string
}

class FormspreeOrderService {
  private formspreeEndpoint: string = ''

  constructor() {
    // Formspree endpoint URL from environment variables
    this.formspreeEndpoint = (import.meta as any).env?.VITE_FORMSPREE_URL || ''
    console.log('[FormspreeOrderService] Constructor: endpoint set to:', this.formspreeEndpoint)
    
    if (!this.formspreeEndpoint) {
      console.warn('[FormspreeOrderService] VITE_FORMSPREE_URL is not defined. Order submissions will use fallback.')
    }
  }

  /**
   * Submit order to Formspree
   * @param orderData - The order data to submit
   * @returns Promise<boolean> - Success status
   */
  async submitOrder(orderData: OrderSubmissionData): Promise<boolean> {
    try {
      if (this.formspreeEndpoint) {
        return await this.submitToFormspree(orderData)
      }

      // Fallback if no endpoint configured
      return this.fallbackMethod(orderData)

    } catch (error) {
      console.error('Error submitting order via Formspree:', error)
      return this.fallbackMethod(orderData)
    }
  }

  /**
   * Submit to Formspree service
   */
  private async submitToFormspree(orderData: OrderSubmissionData): Promise<boolean> {
    try {
      console.log('[FormspreeOrderService] Submitting to Formspree:', this.formspreeEndpoint)
      console.log('[FormspreeOrderService] Order data:', JSON.stringify(orderData, null, 2))

      // Formspree expects form data, so we'll format it appropriately
      const formData = {
        _subject: `New Bakery Order: ${orderData.referenceNumber}`,
        _replyto: `customer-${orderData.referenceNumber}@awadough.com`, // Optional reply-to
        _cc: 'aaron.jin.xu@gmail.com', // Your notification email
        
        // Order details
        'Reference Number': orderData.referenceNumber,
        'Customer Name': orderData.customerName,
        'Customer Phone': orderData.customerPhone,
        'Delivery Option': orderData.deliveryOption,
        'Order Items': orderData.orderItems,
        'Subtotal': `£${orderData.subtotal.toFixed(2)}`,
        'Delivery Fee': `£${orderData.deliveryFee.toFixed(2)}`,
        'Total Amount': `£${orderData.totalAmount.toFixed(2)}`,
        'Order Date': orderData.orderDate,
        'Order Time': orderData.orderTime,
        'Customer Address': orderData.customerAddress || 'N/A (Pickup)',
        'Customer Notes': orderData.customerNotes || 'None',
        
        // Formatted message
        'message': this.formatOrderMessage(orderData)
      }

      const response = await fetch(this.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      console.log('[FormspreeOrderService] Raw response:', response)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`[FormspreeOrderService] HTTP error! status: ${response.status}, body: ${errorText}`)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('[FormspreeOrderService] Response from Formspree:', result)

      if (result.ok || response.status === 200) {
        console.log('Order successfully submitted to Formspree')
        return true
      } else {
        console.error('Formspree submission failed:', result)
        return false
      }

    } catch (error) {
      console.error('[FormspreeOrderService] Submission failed:', error)
      throw error
    }
  }

  /**
   * Format order data into a readable message
   */
  private formatOrderMessage(orderData: OrderSubmissionData): string {
    let message = `New bakery order received:\n\n`
    message += `Reference: ${orderData.referenceNumber}\n`
    message += `Customer: ${orderData.customerName}\n`
    message += `Phone: ${orderData.customerPhone}\n`
    message += `Delivery: ${orderData.deliveryOption}\n`
    message += `Date: ${orderData.orderDate} at ${orderData.orderTime}\n\n`
    message += `Items: ${orderData.orderItems}\n\n`
    message += `Subtotal: £${orderData.subtotal.toFixed(2)}\n`
    message += `Delivery Fee: £${orderData.deliveryFee.toFixed(2)}\n`
    message += `Total: £${orderData.totalAmount.toFixed(2)}\n`
    
    if (orderData.customerAddress) {
      message += `\nDelivery Address: ${orderData.customerAddress}\n`
    }
    
    if (orderData.customerNotes) {
      message += `\nCustomer Notes: ${orderData.customerNotes}\n`
    }
    
    return message
  }

  /**
   * Fallback method - logs order and provides manual instructions
   */
  private fallbackMethod(orderData: OrderSubmissionData): boolean {
    console.log('='.repeat(50))
    console.log('📧 NEW ORDER RECEIVED - MANUAL PROCESSING REQUIRED')
    console.log('='.repeat(50))
    console.log('Reference Number:', orderData.referenceNumber)
    console.log('Customer Name:', orderData.customerName)
    console.log('Customer Phone:', orderData.customerPhone)
    if (orderData.customerAddress) {
      console.log('Delivery Address:', orderData.customerAddress)
    }
    if (orderData.customerNotes) {
      console.log('Special Notes:', orderData.customerNotes)
    }
    console.log('Delivery Option:', orderData.deliveryOption)
    console.log('Order Items:', orderData.orderItems)
    console.log('Subtotal: £' + orderData.subtotal.toFixed(2))
    console.log('Delivery Fee: £' + orderData.deliveryFee.toFixed(2))
    console.log('Total Amount: £' + orderData.totalAmount.toFixed(2))
    console.log('Order Date:', orderData.orderDate)
    console.log('Order Time:', orderData.orderTime)
    console.log('='.repeat(50))

    // Store order in localStorage as backup
    try {
      const existingOrders = JSON.parse(localStorage.getItem('awadough_orders') || '[]')
      existingOrders.push({
        ...orderData,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('awadough_orders', JSON.stringify(existingOrders))
      console.log('💾 Order saved to browser localStorage as backup')
    } catch (e) {
      console.error('Failed to save order to localStorage:', e)
    }

    console.log('📧 Please manually record this order or set up Formspree')
    return true
  }
}

export default FormspreeOrderService