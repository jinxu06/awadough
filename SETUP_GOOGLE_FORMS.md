# Awa Dough Bakery - Modern Order Collection Setup

This guide helps you set up automatic order collection using **Google Apps Script** instead of Google Forms. This approach is more reliable and doesn't require finding field IDs.

## 🎯 What You'll Get:
- ✅ All orders automatically saved to Google Sheets
- ✅ Email notifications for new orders  
- ✅ No complex field ID configuration needed
- ✅ More reliable than Google Forms
- ✅ Better error handling
- ✅ Completely free!

## 🚀 Quick Setup (15 minutes):

### Step 1: Create a Google Sheet
1. Go to **https://sheets.google.com**
2. Create a new sheet called **"Awa Dough Orders"**
3. **Copy the Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123example456/edit
                                       ^^^^^^^^^^^^^^^^^^^
                                       This is your Sheet ID
   ```

### Step 2: Set up Google Apps Script
1. Go to **https://script.google.com**
2. Click **"New Project"**
3. **Replace all the default code** with this:

```javascript
function doPost(e) {
  try {
    // Parse the incoming order data
    const data = JSON.parse(e.postData.contents);
    
    // ⚠️ REPLACE 'YOUR_SHEET_ID_HERE' with your actual Google Sheet ID
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID_HERE').getActiveSheet();
    
    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 12).setValues([[
        'Timestamp', 'Customer Name', 'Phone', 'Address', 'Notes', 
        'Delivery Option', 'Order Items', 'Subtotal', 'Delivery Fee', 
        'Total', 'Reference', 'Order Date'
      ]]);
    }
    
    // Add the new order
    sheet.appendRow([
      new Date(),                    // Timestamp
      data.customerName || '',       // Customer Name
      data.customerPhone || '',      // Phone
      data.customerAddress || '',    // Address (if delivery)
      data.customerNotes || '',      // Special notes
      data.deliveryOption || '',     // Pickup or Delivery
      data.orderItems || '',         // Order details
      data.subtotal || 0,           // Subtotal
      data.deliveryFee || 0,        // Delivery fee
      data.totalAmount || 0,        // Total amount
      data.referenceNumber || '',   // Reference number
      data.orderDate || ''          // Order date
    ]);
    
    // 📧 Optional: Send email notification (replace with your email)
    const subject = `New Bakery Order: ${data.referenceNumber}`;
    const emailBody = `
New order received from ${data.customerName}

Reference: ${data.referenceNumber}
Phone: ${data.customerPhone}
${data.deliveryOption === 'delivery' ? 'Delivery Address: ' + data.customerAddress : 'Pickup from shop'}
Order: ${data.orderItems}
Total: £${data.totalAmount}

${data.customerNotes ? 'Special Notes: ' + data.customerNotes : ''}
    `;
    
    // ⚠️ REPLACE 'hello@awadough.co.uk' with your actual email
    GmailApp.sendEmail('hello@awadough.co.uk', subject, emailBody);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error and return failure response
    console.error('Error processing order:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to make sure the script works
function doGet() {
  return ContentService
    .createTextOutput('Awa Dough Bakery Order Service is running! ✅')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

4. **Important**: Replace these placeholders:
   - `YOUR_SHEET_ID_HERE` → Your actual Google Sheet ID from Step 1
   - `hello@awadough.co.uk` → Your actual email address

### Step 3: Deploy the Script
1. Click **"Deploy"** → **"New deployment"**
2. Click the gear icon ⚙️ next to "Type" and select **"Web app"**
3. Set these options:
   - **Description**: "Awa Dough Order Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click **"Deploy"**
5. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 4: Configure Your Website
1. Create a `.env` file in your website folder
2. Add this line with your Web App URL:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

### Step 5: Test Your Setup
1. Place a test order on your website
2. Check your Google Sheet - the order should appear instantly
3. Check your email for the notification

## 📊 What You'll See in Google Sheets:

| Timestamp | Customer Name | Phone | Address | Notes | Delivery Option | Order Items | Subtotal | Delivery Fee | Total | Reference | Order Date |
|-----------|---------------|-------|---------|-------|-----------------|-------------|----------|--------------|-------|-----------|------------|
| 2025-06-09 14:30:25 | John Smith | 07123456789 | 123 Main St, Birmingham | No nuts please | delivery | Croissant x2, Sourdough x1 | £8.50 | £0.00 | £8.50 | AWA-ABC-1234 | 2025-06-09 |

## 🔧 Managing Orders:

### For Pickup Orders:
- Customer collects from: **2 Bissell St, Birmingham B5 7HP**
- Ready on: **Wednesday**
- Use reference number to find the order

### For Delivery Orders:
- Deliver on: **Thursday**
- Address shown in Google Sheet
- Free delivery over £45, otherwise £5 fee

### Payment Tracking:
1. Add a **"Payment Status"** column to your sheet
2. Mark as "Paid" when payment received
3. Payment methods: Bank transfer, PayPal, Cash

## 🎉 Benefits Over Google Forms:

| Feature | Google Forms | Google Apps Script |
|---------|--------------|-------------------|
| **Setup Complexity** | Complex (field IDs) | Simple (copy/paste) |
| **Reliability** | Sometimes breaks | Very reliable |
| **Customization** | Limited | Fully customizable |
| **Email Notifications** | Manual setup | Built-in |
| **Error Handling** | Poor | Excellent |
| **Future-proof** | Dependent on Google | More control |

## 🆘 Troubleshooting:

**Orders not appearing in sheet?**
- Check the Sheet ID is correct in your script
- Make sure the script is deployed and permissions granted

**Not receiving email notifications?**
- Check your email address in the script
- Check spam folder
- Gmail API needs to be enabled (automatic on first use)

**Website showing errors?**
- Check the Web App URL in your `.env` file
- Make sure the script is deployed as "Anyone" can access

## 🔒 Security Notes:
- Your script URL is public but only accepts POST requests
- No sensitive data is exposed
- Orders are only visible to you in your Google Sheet
- Gmail integration uses your Google account securely

## 📱 Mobile Access:
- View orders on your phone via Google Sheets app
- Get instant email notifications
- Process orders from anywhere

Your bakery website now has a professional, reliable order management system! 🥐✨

---

**Need help?** Check the browser console for any error messages or contact your web developer.
