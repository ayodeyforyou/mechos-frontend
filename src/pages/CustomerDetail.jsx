import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/api'
import { useToast } from '../hooks/useToast'
import { TopBar, BottomNav, Icon, Avatar, fmt, Toast, Spinner, EmptyState } from '../components/UI'

export default function CustomerDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { toast, error } = useToast()

  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { data } = await api.get(`/api/customers/${id}`)
        setCustomer(data)
      } catch (err) {
        error('Failed to load customer')
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [id, error])

  const handleWhatsApp = () => {
    const normalised = customer.phone.replace(/\s/g, '').replace(/^0/, '234')
    const message = encodeURIComponent(`Hi ${customer.name}! Reaching out from MechOS.`)
    window.open(`https://wa.me/${normalised}?text=${message}`, '_blank')
  }

  if (loading) return <Spinner page />
  if (!customer) return <EmptyState icon={<Icon.Users />} title="Customer not found" body="This customer doesn't exist." />

  const firstVehicle = customer.vehicles?.[0]

  return (
    <div className="page">
      <TopBar
        title={customer.name}
        onBack
        right={
          <button
            onClick={handleWhatsApp}
            className="btn-icon"
            style={{ color: 'white' }}
          >
            <Icon.WhatsApp />
          </button>
        }
      />

      <div className="page-content">
        {/* Customer info card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Avatar name={customer.name} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{customer.name}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{customer.phone}</div>
            </div>
          </div>

          {customer.location_label && (
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>
              📍 {customer.location_label}
            </div>
          )}

          {customer.notes && (
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
              {customer.notes}
            </div>
          )}
        </div>

        {/* Vehicles section */}
        <div className="section-label">Vehicles</div>
        {customer.vehicles && customer.vehicles.length > 0 ? (
          <div className="card" style={{ padding: 0 }}>
            {customer.vehicles.map(vehicle => (
              <div
                key={vehicle.id}
                className="list-row"
                onClick={() => navigate(`/vehicles/${vehicle.id}/jobs/new`, {
                  state: {
                    customerName: customer.name,
                    customerPhone: customer.phone,
                    vehicleMake: vehicle.make,
                    vehicleModel: vehicle.model,
                    vehiclePlate: vehicle.plate_number,
                  }
                })}
              >
                <Icon.Car />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>
                    {vehicle.make} {vehicle.model} {vehicle.year && `(${vehicle.year})`}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                    {vehicle.plate_number}
                  </div>
                </div>
                <Icon.ChevronRight />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>No vehicles yet</p>
        )}

        <button
          className="btn-secondary"
          onClick={() => navigate(`/customers/${id}/vehicles/new`)}
          style={{ marginBottom: 24 }}
        >
          + Add vehicle
        </button>

        {/* Recent repairs section */}
        <div className="section-label">Recent repairs</div>
        {customer.recent_jobs && customer.recent_jobs.length > 0 ? (
          <>
            {customer.recent_jobs.map(job => (
              <div
                key={job.id}
                className="card"
                onClick={() => navigate(`/jobs/${job.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {fmt.date(job.created_at)}
                  </div>
                  <div>
                    {job.status === 'completed' && <span className="badge badge-green">Completed</span>}
                    {job.status === 'open' && <span className="badge badge-amber">Open</span>}
                    {job.status === 'disputed' && <span className="badge badge-red">Disputed</span>}
                  </div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {job.description || 'No description'}
                </div>
                <div style={{ fontSize: 14, color: 'var(--brand-green)', fontWeight: 600, textAlign: 'right' }}>
                  {fmt.naira(job.total_cost)}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>No repairs yet</p>
        )}

        {/* Log new repair button */}
        {firstVehicle ? (
          <button
            className="btn-primary"
            onClick={() => navigate(`/vehicles/${firstVehicle.id}/jobs/new`, {
              state: {
                customerName: customer.name,
                customerPhone: customer.phone,
                vehicleMake: firstVehicle.make,
                vehicleModel: firstVehicle.model,
                vehiclePlate: firstVehicle.plate_number,
              }
            })}
          >
            + Log new repair
          </button>
        ) : (
          <button
            className="btn-secondary"
            onClick={() => navigate(`/customers/${id}/vehicles/new`)}
          >
            + Add vehicle first
          </button>
        )}
      </div>

      <BottomNav />
      <Toast toast={toast} />
    </div>
  )
}
