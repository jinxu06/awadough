# Setting Up Formspree for Order Collection

Formspree is a simple, reliable form handling service that works perfectly with static websites and has built-in CORS support.

## Step 1: Create a Formspree Account

1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account (allows 50 submissions per month)
3. For unlimited submissions, consider upgrading to a paid plan

## Step 2: Create a New Form

1. After logging in, click "New Form"
2. Give your form a name like "Awadough Bakery Orders"
3. Copy the form endpoint URL that looks like: `https://formspree.io/f/YOUR_FORM_ID`

## Step 3: Configure Your Environment

1. Open your `.env` file
2. Replace `YOUR_FORM_ID` in the `VITE_FORMSPREE_URL` with your actual form ID:
   ```
   VITE_FORMSPREE_URL=https://formspree.io/f/xpznvabr
   ```

## Step 4: Configure Email Settings

In your Formspree dashboard:

1. Go to your form settings
2. Set up email notifications:
   - **Email:** Your bakery email (aaron.jin.xu@gmail.com)
   - **Subject:** You can customize this in the form
3. Optionally set up auto-replies to customers

## Step 5: Test the Integration

1. Restart your development server: `npm run dev`
2. Try placing a test order
3. Check your email for the order notification
4. Check your Formspree dashboard to see the submission

## Benefits of Formspree

- ✅ **No CORS issues** - Built specifically for frontend forms
- ✅ **Instant setup** - No server configuration needed
- ✅ **Email notifications** - Automatic email alerts for new orders
- ✅ **Spam protection** - Built-in spam filtering
- ✅ **Dashboard** - View all submissions in one place
- ✅ **Reliable** - Professional service with high uptime

## Formspree Features

- **Free tier:** 50 submissions/month
- **Paid tiers:** Start at $8/month for 1000 submissions
- **Custom subjects:** Each email can have custom subject lines
- **Webhooks:** Can integrate with other services
- **Export data:** Download submissions as CSV

## Alternative: If You Want to Continue with Google Apps Script

If you prefer to stick with Google Apps Script despite the CORS issues, you could:

1. Deploy your site and test from the live GitHub Pages URL instead of localhost
2. Sometimes CORS issues only affect local development, not production
3. Or implement a simple proxy server for development

But Formspree is recommended for its simplicity and reliability.
