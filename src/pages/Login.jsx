import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../lib/api'
import { useAuth } from '../lib/AuthContext'
import { useToast } from '../hooks/useToast'
import { Toast, Spinner } from '../components/UI'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { toast, error, success } = useToast()

  const [step, setStep] = useState('phone') // 'phone' or 'otp'
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleRequestOtp = async () => {
    setErrorMsg('')
    if (!phone.trim()) {
      setErrorMsg('Phone number is required')
      return
    }

    setLoading(true)
    try {
      // Try direct Supabase OTP first, fallback to backend endpoint
      try {
        await authApi.post('/auth/v1/otp', {
          phone,
          data: {}
        })
      } catch (supabaseErr) {
        // Fallback to backend endpoint
        await authApi.post('/auth/request-otp', { phone })
      }
      
      success('OTP sent to your phone!')
      setStep('otp')
    } catch (err) {
      setErrorMsg(err.response?.data?.error || err.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setErrorMsg('')
    if (!otp.trim()) {
      setErrorMsg('OTP is required')
      return
    }

    setLoading(true)
    try {
      let response
      
      // Try direct Supabase verification first
      try {
        const supabaseResponse = await authApi.post('/auth/v1/verify', {
          type: 'sms',
          phone,
          token: otp
        })
        
        // Format Supabase response to match expected structure
        response = {
          data: {
            token: supabaseResponse.data.session?.access_token,
            mechanic: supabaseResponse.data.user || { id: supabaseResponse.data.user?.id }
          }
        }
      } catch (supabaseErr) {
        // Fallback to backend endpoint
        response = await authApi.post('/auth/verify-otp', { phone, otp })
      }
      
      login(response.data.token, response.data.mechanic)
      navigate('/')
    } catch (err) {
      setErrorMsg(err.response?.data?.error || err.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
      <div style={{ width: '100%', maxWidth: 400, padding: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: 'var(--brand-green)' }}>MechOS</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 32 }}>Mobile mechanic management</p>

        {step === 'phone' ? (
          <>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Your phone number</h2>
            <div className="field">
              <input
                type="tel"
                inputMode="tel"
                placeholder="0803 456 7890"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="field-input"
                autoFocus
              />
            </div>
            {errorMsg && <span className="field-error">{errorMsg}</span>}
            <button
              className="btn-primary"
              onClick={handleRequestOtp}
              disabled={loading}
              style={{ marginTop: 16 }}
            >
              {loading ? <Spinner /> : 'Send OTP →'}
            </button>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Enter the 6-digit code</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Sent to {phone}</p>
            <div className="field">
              <input
                type="text"
                inputMode="numeric"
                placeholder="000000"
                maxLength="6"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                className="otp-input"
                autoFocus
              />
            </div>
            {errorMsg && <span className="field-error">{errorMsg}</span>}
            <button
              className="btn-primary"
              onClick={handleVerifyOtp}
              disabled={loading}
              style={{ marginTop: 16 }}
            >
              {loading ? <Spinner /> : 'Verify →'}
            </button>
            <button
              className="btn-secondary"
              onClick={() => setStep('phone')}
              style={{ marginTop: 8 }}
            >
              Back
            </button>
          </>
        )}
      </div>
      <Toast toast={toast} />
    </div>
  )
}
