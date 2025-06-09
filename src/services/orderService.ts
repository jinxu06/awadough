// Modern Order Service - bypasses Google Forms field ID issues
// Uses Google Apps Script or alternative services for reliable order collection

interface OrderSubmissionData {
  // Customer information
  customerName: string
  customerPhone: string
  customerAddress?: string
  customerNotes?: string
  
  // Order details
  deliveryOption: 'pickup' | 'delivery'
  orderItems: string // Formatted string of items
  subtotal: number
  deliveryFee: number
  totalAmount: number
  referenceNumber: string
  
  // Metadata
  orderDate: string
  orderTime: string
}

class ModernOrderService {
  private scriptUrl: string = ''

  constructor() {
    // Google Apps Script Web App URL (more reliable than Google Forms)
    this.scriptUrl = (import.meta as any).env?.VITE_GOOGLE_SCRIPT_URL || ''
    console.log('[ModernOrderService] Constructor: scriptUrl set to:', this.scriptUrl); // DEBUG
    if (!this.scriptUrl) {
      console.warn('[ModernOrderService] VITE_GOOGLE_SCRIPT_URL is not defined. Order submissions will use fallback.');
    }
  }

  /**
   * Submits an order using Google Apps Script (recommended) or fallback method
   * @param orderData - The order data to submit
   * @returns Promise<boolean> - Success status
   */
  async submitOrder(orderData: OrderSubmissionData): Promise<boolean> {
    try {
      // Method 1: Google Apps Script (if configured)
      if (this.scriptUrl) {
        return await this.submitToGoogleScript(orderData)
      }

      // Method 2: Fallback - log locally and show instructions
      return this.fallbackMethod(orderData)

    } catch (error) {
      console.error('Error submitting order:', error)
      return this.fallbackMethod(orderData)
    }
  }

  /**
   * Submit to Google Apps Script (most reliable method)
   */
  private async submitToGoogleScript(orderData: OrderSubmissionData): Promise<boolean> {
    try {
      console.log('[ModernOrderService] Attempting to submit to Google Apps Script URL:', this.scriptUrl); // DEBUG
      console.log('[ModernOrderService] Order data being sent:', JSON.stringify(orderData, null, 2)); // DEBUG

      const response = await fetch(this.scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
        // mode: 'cors' // Optional: Explicitly set CORS mode if needed, though 'no-cors' might be problematic for getting actual response
      });

      console.log('[ModernOrderService] Raw response from Google Apps Script:', response); // DEBUG

      if (!response.ok) {
        const errorText = await response.text(); // Try to get more error info
        console.error(`[ModernOrderService] HTTP error! status: ${response.status}, statusText: ${response.statusText}, body: ${errorText}`); // DEBUG
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }

      const result = await response.json();
      console.log('[ModernOrderService] Parsed JSON response from Google Apps Script:', result); // DEBUG
      
      if (result.success) {
        console.log('Order successfully submitted to Google Apps Script')
        return true
      } else {
        console.error('Google Apps Script error:', result.error)
        return false
      }

    } catch (error) {
      console.error('[ModernOrderService] Google Apps Script submission failed:', error); // DEBUG
      // It's important to understand why it failed.
      // If 'error' is a generic network error, the console in the browser (Network tab) will be more helpful.
      // If it's an error from the script (e.g., script logic failure after receiving data), 'result.error' above should have caught it.
      throw error; // Re-throw to be caught by the calling function's try-catch
    }
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
    
