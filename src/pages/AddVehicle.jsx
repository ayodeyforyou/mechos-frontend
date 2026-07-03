import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/api'
import { useToast } from '../hooks/useToast'
import { TopBar, Spinner, Toast } from '../components/UI'

export default function AddVehicle() {
  const navigate = useNavigate()
  const { customerId } = useParams()
  const { toast, error, success } = useToast()

  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [plate, setPlate] = useState('')
  const [color, setColor] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async () => {
    setErrorMsg('')

    setLoading(true)
    try {
      const { data } = await api.post(`/api/customers/${customerId}/vehicles`, {
        make: make.trim(),
        model: model.trim(),
        year: year ? parseInt(year) : null,
        plate_number: plate.trim().toUpperCase(),
        color: color.trim(),
      })
      success('Vehicle added!')
      navigate(`/customers/${customerId}`)
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to add vehicle')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <TopBar title="Add vehicle" onBack />

      <div className="page-content">
        {/* Step indicator */}
        <div className="steps">
          <div className="step"></div>
          <div className="step active"></div>
          <div className="step"></div>
        </div>

        {/* Form fields */}
        <div className="field">
          <input
            type="text"
            placeholder="e.g. Toyota"
            value={make}
            onChange={e => setMake(e.target.value)}
            className="field-input"
            autoFocus
          />
        </div>

        <div className="field">
          <input
            type="text"
            placeholder="e.g. Camry"
            value={model}
            onChange={e => setModel(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="field">
          <input
            type="number"
            inputMode="numeric"
            placeholder="e.g. 2018"
            value={year}
            onChange={e => setYear(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="field">
          <input
            type="text"
            placeholder="e.g. ABJ-234-KJ"
            value={plate}
            onChange={e => setPlate(e.target.value.toUpperCase())}
            className="field-input"
          />
        </div>

        <div className="field">
          <input
            type="text"
            placeholder="e.g. Silver"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="field-input"
          />
        </div>

        {/* Helper text */}
        <p className="helper-text">All fields optional — add what you know</p>

        {/* Error message */}
        {errorMsg && <span className="field-error" style={{ display: 'block', marginTop: 12 }}>{errorMsg}</span>}

        {/* Submit button */}
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginTop: 24 }}
        >
          {loading ? <Spinner /> : 'Save vehicle →'}
        </button>
      </div>

      <Toast toast={toast} />
    </div>
  )
}
