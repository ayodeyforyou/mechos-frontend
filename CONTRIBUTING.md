# Contributing to MechOS

We're excited that you want to contribute to MechOS! This guide will help you get started.

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/mechos-frontend.git
cd mechos-frontend
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use clear naming:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code improvements
- `perf/` - Performance improvements

### 3. Set Up Local Environment

```bash
npm install
cp .env.example .env.local
# Ask team lead for .env.local values or get from password manager
npm run dev
```

### 4. Make Your Changes

- Follow the code style (already enforced by tools)
- Test on mobile view
- Ensure no console errors
- Add loading states & error handling
- Update documentation if needed

### 5. Commit with Clear Messages

```bash
git add .
git commit -m "feat(customer): add search by phone number"
```

Format: `type(scope): message`

Types:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code reorganization
- `perf` - Performance
- `test` - Tests
- `chore` - Maintenance

### 6. Push & Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create PR on GitHub with a clear title and description.

## 📋 Code Guidelines

### File Structure

- Keep components in `src/pages/` or `src/components/`
- Use consistent naming: `PascalCase` for components, `camelCase` for utilities
- One component per file (unless very small)

### React Best Practices

```jsx
// ✅ Good: Functional component with hooks
export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  // ...
}

// ❌ Avoid: Class components
class CustomerList extends React.Component {
  // ...
}
```

### API Calls Pattern

```jsx
// ✅ Always include error handling
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const fetchData = async () => {
  setLoading(true);
  setError("");
  try {
    const { data } = await api.get("/endpoint");
    // Process data
  } catch (err) {
    setError(err.response?.data?.error || "Failed");
  } finally {
    setLoading(false);
  }
};
```

### UI Components

```jsx
// ✅ Use shared components from UI.jsx
import { TopBar, BottomNav, Icon, Avatar, fmt } from '../components/UI'

// ✅ Use design tokens
- Colors: var(--brand-green), var(--text-muted), etc.
- Spacing: 8px, 12px, 16px, 24px
- Border radius: 8px

// ❌ Never use hardcoded colors or sizes
```

### Form Handling

```jsx
// ✅ Use button onClick for forms (not <form onSubmit>)
<button onClick={handleSubmit} disabled={loading}>
  {loading ? <Spinner /> : "Save"}
</button>;

// ✅ Always show field errors
{
  errorMsg && <span className="field-error">{errorMsg}</span>;
}
```

### Mobile Optimization

- Test on actual mobile device or DevTools mobile emulation
- Ensure touch targets are at least 44×44px
- Font size minimum 16px for inputs (prevents iOS zoom)
- Use bottom nav for navigation, not top menu

## 🧪 Testing Checklist

Before submitting PR, test:

- [ ] Works on mobile (use DevTools mobile emulation)
- [ ] Works on tablet
- [ ] No console errors
- [ ] No console warnings
- [ ] All loading states work
- [ ] All error states work
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] Responsive layout looks good

## 📝 PR Review Process

### When Submitting

- ✅ Clear title and description
- ✅ Link to related issues
- ✅ Screenshots of UI changes
- ✅ Tested locally
- ✅ No console errors

### During Review

- Respond promptly to comments
- Make requested changes
- Push changes (don't force push)
- Request re-review when ready

### Approval

- Need 1 approval to merge
- All checks must pass
- No merge conflicts
- Branch must be up to date with main

## 🚀 Deployment

After merge to main:

1. GitHub Actions builds the project
2. If successful, auto-deploys to Netlify
3. Check https://mechos.netlify.app (or your domain)

## 🐛 Reporting Bugs

Use [GitHub Issues](../../issues) with the bug template:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if possible
- Browser & device info

## 💡 Feature Requests

Use [GitHub Issues](../../issues) with the feature template:

- Problem it solves
- How it should work
- Alternative approaches

## 📞 Getting Help

- **Questions**: Create a Discussion or ask in team Slack
- **Blocked?**: Comment on your PR or reach out to @YOUR_GITHUB_USERNAME
- **Need access?**: Contact the tech lead

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Supabase Docs](https://supabase.com/docs)
- [MechOS Architecture](../SUPABASE_SETUP.md)

## 🤝 Community Standards

- Be respectful and inclusive
- Assume good intentions
- Help others learn
- Celebrate contributions
- Give credit where due

Thank you for contributing! 🎉
