import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../lib/AuthContext'
import { useToast } from '../hooks/useToast'
import { TopBar, BottomNav, Icon, fmt, Toast, Spinner } from '../components/UI'

export default function JobDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { mechanic } = useAuth()
  const { toast, error, success } = useToast()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [completing, setCompleting] = useState(false)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await api.get(`/api/jobs/${id}`)
        setJob(data)
      } catch (err) {
        error('Failed to load job')
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id, error])

  const handleSendReceipt = async () => {
    setSending(true)
    try {
      await api.post(`/api/jobs/${id}/receipts`, {
        sent_via_whatsapp: true
      })
      success('Receipt sent!')

      // Open WhatsApp
      const message = `Receipt from ${mechanic?.business_name || mechanic?.name}%0ACustomer: ${job.customer_name}%0AVehicle: ${job.vehicle_make} ${job.vehicle_model} · ${job.vehicle_plate}%0AWork done: ${job.description}%0ATotal: ${fmt.naira(job.total_cost)}%0ADate: ${fmt.date(job.created_at)}%0AThank you for your business!`
      const normalised = job.customer_phone.replace(/\s/g, '').replace(/^0/, '234')
      window.open(`https://wa.me/${normalised}?text=${message}`, '_blank')
    } catch (err) {
      error('Failed to send receipt')
    } finally {
      setSending(false)
    }
  }

  const handleMarkCompleted = async () => {
    setCompleting(true)
    try {
      await api.patch(`/api/jobs/${id}`, {
        status: 'completed'
      })
      success('Job marked as completed!')
      setJob({ ...job, status: 'completed' })
    } catch (err) {
      error('Failed to mark job as completed')
    } finally {
      setCompleting(false)
    }
  }

  if (loading) return <Spinner page />
  if (!job) return <div>Job not found</div>

  const statusColor = job.status === 'completed' ? 'badge-green' : job.status === 'open' ? 'badge-amber' : 'badge-red'

  return (
    <div className="page">
      <TopBar title="Repair job" onBack />

      <div className="page-content">
        {/* Customer context banner */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <Icon.Car />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>
                {job.customer_name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                {job.vehicle_make} {job.vehicle_model} · {job.vehicle_plate}
              </div>
            </div>
          </div>
        </div>

        {/* Status row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {fmt.date(job.created_at)}
          </div>
          <span className={`badge ${statusColor}`}>
            {job.status === 'completed' ? 'Completed' : job.status === 'open' ? 'Open' : 'Disputed'}
          </span>
        </div>

        {/* Photos section */}
        <div className="section-label">Photos</div>
        {job.photos && job.photos.length > 0 ? (
          <div className="photo-grid" style={{ marginBottom: 16 }}>
            {job.photos.map(photo => (
              <div key={photo.id} className="photo-slot has-photo">
                <img src={photo.url} alt={photo.type} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>
            No photos taken
          </div>
        )}

        {/* Repair notes section */}
        <div className="section-label">Repair notes</div>
        <div style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24, color: 'var(--text-primary)' }}>
          {job.description || 'No notes recorded'}
        </div>

        {/* Parts section */}
        <div className="section-label">Parts used</div>
        {job.parts && job.parts.length > 0 ? (
          <div style={{ marginBottom: 24 }}>
            {job.parts.map(part => (
              <div key={part.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <div>{part.part_name} × {part.quantity}</div>
                <div style={{ color: 'var(--text-muted)' }}>{fmt.naira(part.quantity * part.unit_cost)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
            No parts recorded
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Labour:</span>
            <span>{fmt.naira(job.labour_cost)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span>Parts:</span>
            <span>{fmt.naira(job.parts_cost)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: 'var(--brand-green)' }}>
            <span>Total:</span>
            <span>{fmt.naira(job.total_cost)}</span>
          </div>
        </div>

        {/* Receipt section */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
            {mechanic?.business_name || mechanic?.name}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
            {mechanic?.phone}
          </div>
          <button
            className="btn-whatsapp"
            onClick={handleSendReceipt}
            disabled={sending}
          >
            {sending ? <Spinner /> : <><Icon.WhatsApp /> Send receipt via WhatsApp</>}
          </button>
        </div>

        {/* Mark as completed button */}
        {job.status === 'open' && (
          <button
            className="btn-secondary"
            onClick={handleMarkCompleted}
            disabled={completing}
            style={{ marginBottom: 16 }}
          >
            {completing ? <Spinner /> : 'Mark as completed'}
          </button>
        )}
      </div>

      <BottomNav />
      <Toast toast={toast} />
    </div>
  )
}
