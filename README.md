<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MechOS - Mobile Mechanic Management</title>
</head>
<body>
    <h1>🔧 MechOS</h1>
    <p>Mobile-first Progressive Web App for roadside and mobile mechanics in Nigeria.</p>

    <h2>🚀 Quick Start</h2>

    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js 16+ installed</li>
        <li>Supabase project created (free tier works)</li>
        <li>Git installed</li>
    </ul>

    <h3>Installation</h3>
    <pre><code># 1. Clone the repository

git clone https://github.com/YOUR_ORG/mechos-frontend.git
cd mechos-frontend

# 2. Install dependencies

npm install

# 3. Configure Supabase (see SUPABASE_SETUP.md)

cp .env.example .env.local

# Edit .env.local with your Supabase credentials

# 4. Start development server

npm run dev

# Opens http://localhost:5173</code></pre>

    <h2>📚 Documentation</h2>
    <ul>
        <li><a href="./SUPABASE_SETUP.md">Supabase Integration Guide</a></li>
        <li><a href="./GITHUB_SETUP.md">GitHub Repository & Team Access</a></li>
    </ul>

    <h2>✨ Features</h2>
    <ul>
        <li>✅ Phone OTP authentication via Supabase</li>
        <li>✅ Customer management (add, search, view)</li>
        <li>✅ Vehicle tracking per customer</li>
        <li>✅ Repair job logging with photos & voice input</li>
        <li>✅ Parts tracking and cost calculation</li>
        <li>✅ Service reminders with WhatsApp integration</li>
        <li>✅ Receipt generation and sending</li>
        <li>✅ Mobile-optimized UI (WhatsApp-simple design)</li>
        <li>✅ Bottom navigation for easy thumb access</li>
        <li>✅ Progressive Web App (works offline in future versions)</li>
    </ul>

    <h2>🛠️ Tech Stack</h2>
    <ul>
        <li><strong>Frontend</strong>: React 18, React Router 6</li>
        <li><strong>Build Tool</strong>: Vite 5</li>
        <li><strong>HTTP Client</strong>: Axios</li>
        <li><strong>Backend</strong>: Supabase (PostgreSQL, Auth, REST API)</li>
        <li><strong>Styling</strong>: Pure CSS (no frameworks, minimal bundle)</li>
        <li><strong>Deployment</strong>: Netlify / Vercel</li>
    </ul>

    <h2>📱 Project Structure</h2>
    <pre><code>mechos-frontend/

├── src/
│ ├── pages/
│ │ ├── Login.jsx # Phone OTP login
│ │ ├── Home.jsx # Dashboard
│ │ ├── CustomerList.jsx # Browse customers
│ │ ├── AddCustomer.jsx # Create customer
│ │ ├── CustomerDetail.jsx # Customer profile
│ │ ├── AddVehicle.jsx # Add vehicle
│ │ ├── AddJob.jsx # Log repair job
│ │ ├── JobDetail.jsx # View job & send receipt
│ │ ├── Reminders.jsx # Service reminders
│ │ └── Profile.jsx # Mechanic profile
│ ├── components/
│ │ └── UI.jsx # Shared components & icons
│ ├── lib/
│ │ ├── api.js # Axios config
│ │ ├── supabase.js # Supabase helpers
│ │ └── AuthContext.jsx # Auth state management
│ ├── hooks/
│ │ └── useToast.js # Toast notifications
│ ├── App.jsx # Router
│ ├── main.jsx # Entry point
│ └── index.css # Design system
├── public/
│ ├── \_redirects # Netlify SPA routing
│ └── index.html
├── vite.config.js # Vite configuration
├── package.json
└── .env.local # Supabase config (don't commit)
</code></pre>

    <h2>🔐 Environment Setup</h2>
    <p><strong>Create <code>.env.local</code> in project root:</strong></p>
    <pre><code>VITE_API_URL=https://YOUR_PROJECT.supabase.co

VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key</code></pre>
<p>Get these from: Supabase Dashboard → Settings → API</p>

    <h2>🚀 Build & Deploy</h2>
    <h3>Local Build</h3>
    <pre><code>npm run build    # Creates optimized dist/ folder

npm run preview # Preview production build locally</code></pre>

    <h3>Deploy to Netlify</h3>
    <ol>
        <li>Push code to GitHub</li>
        <li>Connect GitHub repo to Netlify</li>
        <li>Add environment variables in Netlify settings</li>
        <li>Auto-deploys on push to main branch</li>
    </ol>

    <h2>🧪 Testing</h2>
    <p>Test each page manually after connecting Supabase:</p>
    <ul>
        <li>✅ Login: Enter phone → Verify OTP → Dashboard</li>
        <li>✅ Customers: Search, add, view details</li>
        <li>✅ Vehicles: Add vehicle to customer</li>
        <li>✅ Jobs: Log repair with photos & parts</li>
        <li>✅ Reminders: View and send via WhatsApp</li>
        <li>✅ Profile: Edit business info</li>
    </ul>

    <h2>🎯 Design System</h2>
    <ul>
        <li><strong>Colors</strong>: Green (#1D9E75), Amber (#EF9F27), Red (#D85A30)</li>
        <li><strong>Buttons</strong>: 54px tall minimum</li>
        <li><strong>Inputs</strong>: 52px tall, 16px font (prevents iOS zoom)</li>
        <li><strong>Layout</strong>: Mobile-first, max-width 480px</li>
        <li><strong>Navigation</strong>: Bottom nav with 4 tabs</li>
    </ul>

    <h2>👥 Team & Collaboration</h2>
    <p>See <a href="./GITHUB_SETUP.md">GITHUB_SETUP.md</a> for:</p>
    <ul>
        <li>Branch protection rules</li>
        <li>PR review process</li>
        <li>Team member access levels</li>
        <li>CI/CD configuration</li>
        <li>Deployment workflow</li>
    </ul>

    <h2>🐛 Troubleshooting</h2>
    <p><strong>OTP not sending?</strong></p>
    <ul>
        <li>Check Supabase Auth is enabled in dashboard</li>
        <li>Verify phone number format (include country code)</li>
        <li>Check Supabase Auth logs for errors</li>
    </ul>

    <p><strong>API calls failing?</strong></p>
    <ul>
        <li>Verify .env.local has correct Supabase URL and key</li>
        <li>Check browser DevTools → Network tab</li>
        <li>Ensure JWT token is saved after login</li>
    </ul>

    <p><strong>Routes not working?</strong></p>
    <ul>
        <li>Check dev server is running (npm run dev)</li>
        <li>Clear browser cache and refresh</li>
        <li>Look at browser console for errors</li>
    </ul>

    <h2>📞 Support</h2>
    <ul>
        <li><strong>Supabase Docs</strong>: https://supabase.com/docs</li>
        <li><strong>React Docs</strong>: https://react.dev</li>
        <li><strong>Vite Docs</strong>: https://vitejs.dev</li>
    </ul>

    <h2>📄 License</h2>
    <p>MIT License - See LICENSE file for details</p>

    <hr>
    <p><strong>Created for mobile mechanics in Nigeria 🇳🇬</strong></p>
    <p><em>Simple. Fast. Reliable.</em></p>

</body>
</html>
