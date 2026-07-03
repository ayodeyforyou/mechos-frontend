# 🚀 Deploy MechOS to Netlify

This guide walks you through deploying your MechOS frontend to production on Netlify with Supabase OTP authentication.

---

## ✅ Prerequisites

- ✅ Netlify account (https://netlify.com)
- ✅ GitHub account with this repository
- ✅ Supabase project with Phone Auth enabled
- ✅ Code pushed to GitHub main branch

---

## 📋 Step 1: Enable Phone Auth in Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. **Auth → Providers → Phone**
   - Enable "Phone Auth"
   - Save
4. **Auth → URL Configuration**
   - Add your Netlify URL to "Redirect URLs":
   - Example: `https://your-site.netlify.app/`
5. **Settings → API Keys**
   - Copy your Anon/Public Key (starts with `sb_`)
   - Save for later

---

## 🔗 Step 2: Connect GitHub to Netlify

1. Go to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Authorize Netlify to access GitHub
5. Select your `mechos-frontend` repository

---

## ⚙️ Step 3: Configure Build Settings

In Netlify's build configuration:

```
Build command:    npm run build
Publish directory: dist
```

✅ These are already set in `netlify.toml`, so Netlify will detect them automatically.

---

## 🔐 Step 4: Add Environment Variables

In Netlify Dashboard:

1. Go to **Settings → Build & Deploy → Environment**
2. Click "Edit variables"
3. Add these three variables:

| Variable | Value | Example |
|----------|-------|---------|
| `VITE_API_URL` | Your Supabase URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_URL` | Your Supabase URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Public Anon Key | `sb_public_xyz...` |

⚠️ **Important:**
- Never commit these to git
- Use the same credentials from `.env.local`
- The keys are public (safe to expose in frontend)

---

## 🚀 Step 5: Deploy

1. Push to GitHub main branch
```bash
git add .
git commit -m "your message"
git push origin main
```

2. Netlify automatically deploys when you push
3. Watch the build in Netlify Dashboard
4. When complete, you'll get a URL like `https://your-site.netlify.app`

---

## ✅ Step 6: Test OTP Flow

1. Open your Netlify URL
2. Enter a valid phone number (with country code: +234...)
3. Click "Send OTP"
4. SMS should arrive on your phone
5. Enter the OTP code
6. You should be logged in and redirected to home

### Troubleshooting OTP Issues:

**Problem: "No 'Access-Control-Allow-Origin'" CORS error**
- ✅ Fixed! We now use Supabase SDK which handles CORS properly

**Problem: OTP not sending**
- Check phone auth is enabled in Supabase
- Check phone number format (include country code)
- Check SMS credits/configuration in Supabase

**Problem: App loads blank page**
- Check environment variables in Netlify are set correctly
- Check build logs in Netlify Dashboard
- Open browser DevTools → Network tab for errors

**Problem: Routes don't work**
- ✅ Fixed! `netlify.toml` has SPA routing configured

---

## 🌐 Configure Your Domain

1. In Netlify Dashboard: **Settings → Domain management**
2. Click "Add domain"
3. Choose:
   - Use Netlify domain: `your-site.netlify.app`
   - Or connect custom domain (godaddy, namecheap, etc)

---

## 📊 View Deployment Status

In Netlify Dashboard:

- **Deployments** - See all deployed versions
- **Analytics** - View usage and errors
- **Build logs** - Debug build failures
- **Function logs** - Debug server functions (if used)

---

## 🔄 Continuous Deployment (Auto-Deploy)

Every time you push to `main`:

1. GitHub notifies Netlify
2. Netlify runs `npm run build`
3. Built files deployed to production
4. Your app is live instantly!

No manual deploy needed!

---

## 🔐 Security Best Practices

✅ **Do:**
- Store secrets in Netlify environment variables (not git)
- Use HTTPS (Netlify provides free SSL)
- Keep dependencies updated (`npm audit fix`)
- Monitor logs for errors

❌ **Don't:**
- Commit `.env.local` to git
- Hardcode API keys in source code
- Use production keys in development
- Ignore security warnings

---

## 📱 Test on Mobile

1. Open your Netlify URL on phone
2. Test login on mobile browser
3. Test all pages (responsive design)
4. Test offline functionality (PWA)

---

## 🆘 Debugging Production Issues

### View Logs:
```bash
# See recent builds
netlify deploy --list

# View full logs
netlify deploy --json | jq '.logs'
```

### Browser DevTools:
1. F12 → Console
2. Check for errors
3. Check Network tab for failed API calls

### Netlify Logs:
1. Netlify Dashboard → Deploys
2. Click latest deploy
3. View build logs and function logs

---

## 🎉 You're Live!

Your MechOS app is now:
- ✅ Deployed to production
- ✅ Running on HTTPS
- ✅ Connected to Supabase
- ✅ Auto-updating on every push
- ✅ Mobile responsive
- ✅ OTP authentication working

**Next steps:**
- [ ] Test all features
- [ ] Get feedback from mechanics
- [ ] Monitor usage in Netlify Analytics
- [ ] Add team members to GitHub
- [ ] Configure domain name
- [ ] Set up monitoring/alerts

---

## 🔗 Quick Links

- Netlify Dashboard: https://app.netlify.com
- Supabase Dashboard: https://app.supabase.com
- GitHub: https://github.com/ayodeyforyou/mechos-frontend
- Your App: https://your-site.netlify.app

---

## 📞 Support

- **Netlify Issues**: https://docs.netlify.com
- **Supabase Issues**: https://supabase.com/docs
- **Build Fails**: Check Netlify build logs
- **Auth Fails**: Check Supabase Auth logs

---

**Status: Ready for Production Deployment** 🎯
