import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../lib/AuthContext'
import { useToast } from '../hooks/useToast'
import { TopBar, BottomNav, Icon, Avatar, fmt, Toast, Spinner, EmptyState } from '../components/UI'

export default function Home() {
  const navigate = useNavigate()
  const { mechanic } = useAuth()
  const { toast, error } = useToast()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data: result } = await api.get('/api/dashboard')
        setData(result)
      } catch (err) {
        error('Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [error])

  if (loading) return <Spinner page />

  const firstName = mechanic?.name?.split(' ')[0] || 'Mechanic'

  return (
    <div className="page">
      <TopBar
        title="MechOS"
        right={
          <button
            onClick={() => navigate('/profile')}
            className="btn-icon"
            style={{ color: 'white' }}
          >
            <Icon.Tool />
          </button>
        }
      />

      <div className="page-content">
        {/* Greeting */}
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, marginTop: 16 }}>
          Welcome back, {firstName}! 👋
        </h1>

        {/* Alert if reminders due */}
        {data?.reminders_due > 0 && (
          <div className="alert-banner">
            <Icon.Bell />
            <p>{data.reminders_due} customer{data.reminders_due > 1 ? 's' : ''} need{data.reminders_due > 1 ? '' : 's'} a reminder today</p>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <button
            onClick={() => navigate('/customers/new')}
            className="btn-primary"
          >
            <Icon.Plus /> Add customer
          </button>
          <button
            onClick={() => navigate('/customers')}
            className="btn-secondary"
          >
            <Icon.Search /> Find customer
          </button>
        </div>

        {/* Stats grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{data?.stats?.total_customers || 0}</div>
            <div className="stat-label">Total customers</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data?.stats?.jobs_this_month || 0}</div>
            <div className="stat-label">Jobs this month</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ fontSize: 18 }}>{fmt.naira(data?.stats?.revenue_this_month || 0)}</div>
            <div className="stat-label">Revenue</div>
          </div>
        </div>

        {/* Recent customers */}
        <div className="section-label">Recent customers</div>
        {data?.recent_customers?.length > 0 ? (
          <div className="card" style={{ padding: 0 }}>
            {data.recent_customers.map(customer => (
              <div
                key={customer.id}
                className="list-row"
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                <Avatar name={customer.name} amber={!!customer.next_reminder_due} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>
                    {customer.name}
                    {customer.next_reminder_due && (
                      <span className="badge badge-amber" style={{ marginLeft: 8, fontSize: 10 }}>
                        Due
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                    {customer.last_vehicle && `${customer.last_vehicle.make} ${customer.last_vehicle.model} · ${customer.last_vehicle.plate_number}`}
                  </div>
                </div>
                <Icon.ChevronRight />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Icon.Users />}
            title="No customers yet"
            body="Add your first customer to get started"
            action={
              <button
                onClick={() => navigate('/customers/new')}
                className="btn-primary"
              >
                Add customer
              </button>
            }
          />
        )}
      </div>

      <BottomNav reminderCount={data?.reminders_due || 0} />
      <Toast toast={toast} />
    </div>
  )
}
