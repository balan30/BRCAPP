# Supabase Setup Guide for Bhavishya Road Carriers

Follow these steps to set up Supabase for your Transport Management System:

## Step 1: Create Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up with your email or GitHub account

## Step 2: Create New Project
1. Click "New Project"
2. Choose your organization (or create one)
3. Fill in project details:
   - **Project Name**: `bhavishya-road-carriers`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location (e.g., Mumbai for India)
4. Click "Create new project"
5. Wait 2-3 minutes for project setup

## Step 3: Get Project Credentials
1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy these values:
   - **Project URL** (starts with https://...)
   - **anon public key** (starts with eyJ...)

## Step 4: Connect to Your Application
1. In your application, click the **"Connect to Supabase"** button in the top right
2. Paste your Project URL and anon key
3. Click "Connect"

## Step 5: Set Up Database Schema
After connecting, the application will automatically create the necessary database tables:

### Tables Created:
- `loading_slips` - Store all loading slip data
- `memos` - Store memo information
- `bills` - Store bill details
- `banking_entries` - Store banking transactions
- `parties` - Store party/customer information
- `suppliers` - Store supplier information
- `advance_payments` - Store advance payment records
- `ledger_entries` - Store ledger transactions

### Security Features:
- Row Level Security (RLS) enabled on all tables
- Authentication required for data access
- Automatic user isolation

## Step 6: Authentication Setup
1. Go to **Authentication** → **Settings** in Supabase dashboard
2. Under **Site URL**, add your application URL:
   - For local development: `http://localhost:5173`
   - For production: your deployed URL
3. Disable email confirmation (for easier testing):
   - Go to **Authentication** → **Settings**
   - Turn OFF "Enable email confirmations"

## Step 7: Test the Connection
1. Try creating a Loading Slip in your application
2. Check the Supabase dashboard → **Table Editor** to see if data appears
3. Data should sync in real-time across all devices

## Step 8: Backup and Security (Recommended)
1. Go to **Settings** → **Database**
2. Enable **Point-in-time Recovery** for automatic backups
3. Set up **Database Webhooks** if needed for external integrations

## Troubleshooting

### Connection Issues:
- Verify Project URL and anon key are correct
- Check browser console for error messages
- Ensure Supabase project is active (not paused)

### Data Not Syncing:
- Check internet connection
- Verify RLS policies are properly set
- Check Authentication status

### Performance:
- Supabase free tier includes:
  - 500MB database storage
  - 2GB bandwidth per month
  - 50,000 monthly active users
- Upgrade to Pro plan if you exceed limits

## Support
- Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Community Support: [https://github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)

---

**Note**: Keep your database password and API keys secure. Never share them publicly or commit them to version control.