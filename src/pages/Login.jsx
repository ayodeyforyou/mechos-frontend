// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

const DEV_MODE = import.meta.env.DEV // true on localhost, false on Netlify

export default function Login() {
  const [step, setStep]       = useState('phone')
  const [phone, setPhone]     = useState('')
  const [otp, setOtp]         = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const { login }             = useAuth()
  const navigate              = useNavigate()

  // ── DEV ONLY: skip straight into the app with fake mechanic data ──
  const skipLogin = () => {
    login('dev-token-skip', {
      id:            'dev-mechanic-001',
      name:          'Emeka Okafor',
      phone:         '08034567890',
      business_name: "Emeka's Auto Repairs",
      specialty:     'General & Engine',
      plan:          'pro',
    })
    navigate('/', { replace: true })
  }

  const handleRequestOTP = async (e) => {
    e.preventDefault()
    if (!phone.trim()) return setError('Enter your phone number')
    setError(''); setLoading(true)
    try {
      const res = await fetch('/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStep('otp')
    } catch (err) {
      setError(err.message || 'Could not send OTP — is the backend running?')
    } finally { setLoading(false) }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    if (otp.length < 6) return setError('Enter the 6-digit code')
    setError(''); setLoading(true)
    try {
      const res = await fetch('/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), otp }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      login(data.token, data.mechanic)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Wrong code — try again')
    } finally { setLoading(false) }
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Green hero */}
      <div style={{
        background: 'var(--green)',
        padding: '48px 24px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{ fontSize: 52 }}>🔧</div>
        <h1 style={{
          color: '#fff',
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: '-0.5px',
          margin: 0,
        }}>
          MechOS
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: 14,
          textAlign: 'center',
          margin: 0,
        }}>
          Never lose a customer or forget a repair again
        </p>
      </div>

      {/* Form area */}
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* DEV SKIP BUTTON — only shows on localhost */}
        {DEV_MODE && (
          <button
            onClick={skipLogin}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              padding: '14px 16px',
              background: '#1a1a18',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              minHeight: 52,
            }}
          >
            ⚡ Skip login — preview app
          </button>
        )}

        {/* Divider */}
        {DEV_MODE && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: 'var(--text-hint)',
            fontSize: 12,
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            or log in with phone
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
        )}

        {/* Login card */}
        <div className="card" style={{ padding: 20 }}>
          {step === 'phone' ? (
            <form
              onSubmit={handleRequestOTP}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <div>
                <h2 style={{ fontSize: 20, marginBottom: 4 }}>Welcome</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                  Enter your phone number to get started
                </p>
              </div>

              <div className="field">
                <label className="field-label">Phone number</label>
                <input
                  className="field-input"
                  type="tel"
                  inputMode="tel"
                  placeholder="e.g. 0803 456 7890"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setError('') }}
                  autoFocus
                />
              </div>

              {error && (
                <p style={{ color: 'var(--red)', fontSize: 13, margin: 0 }}>{error}</p>
              )}

              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? 'Sending…' : 'Get code →'}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleVerifyOTP}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <div>
                <h2 style={{ fontSize: 20, marginBottom: 4 }}>Enter your code</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                  Sent to <strong>{phone}</strong>
                </p>
              </div>

              <input
                className="otp-input"
                type="number"
                inputMode="numeric"
                placeholder="——————"
                maxLength={6}
                value={otp}
                onChange={e => { setOtp(e.target.value.slice(0, 6)); setError('') }}
                autoFocus
              />

              {error && (
                <p style={{ color: 'var(--red)', fontSize: 13, margin: 0 }}>{error}</p>
              )}

              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? 'Checking…' : 'Confirm →'}
              </button>

              <button
                type="button"
                onClick={() => { setStep('phone'); setOtp(''); setError('') }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: 14,
                  cursor: 'pointer',
                  padding: 8,
                }}
              >
                ← Wrong number?
              </button>
            </form>
          )}
        </div>

        <p style={{
          textAlign: 'center',
          color: 'var(--text-hint)',
          fontSize: 12,
          marginTop: 8,
        }}>
          Your customer data is private — only you can see it
        </p>
      </div>
    </div>
  )
}