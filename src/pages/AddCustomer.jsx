import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { useToast } from '../hooks/useToast'
import { TopBar, Spinner, Toast } from '../components/UI'

export default function AddCustomer() {
  const navigate = useNavigate()
  const { toast, error, success } = useToast()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async () => {
    setErrorMsg('')

    if (!name.trim()) {
      setErrorMsg('Customer name is required')
      return
    }
    if (!phone.trim()) {
      setErrorMsg('Phone number is required')
      return
    }

    setLoading(true)
    try {
      const { data } = await api.post('/api/customers', {
        name: name.trim(),
        phone: phone.trim(),
        location_label: location.trim(),
        notes: notes.trim(),
      })
      success('Customer added!')
      navigate(`/customers/${data.id}`)
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to add customer')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <TopBar title="New customer" onBack />

      <div className="page-content">
        {/* Step indicator */}
        <div className="steps">
          <div className="step active"></div>
          <div className="step"></div>
          <div className="step"></div>
        </div>

        {/* Form fields */}
        <div className="field">
          <input
            type="text"
            placeholder="e.g. Aminu Kano"
            value={name}
            onChange={e => setName(e.target.value)}
            className="field-input"
            autoFocus
          />
        </div>

        <div className="field">
          <input
            type="tel"
            inputMode="tel"
            placeholder="e.g. 0803 456 7890"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="field">
          <input
            type="text"
            placeholder="e.g. Gwarinpa, Abuja"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="field">
          <textarea
            placeholder="Any notes about this customer"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="field-input"
            rows={3}
          />
        </div>

        {/* Helper text */}
        <p className="helper-text">Only name and phone are required</p>

        {/* Error message */}
        {errorMsg && <span className="field-error" style={{ display: 'block', marginTop: 12 }}>{errorMsg}</span>}

        {/* Submit button */}
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginTop: 24 }}
        >
          {loading ? <Spinner /> : 'Save customer →'}
        </button>
      </div>

      <Toast toast={toast} />
    </div>
  )
}
