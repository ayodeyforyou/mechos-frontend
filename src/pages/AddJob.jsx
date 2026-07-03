import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import api from '../lib/api'
import { useToast } from '../hooks/useToast'
import { TopBar, Icon, fmt, Spinner, Toast } from '../components/UI'

export default function AddJob() {
  const navigate = useNavigate()
  const { vehicleId } = useParams()
  const { state } = useLocation()
  const { toast, error, success } = useToast()

  const [description, setDescription] = useState('')
  const [labourCost, setLabourCost] = useState('')
  const [partsCost, setPartsCost] = useState('')
  const [parts, setParts] = useState([])
  const [reminder, setReminder] = useState(false)
  const [reminderDate, setReminderDate] = useState('')
  const [beforePreview, setBeforePreview] = useState(null)
  const [afterPreview, setAfterPreview] = useState(null)
  const [beforeFile, setBeforeFile] = useState(null)
  const [afterFile, setAfterFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const beforePhotoRef = useRef(null)
  const afterPhotoRef = useRef(null)

  // Set default reminder date to 90 days from today
  useEffect(() => {
    const date = new Date()
    date.setDate(date.getDate() + 90)
    setReminderDate(date.toISOString().split('T')[0])
  }, [])

  const handlePhotoSelect = async (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    if (type === 'before') {
      setBeforePreview(previewUrl)
      setBeforeFile(file)
    } else {
      setAfterPreview(previewUrl)
      setAfterFile(file)
    }
  }

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      error('Voice not supported on this browser')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-NG'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript
      setDescription(prev => prev ? prev + ' ' + transcript : transcript)
    }

    recognition.onerror = () => {
      error('Could not hear audio — try again')
    }

    recognition.start()
  }

  const addPart = () => {
    setParts([...parts, { part_name: '', quantity: 1, unit_cost: 0 }])
  }

  const updatePart = (index, field, value) => {
    const newParts = [...parts]
    newParts[index] = { ...newParts[index], [field]: field === 'part_name' ? value : parseFloat(value) || 0 }
    setParts(newParts)
  }

  const removePart = index => {
    setParts(parts.filter((_, i) => i !== index))
  }

  const partsTotalCost = parts.reduce((sum, p) => sum + (p.quantity * p.unit_cost), 0)

  const totalCost = parseFloat(labourCost || 0) + (parts.length > 0 ? partsTotalCost : (parseFloat(partsCost || 0)))

  const handleSubmit = async () => {
    setErrorMsg('')

    if (!description.trim()) {
      setErrorMsg('Please describe the repair work')
      return
    }

    setLoading(true)
    try {
      const { data: jobData } = await api.post(`/api/vehicles/${vehicleId}/jobs`, {
        description: description.trim(),
        labour_cost: parseFloat(labourCost || 0),
        parts_cost: parts.length > 0 ? partsTotalCost : parseFloat(partsCost || 0),
        parts: parts.map(p => ({
          part_name: p.part_name,
          quantity: p.quantity,
          unit_cost: p.unit_cost
        })),
        reminder_due_date: reminder ? reminderDate : null
      })

      // Upload photos if any
      if (beforeFile || afterFile) {
        for (const [file, type] of [[beforeFile, 'before'], [afterFile, 'after']]) {
          if (!file) continue
          try {
            const { data: uploadData } = await api.post(`/api/jobs/${jobData.id}/photos/upload-url`, {
              photo_type: type,
              file_size_kb: Math.round(file.size / 1024)
            })
            await fetch(uploadData.upload_url, {
              method: 'PUT',
              body: file,
              headers: { 'Content-Type': 'image/jpeg' }
            })
          } catch (err) {
            console.error('Photo upload failed:', err)
          }
        }
      }

      success('Repair job created!')
      navigate(`/jobs/${jobData.id}`)
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to create job')
    } finally {
      setLoading(false)
    }
  }

  const customerContext = state || {}

  return (
    <div className="page">
      <TopBar title="New repair job" onBack />

      <div className="page-content">
        {/* Customer context banner */}
        {(customerContext.customerName || customerContext.vehicleMake) && (
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Icon.Car />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {customerContext.customerName}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {customerContext.vehicleMake} {customerContext.vehicleModel} · {customerContext.vehiclePlate}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photos section */}
        <div className="section-label">Photos</div>
        <div className="photo-grid">
          <div className="photo-slot" onClick={() => beforePhotoRef.current?.click()}>
            {beforePreview ? (
              <img src={beforePreview} alt="Before" />
            ) : (
              <div className="photo-slot-label">
                <Icon.Camera />
                Before
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={beforePhotoRef}
              onChange={e => handlePhotoSelect(e, 'before')}
            />
          </div>
          <div className="photo-slot" onClick={() => afterPhotoRef.current?.click()}>
            {afterPreview ? (
              <img src={afterPreview} alt="After" />
            ) : (
              <div className="photo-slot-label">
                <Icon.Camera />
                After
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={afterPhotoRef}
              onChange={e => handlePhotoSelect(e, 'after')}
            />
          </div>
        </div>

        {/* Description section */}
        <div className="section-label">What was done?</div>
        <button className="btn-secondary" onClick={startVoice} style={{ marginBottom: 8 }}>
          <Icon.Mic /> Tap to speak
        </button>
        <div className="field">
          <textarea
            placeholder="Describe the repair work…"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="field-input"
            rows={4}
          />
        </div>

        {/* Parts section */}
        <div className="section-label">Parts used</div>
        {parts.map((part, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              type="text"
              placeholder="Part name"
              value={part.part_name}
              onChange={e => updatePart(idx, 'part_name', e.target.value)}
              className="field-input"
              style={{ flex: 1 }}
            />
            <input
              type="number"
              inputMode="decimal"
              placeholder="Cost"
              value={part.unit_cost}
              onChange={e => updatePart(idx, 'unit_cost', e.target.value)}
              className="field-input"
              style={{ width: 80 }}
            />
            <button
              onClick={() => removePart(idx)}
              className="btn-icon"
              style={{ color: 'var(--red)' }}
            >
              <Icon.Trash />
            </button>
          </div>
        ))}
        <button
          onClick={addPart}
          style={{ fontSize: 14, color: 'var(--brand-green)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 16 }}
        >
          + Add part
        </button>

        {/* Cost section */}
        <div className="section-label">Cost</div>
        <div className="cost-row">
          <div>
            <label>Labour (₦)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={labourCost}
              onChange={e => setLabourCost(e.target.value)}
              className="field-input"
            />
          </div>
          <div>
            <label>Parts (₦)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={parts.length > 0 ? partsTotalCost : partsCost}
              onChange={e => parts.length === 0 && setPartsCost(e.target.value)}
              className="field-input"
              disabled={parts.length > 0}
            />
          </div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--brand-green)', textAlign: 'right', marginBottom: 24 }}>
          Total: {fmt.naira(totalCost)}
        </div>

        {/* Reminder section */}
        <div className="section-label">Service reminder</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <label className="toggle">
            <input
              type="checkbox"
              checked={reminder}
              onChange={e => setReminder(e.target.checked)}
            />
          </label>
          <span>Set oil service reminder</span>
        </div>
        {reminder && (
          <div className="field">
            <input
              type="date"
              value={reminderDate}
              onChange={e => setReminderDate(e.target.value)}
              className="field-input"
            />
          </div>
        )}

        {/* Error message */}
        {errorMsg && <span className="field-error" style={{ display: 'block', marginTop: 12 }}>{errorMsg}</span>}

        {/* Submit button */}
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginTop: 24, marginBottom: 16 }}
        >
          {loading ? <Spinner /> : 'Save job + send receipt'}
        </button>
      </div>

      <Toast toast={toast} />
    </div>
  )
}
