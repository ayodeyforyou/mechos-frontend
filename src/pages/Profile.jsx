import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../lib/AuthContext'
import { useToast } from '../hooks/useToast'
import { TopBar, Avatar, Spinner, Toast } from '../components/UI'

export default function Profile() {
  const navigate = useNavigate()
  const { mechanic, logout } = useAuth()
  const { toast, error, success } = useToast()

  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/api/mechanics/me')
        setName(data.name || '')
        setBusinessName(data.business_name || '')
        setSpecialty(data.specialty || '')
        setCity(data.location_city || '')
      } catch (err) {
        error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [error])

  const handleSave = async () => {
    setErrorMsg('')
    setSaving(true)
    try {
      await api.patch('/api/mechanics/me', {
        name: name.trim(),
        business_name: businessName.trim(),
        specialty: specialty.trim(),
        location_city: city.trim(),
      })
      success('Profile updated!')
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) return <Spinner page />

  return (
    <div className="page">
      <TopBar title="My profile" onBack />

      <div className="page-content">
        {/* Avatar */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--brand-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 24, margin: '0 auto', marginBottom: 12 }}>
            {mechanic?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 16, background: 'var(--light-green)', color: 'var(--text-green)', fontSize: 11, fontWeight: 600 }}>
            {mechanic?.plan === 'pro' ? 'Pro' : 'Free'} plan
          </div>
        </div>

        {/* Form fields */}
        <div className="field">
          <label className="field-label">Your name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="field">
          <label className="field-label">Business name</label>
          <input
            type="text"
            placeholder="e.g. Emeka's Auto Repairs"
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="field">
          <label className="field-label">Specialty</label>
          <input
            type="text"
            placeholder="e.g. Engine & AC repairs"
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="field">
          <label className="field-label">City</label>
          <input
            type="text"
            placeholder="e.g. Abuja"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="field-input"
          />
        </div>

        {/* Error message */}
        {errorMsg && <span className="field-error" style={{ display: 'block', marginTop: 12 }}>{errorMsg}</span>}

        {/* Save button */}
        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={saving}
          style={{ marginTop: 24 }}
        >
          {saving ? <Spinner /> : 'Save changes'}
        </button>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', margin: '24px 0' }}></div>

        {/* Plan section */}
        <div className="section-label">Plan</div>
        {mechanic?.plan === 'free' ? (
          <>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>
              You're on the Free plan. Upgrade to Pro to unlock WhatsApp reminders, unlimited customers, and branded receipts.
            </p>
            <button
              className="btn-secondary"
              onClick={() => window.alert('Coming soon — contact us on WhatsApp to upgrade')}
            >
              Upgrade to Pro
            </button>
          </>
        ) : (
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
            You're on the Pro plan. Enjoy all premium features!
          </p>
        )}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          style={{
            fontSize: 14,
            color: 'var(--red)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginTop: 24,
            padding: 12,
          }}
        >
          Log out
        </button>
      </div>

      <Toast toast={toast} />
    </div>
  )
}
