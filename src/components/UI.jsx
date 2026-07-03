import React from 'react'
import { useNavigate } from 'react-router-dom'

// Icon SVG components
export const Icon = {
  Home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Users: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Tool: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 1 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Bell: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Plus: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Search: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Camera: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Mic: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  Check: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.779c0 2.719.738 5.38 2.137 7.712L2.69 21.98l8.256-2.158c2.27 1.232 4.81 1.882 7.548 1.882 5.428 0 9.884-4.418 9.884-9.846 0-2.627-.863-5.095-2.488-7.121-1.625-2.026-3.993-3.368-6.416-3.468zm0 17.452h-.003c-2.35 0-4.659-.636-6.61-1.84l-.475-.281-4.92 1.289 1.31-4.803-.31-.492C3.304 15.735 2.61 13.923 2.61 12.054c0-4.52 3.7-8.205 8.242-8.205 2.203 0 4.272.812 5.856 2.386 1.583 1.573 2.456 3.656 2.456 5.819 0 4.522-3.702 8.206-8.244 8.206z"/>
    </svg>
  ),
  Trash: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  ),
  Car: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18.15 14c.83-1.5 1.25-2.75 1.25-4.5V9.5a2 2 0 0 0-2-2h-13a2 2 0 0 0-2 2v3.5c0 1.75.42 3 1.25 4.5"/>
      <path d="M4 14.5a2 2 0 1 1 4 0v4a2 2 0 1 1-4 0v-4z"/>
      <path d="M16 14.5a2 2 0 1 1 4 0v4a2 2 0 1 1-4 0v-4z"/>
      <path d="M2 11h20"/>
    </svg>
  ),
}

// Avatar component
export function Avatar({ name, amber }) {
  const initials = name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const bgClass = amber ? 'avatar-amber' : 'avatar'
  return <div className={bgClass}>{initials}</div>
}

// TopBar component
export function TopBar({ title, onBack, right }) {
  const navigate = useNavigate()
  const handleBack = () => {
    if (onBack === true) {
      navigate(-1)
    } else if (typeof onBack === 'function') {
      onBack()
    }
  }

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {onBack && (
          <button onClick={handleBack} className="btn-icon" style={{ color: 'white' }}>
            <Icon.ArrowLeft />
          </button>
        )}
        <div className="topbar-title">{title}</div>
      </div>
      {right && <div>{right}</div>}
    </div>
  )
}

// BottomNav component
export function BottomNav({ reminderCount = 0 }) {
  const navigate = useNavigate()
  const pathname = window.location.pathname

  const isActive = path => pathname === path
  
  return (
    <div className="bottom-nav">
      <button
        className={`nav-item ${isActive('/') ? 'active' : ''}`}
        onClick={() => navigate('/')}
      >
        <Icon.Home />
        <div>Home</div>
      </button>
      <button
        className={`nav-item ${isActive('/customers') ? 'active' : ''}`}
        onClick={() => navigate('/customers')}
      >
        <Icon.Users />
        <div>Customers</div>
      </button>
      <button
        className={`nav-item ${isActive('/reminders') ? 'active' : ''}`}
        onClick={() => navigate('/reminders')}
      >
        <div style={{ position: 'relative' }}>
          <Icon.Bell />
          {reminderCount > 0 && (
            <div className="badge badge-red" style={{
              position: 'absolute',
              top: -4,
              right: -4,
              padding: '2px 6px',
              fontSize: '11px',
              minWidth: 'auto',
            }}>
              {reminderCount}
            </div>
          )}
        </div>
        <div>Reminders</div>
      </button>
      <button
        className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
        onClick={() => navigate('/profile')}
      >
        <Icon.Tool />
        <div>Profile</div>
      </button>
    </div>
  )
}

// Toast component
export function Toast({ toast }) {
  if (!toast) return null
  const baseClass = toast.type === 'success' ? 'toast-success' : toast.type === 'error' ? 'toast-error' : 'toast'
  return <div className={`toast ${baseClass}`}>{toast.message}</div>
}

// Spinner component
export function Spinner({ page }) {
  if (page) {
    return <div className="spinner-page"><div className="spinner"></div></div>
  }
  return <div className="spinner" style={{ display: 'inline-block' }}></div>
}

// EmptyState component
export function EmptyState({ icon: IconComponent, title, body, action }) {
  return (
    <div className="empty-state">
      {IconComponent && <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>{IconComponent}</div>}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{title}</h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>{body}</p>
      {action && action}
    </div>
  )
}

// Format helpers
export const fmt = {
  naira: n => {
    if (!n) return '₦0'
    return '₦' + n.toLocaleString('en-NG')
  },
  date: d => {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-NG', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  },
  phone: p => {
    if (!p) return ''
    return p.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  daysLabel: dateStr => {
    if (!dateStr) return ''
    const days = Math.round((new Date(dateStr) - new Date()) / 86400000)
    if (days < 0) return `${Math.abs(days)} days ago`
    if (days === 0) return 'Today'
    return `In ${days} days`
  }
}