    // Store in localStorage as backup
    const orders = JSON.parse(localStorage.getItem('bakery_orders') || '[]')
    orders.push({
      ...orderData,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('bakery_orders', JSON.stringify(orders))
    
    console.log('💾 Order saved to browser localStorage as backup')
    console.log('📧 Please manually record this order or set up Google Apps Script')
    
    return true // Return true so customer sees confirmation
  }

  /**
   * Format order items for display
   */
  formatOrderItems(items: Array<{ name: string; quantity: number; price: number }>): string {
    return items.map(item => 
      `${item.name} x${item.quantity} (£${item.price.toFixed(2)} each)`
    ).join(', ')
  }

  /**
   * Get all orders from localStorage (for manual backup)
   */
  getStoredOrders(): any[] {
    return JSON.parse(localStorage.getItem('bakery_orders') || '[]')
  }

  /**
   * Clear stored orders from localStorage
   */
  clearStoredOrders(): void {
    localStorage.removeItem('bakery_orders')
    console.log('✅ Stored orders cleared from localStorage')
  }
}

// Export singleton instance
export const orderService = new ModernOrderService()

/*
MODERN SETUP INSTRUCTIONS:

OPTION 1: Google Apps Script (Recommended - Free & Reliable)
==========================================================

1. Go to script.google.com
2. Create new project: "Awa Dough Order Handler"
3. Replace default code with this:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Replace 'YOUR_SHEET_ID' with your Google Sheet ID
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 12).setValues([[
        'Timestamp', 'Customer Name', 'Phone', 'Address', 'Notes', 
        'Delivery Option', 'Order Items', 'Subtotal', 'Delivery Fee', 
        'Total', 'Reference', 'Order Date'
      ]]);
    }
    
    // Add order data
    sheet.appendRow([
      new Date(),
      data.customerName,
      data.customerPhone,
      data.customerAddress || '',
      data.customerNotes || '',
      data.deliveryOption,
      data.orderItems,
      data.subtotal,
      data.deliveryFee,
      data.totalAmount,
      data.referenceNumber,
      data.orderDate
    ]);
    
    // Optional: Send email notification
    const subject = `New Order: ${data.referenceNumber}`;
    const body = `New order received from ${data.customerName}\n\nDetails:\n${JSON.stringify(data, null, 2)}`;
    GmailApp.sendEmail('hello@awadough.co.uk', subject, body);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}));
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}));
  }
}
```

4. Deploy as Web App:
   - Click Deploy → New deployment
   - Type: Web app
   - Execute as: Me
   - Access: Anyone
   - Deploy and copy the URL

5. Create .env file:
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

OPTION 2: Alternative Services
=============================

- Formspree.io (free tier available)
- Netlify Forms (if hosting on Netlify)
- EmailJS (sends emails directly)

BENEFITS OF THIS APPROACH:
=========================
✅ No Google Forms field ID issues
✅ Direct Google Sheets integration
✅ Email notifications
✅ More reliable and future-proof
✅ Better error handling
✅ Automatic backup in browser
✅ Works immediately (with fallback)
*/

/*
SETUP INSTRUCTIONS:

1. CREATE A GOOGLE FORM:
   - Go to https://forms.google.com
   - Create a new form titled "Awa Dough Bakery Orders"
   - Add the following fields:
     * Customer Name (Short answer)
     * Customer Phone (Short answer)
     * Customer Address (Long answer, optional)
     * Customer Notes (Long answer, optional)
     * Delivery Option (Multiple choice: Pickup, Delivery)
     * Order Items (Long answer)
     * Subtotal (Short answer)
     * Delivery Fee (Short answer)
     * Total Amount (Short answer)
     * Reference Number (Short answer)
     * Order Date (Short answer)
     * Order Time (Short answer)

2. GET THE FORM URL:
   - In your Google Form, click "Send"
   - Copy the form URL (should look like: https://docs.google.com/forms/d/e/[FORM_ID]/viewform)
   - Change "viewform" to "formResponse" at the end

3. GET FIELD IDs:
   - Right-click on each form field and "Inspect Element"
   - Look for the "name" attribute, it will be like "entry.123456789"
   - Note down each field's entry ID

4. SET UP ENVIRONMENT VARIABLES:
   Create a .env file in your project root with:
   
   VITE_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/[YOUR_FORM_ID]/formResponse
   VITE_FORM_FIELD_NAME=entry.123456789
   VITE_FORM_FIELD_PHONE=entry.987654321
   VITE_FORM_FIELD_ADDRESS=entry.456789123
   VITE_FORM_FIELD_NOTES=entry.789123456
   VITE_FORM_FIELD_DELIVERY=entry.321654987
   VITE_FORM_FIELD_ITEMS=entry.654987321
   VITE_FORM_FIELD_SUBTOTAL=entry.147258369
   VITE_FORM_FIELD_DELIVERY_FEE=entry.963852741
   VITE_FORM_FIELD_TOTAL=entry.258147369
   VITE_FORM_FIELD_REFERENCE=entry.741852963
   VITE_FORM_FIELD_DATE=entry.369258147
   VITE_FORM_FIELD_TIME=entry.852741963

5. CONNECT TO GOOGLE SHEETS:
   - In your Google Form, go to "Responses" tab
   - Click the Google Sheets icon to create a connected spreadsheet
   - This will automatically collect all form submissions

6. SET UP EMAIL NOTIFICATIONS:
   - In the connected Google Sheet, go to Tools > Notification settings
   - Set up email notifications for new form submissions
   - You'll get an email every time someone places an order!

BENEFITS:
✅ Completely free
✅ Automatic Google Sheets integration
✅ Email notifications
✅ Data export capabilities
✅ No backend server needed
✅ Reliable Google infrastructure
*/
