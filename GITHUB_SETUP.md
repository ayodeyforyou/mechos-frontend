# GitHub Repository Setup & Access

## 🚀 Repository Configuration

This project is ready for team collaboration with proper access controls and security.

### Access Levels

| Role         | Permissions                    | Use Case                |
| ------------ | ------------------------------ | ----------------------- |
| **Admin**    | Full control, can delete repo  | Tech lead, repo owner   |
| **Maintain** | Push, merge PRs, manage issues | Senior developers       |
| **Write**    | Push code, create PRs          | All frontend developers |
| **Triage**   | Review, comment, close issues  | QA, product managers    |
| **Read**     | Clone, view code               | Stakeholders, observers |

---

## 👥 Adding Team Members

### Via GitHub Organization

1. Go to https://github.com/organizations/YOUR_ORG/people
2. Click "Add member"
3. Enter username
4. Select role
5. Send invitation

### Via Repository

1. Go to repo Settings → Collaborators
2. Click "Add people"
3. Search for username
4. Choose role
5. Send invitation

---

## 🔐 Security Best Practices

### 1. Protect Main Branch

Go to **Settings → Branches → Branch Protection Rules**:

- ✅ Require pull request reviews (minimum 1)
- ✅ Dismiss stale pull request approvals
- ✅ Require status checks to pass before merging
- ✅ Include administrators in restrictions

```
Pattern: main
- Require pull request reviews: Yes (1 reviewer)
- Require status checks: Yes
- Require branches up to date: Yes
- Include administrators: Yes
```

### 2. Secret Management

**Never commit secrets!** Add to `.gitignore`:

```
.env.local
.env*.local
.DS_Store
node_modules/
dist/
build/
```

For CI/CD secrets, use **Settings → Secrets and variables → Actions**:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `VITE_API_URL`

### 3. Code Review Process

1. Create feature branch from `main`

   ```bash
   git checkout -b feature/customer-search
   ```

2. Make changes and commit

   ```bash
   git add .
   git commit -m "Add customer search with debounce"
   ```

3. Push and create Pull Request

   ```bash
   git push origin feature/customer-search
   ```

4. Request review from team members

5. After approval, merge to `main`

6. Delete feature branch

---

## 🔄 GitHub Actions (CI/CD)

### Automated Tests & Linting

Create `.github/workflows/lint.yml`:

```yaml
name: Lint & Build

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run build
      - run: npm run lint # If you add linting
```

### Deploy to Netlify on Main

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run build
      - uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: "./dist"
          production-branch: main
          netlify-config-path: ./netlify.toml
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 📝 Commit Message Convention

Follow this format for clear commit history:

```
type(scope): subject

- type: feat, fix, docs, style, refactor, perf, test, chore
- scope: component name or area (e.g., auth, customer, job)
- subject: 50 chars max, imperative mood

Examples:
- feat(auth): add phone OTP verification
- fix(customer): resolve search debounce issue
- docs(readme): update Supabase setup instructions
- refactor(api): improve error handling
```

---

## 🌳 Branch Strategy

### Main Branch (`main`)

- Always production-ready
- Protected by PR reviews
- Deployed to production

### Development Branch (`develop`)

- Integration branch for features
- Deployed to staging environment
- Code review required

### Feature Branches

- `feature/customer-management`
- `feature/job-logging`
- `fix/search-debounce`

Format: `type/description`

---

## 🚀 Deployment Workflow

```
Feature Branch → Pull Request → Code Review → Merge to main → Auto-deploy
```

1. Developer creates feature branch
2. Developer opens PR with description
3. Team members review and comment
4. After approval, merge to main
5. GitHub Actions automatically deploys to production

---

## 📊 Repository Statistics

**Recommended tracking:**

- Issues per sprint
- PR review time
- Deployment frequency
- Bug escape rate

Use GitHub's **Insights** tab to view:

- Code frequency
- Network graph
- Dependents

---

## 🛠️ Local Setup for Team Members

```bash
# Clone repository
git clone https://github.com/YOUR_ORG/mechos-frontend.git
cd mechos-frontend

# Install dependencies
npm install

# Create environment file (don't commit!)
cp .env.example .env.local

# Ask team lead for .env.local values OR
# Get from password manager (1Password, Bitwarden, etc.)

# Start development
npm run dev
```

---

## 📱 Code Ownership

Use `.github/CODEOWNERS` to auto-assign reviewers:

```
# Auth & login
/src/pages/Login.jsx @tech-lead
/src/lib/AuthContext.jsx @tech-lead

# Customers
/src/pages/Customer*.jsx @frontend-team

# Jobs & repairs
/src/pages/Job*.jsx @frontend-team
/src/pages/AddJob.jsx @senior-dev
```

---

## 🔍 Issue Tracking

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Docs improvements
- `good first issue` - Good for beginners
- `high priority` - Urgent
- `blocked` - Waiting on something else

### Issue Template

```markdown
## Description

Clear description of the issue

## Steps to Reproduce

1. Login to app
2. Click "Add customer"
3. ...

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: macOS / Windows / Linux
- Browser: Chrome / Safari
- Device: Desktop / Mobile
```

---

## 📋 PR Review Checklist

When reviewing code, check:

- ✅ Code follows project style
- ✅ No console errors/warnings
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Accessibility (keyboard nav, screen reader)
- ✅ Error handling added
- ✅ Loading states included
- ✅ No hardcoded values
- ✅ Environment variables used
- ✅ Tests added (if applicable)
- ✅ Documentation updated

---

## 🎓 Team Onboarding

### Day 1

- [ ] GitHub access granted
- [ ] Clone repository locally
- [ ] Install dependencies
- [ ] Set up `.env.local`
- [ ] Start dev server (`npm run dev`)

### Day 2

- [ ] Read project documentation
- [ ] Review Supabase database schema
- [ ] Understand authentication flow
- [ ] Make small bug fix (first PR)

### Week 1

- [ ] Complete feature assignment
- [ ] Create PR with proper description
- [ ] Get code reviewed
- [ ] Merge to main

---

## 📞 Support Channels

- **Questions**: GitHub Discussions
- **Bugs**: GitHub Issues
- **Code Review**: Pull Request comments
- **General**: Team Slack channel

---

## ✨ Next Steps

- [ ] Set up branch protection rules
- [ ] Add team members with appropriate access
- [ ] Create GitHub Issues for initial tasks
- [ ] Set up CI/CD workflows
- [ ] Configure Netlify deployment
- [ ] Create project board for tracking work
