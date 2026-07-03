# MechOS Frontend - Supabase Integration Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase Connection

Create `.env.local` file in the project root:

```env
VITE_API_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Get these values from your Supabase project:**

1. Go to https://app.supabase.com
2. Select your project
3. Click "Settings" → "API"
4. Copy the URL and public (anon) key

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

---

## 📱 Features Connected to Supabase

✅ **Authentication**

- Phone OTP login via Supabase Auth
- JWT token management
- Auto-redirect to login on 401

✅ **Data Management**

- Customers, Vehicles, Jobs
- Parts, Photos, Receipts
- Service Reminders

✅ **Real-time Features** (Coming soon)

- Live job updates
- Customer notifications

---

## 🔐 Security Notes

⚠️ **Never commit `.env.local`** - it contains sensitive keys

- The `.gitignore` already excludes it
- Use `.env.example` as a template for team members

✅ **Supabase Row Level Security (RLS)**

- Each mechanic can only access their own data
- Configured in Supabase via policies

✅ **Environment Variables**

- Use `VITE_` prefix for variables exposed to browser
- Backend API calls should validate JWT tokens

---

## 📚 API Endpoints (via Supabase)

All endpoints are proxied through Supabase REST API:

**Authentication**

- `POST /auth/v1/otp` - Request OTP
- `POST /auth/v1/verify` - Verify OTP

**Customers**

- `GET /rest/v1/customers` - List all
- `POST /rest/v1/customers` - Create
- `GET /rest/v1/customers/:id` - Get one
- `PATCH /rest/v1/customers/:id` - Update
- `DELETE /rest/v1/customers/:id` - Delete

**Vehicles**

- `GET /rest/v1/vehicles` - List
- `POST /rest/v1/vehicles` - Create
- Similar CRUD operations

**Jobs, Parts, Reminders, Photos**

- Follow same REST pattern as above

---

## 🐙 GitHub Repository Setup

### Grant Access to Repository

If deploying this to a team GitHub repo:

```bash
# Clone the repository
git clone https://github.com/YOUR_ORG/mechos-frontend.git
cd mechos-frontend

# Install dependencies
npm install

# Create .env.local (don't commit this!)
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development
npm run dev
```

### Recommended GitHub Settings

1. **Protect main branch**
   - Require pull request reviews
   - Require status checks to pass

2. **Add branch protection rules**
   - Dismiss stale pull request approvals
   - Require branches to be up to date before merging

3. **Add secrets for CI/CD** (if using GitHub Actions)
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `VITE_API_URL` (for production deployment)

4. **Team member access**
   - Add members with appropriate roles
   - Frontend team should have "Maintain" or "Write" access

---

## 🚨 Troubleshooting

**Issue: "404 Not Found" on routes**

- Make sure dev server is running (`npm run dev`)
- Check that React Router is working (open browser console)

**Issue: "Unauthorized" on API calls**

- Check `.env.local` has correct Supabase URL and key
- Verify token is being saved to localStorage after login
- Check browser DevTools → Application → Local Storage

**Issue: OTP not sending**

- Verify Supabase Auth is enabled in your project
- Check that phone number format is correct (include country code)
- Look at Supabase logs in dashboard → Auth section

**Issue: CORS errors**

- Supabase handles CORS automatically for the REST API
- If using a custom backend, ensure it has CORS headers

---

## 📦 Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Add environment variables in Netlify settings:
   - `VITE_API_URL`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Netlify automatically runs `npm run build` and deploys

The `public/_redirects` file handles React Router redirects.

### Deploy to Vercel

Similar process:

1. Import GitHub repo
2. Add environment variables
3. Deploy

---

## 📞 Support

For issues with:

- **Supabase**: https://supabase.com/docs
- **React**: https://react.dev
- **Vite**: https://vitejs.dev

---

## 📋 Project Structure

```
mechos-frontend/
├── src/
│   ├── pages/          # React page components
│   ├── components/     # Shared UI components
│   ├── lib/           # API & auth utilities
│   ├── hooks/         # Custom React hooks
│   ├── App.jsx        # Router setup
│   ├── main.jsx       # Entry point
│   └── index.css      # Design system
├── public/            # Static files
├── package.json       # Dependencies
├── vite.config.js     # Vite configuration
└── .env.local         # Local environment (don't commit)
```

---

## ✨ Next Steps

- [ ] Test login flow with Supabase OTP
- [ ] Verify CRUD operations work
- [ ] Test on mobile device
- [ ] Deploy to production
- [ ] Set up monitoring/logging
