import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useToast } from '../hooks/useToast'
import { TopBar, BottomNav, Icon, fmt, Toast, Spinner, EmptyState } from '../components/UI'

const daysLabel = dateStr => {
  const days = Math.round((new Date(dateStr) - new Date()) / 86400000)
  if (days < 0) return `${Math.abs(days)} days ago`
  if (days === 0) return 'Today'
  return `In ${days} days`
}

const reminderLabels = {
  oil_service: 'Oil service',
  brake_check: 'Brake check',
  general_service: 'General service',
  custom: r => r.custom_label || 'Service',
}

export default function Reminders() {
  const { toast, error, success } = useToast()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState({})
  const [sent, setSent] = useState({})

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const { data: result } = await api.get('/api/reminders')
        setData(result)
      } catch (err) {
        error('Failed to load reminders')
      } finally {
        setLoading(false)
      }
    }

    fetchReminders()
  }, [error])

  const handleSendReminder = async (reminderId, reminder) => {
    setSending({ ...sending, [reminderId]: true })
    try {
      await api.patch(`/api/reminders/${reminderId}/sent`)
      success('Reminder sent!')
      setSent({ ...sent, [reminderId]: true })

      const reminderType = typeof reminderLabels[reminder.reminder_type] === 'function'
        ? reminderLabels[reminder.reminder_type](reminder)
        : reminderLabels[reminder.reminder_type]

      const message = `Hello ${reminder.customer_name}! This is a reminder that your ${reminderType} for your ${reminder.make} ${reminder.model} (${reminder.plate_number}) is due. Please call us to book a service. Thank you!`
      const normalised = reminder.customer_phone.replace(/\s/g, '').replace(/^0/, '234')
      const encoded = encodeURIComponent(message)
      window.open(`https://wa.me/${normalised}?text=${encoded}`, '_blank')
    } catch (err) {
      error('Failed to send reminder')
    } finally {
      setSending({ ...sending, [reminderId]: false })
    }
  }

  const handleToggleReminder = async (reminderId, checked) => {
    if (checked) return

    if (!window.confirm('Remove this reminder?')) return

    try {
      await api.patch(`/api/reminders/${reminderId}/cancel`)
      success('Reminder cancelled')
      setData({
        ...data,
        upcoming: data.upcoming.filter(r => r.id !== reminderId)
      })
    } catch (err) {
      error('Failed to cancel reminder')
    }
  }

  if (loading) return <Spinner page />

  const total = data?.total || 0
  const overdue = data?.overdue || []
  const dueToday = data?.due_today || []
  const upcoming = data?.upcoming || []

  return (
    <div className="page">
      <TopBar title="Reminders" />

      <div className="page-content">
        {/* Alert banner */}
        {(overdue.length + dueToday.length > 0) && (
          <div className="alert-banner">
            <Icon.Bell />
            <p>{overdue.length + dueToday.length} customer{overdue.length + dueToday.length !== 1 ? 's' : ''} need{overdue.length + dueToday.length !== 1 ? '' : 's'} a reminder today</p>
          </div>
        )}

        {/* Overdue section */}
        {overdue.length > 0 && (
          <>
            <div className="section-label">Overdue</div>
            {overdue.map(reminder => (
              <div key={reminder.id} className="card">
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
                    {reminder.customer_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>
                      {reminder.customer_name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {reminder.make} {reminder.model} · {reminder.plate_number}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
                  {typeof reminderLabels[reminder.reminder_type] === 'function'
                    ? reminderLabels[reminder.reminder_type](reminder)
                    : reminderLabels[reminder.reminder_type]
                  }
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                  {daysLabel(reminder.due_date)}
                </div>

                <button
                  className="btn-whatsapp"
                  onClick={() => handleSendReminder(reminder.id, reminder)}
                  disabled={sending[reminder.id]}
                  style={{ opacity: sent[reminder.id] ? 0.6 : 1 }}
                >
                  {sending[reminder.id] ? <Spinner /> : <>
                    {sent[reminder.id] ? <Icon.Check /> : <Icon.WhatsApp />}
                    {sent[reminder.id] ? 'Sent' : 'Send reminder'}
                  </>}
                </button>
              </div>
            ))}
          </>
        )}

        {/* Due today section */}
        {dueToday.length > 0 && (
          <>
            <div className="section-label">Due today</div>
            {dueToday.map(reminder => (
              <div key={reminder.id} className="card">
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--brand-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
                    {reminder.customer_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>
                      {reminder.customer_name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {reminder.make} {reminder.model} · {reminder.plate_number}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
                  {typeof reminderLabels[reminder.reminder_type] === 'function'
                    ? reminderLabels[reminder.reminder_type](reminder)
                    : reminderLabels[reminder.reminder_type]
                  }
                </div>

                <button
                  className="btn-whatsapp"
                  onClick={() => handleSendReminder(reminder.id, reminder)}
                  disabled={sending[reminder.id]}
                  style={{ opacity: sent[reminder.id] ? 0.6 : 1 }}
                >
                  {sending[reminder.id] ? <Spinner /> : <>
                    {sent[reminder.id] ? <Icon.Check /> : <Icon.WhatsApp />}
                    {sent[reminder.id] ? 'Sent' : 'Send reminder'}
                  </>}
                </button>
              </div>
            ))}
          </>
        )}

        {/* Upcoming section */}
        {upcoming.length > 0 && (
          <>
            <div className="section-label">Upcoming (next 30 days)</div>
            <div className="card" style={{ padding: 0 }}>
              {upcoming.map(reminder => (
                <div key={reminder.id} className="list-row">
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>
                      {reminder.customer_name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {reminder.make} {reminder.model}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'right' }}>
                      {daysLabel(reminder.due_date)}
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={e => handleToggleReminder(reminder.id, e.target.checked)}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {total === 0 && (
          <EmptyState
            icon={<Icon.Bell />}
            title="No reminders due"
            body="Reminders appear here when customers are due for a service"
          />
        )}
      </div>

      <BottomNav reminderCount={data?.total || 0} />
      <Toast toast={toast} />
    </div>
  )
}
