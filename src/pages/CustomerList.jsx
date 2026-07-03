import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { useToast } from '../hooks/useToast'
import { TopBar, BottomNav, Icon, Avatar, Toast, Spinner, EmptyState } from '../components/UI'

export default function CustomerList() {
  const navigate = useNavigate()
  const { toast, error } = useToast()

  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get('/api/customers')
        setCustomers(data.customers || [])
      } catch (err) {
        error('Failed to load customers')
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [error])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!search.trim()) {
      setSearching(false)
      return
    }

    setSearching(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const { data } = await api.get('/api/customers', {
          params: { search }
        })
        setCustomers(data.customers || [])
      } catch (err) {
        error('Search failed')
      } finally {
        setSearching(false)
      }
    }, 400)
  }, [search, error])

  if (loading) return <Spinner page />

  return (
    <div className="page">
      <TopBar
        title="Customers"
        right={
          <button
            onClick={() => navigate('/customers/new')}
            className="btn-icon"
            style={{ color: 'white' }}
          >
            <Icon.Plus />
          </button>
        }
      />

      <div className="page-content">
        {/* Search bar */}
        <div className="search-wrap">
          <Icon.Search />
          <input
            type="text"
            placeholder="Name or plate number…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Customer count */}
        <div className="section-label">
          {customers.length} customer{customers.length !== 1 ? 's' : ''}
        </div>

        {/* Customer list */}
        {customers.length > 0 ? (
          <div className="card" style={{ padding: 0 }}>
            {customers.map(customer => (
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
            title={search ? `No customers found` : 'No customers yet'}
            body={search ? `No customers match "${search}"` : 'Add your first customer to get started'}
            action={!search && (
              <button
                onClick={() => navigate('/customers/new')}
                className="btn-primary"
              >
                Add customer
              </button>
            )}
          />
        )}
      </div>

      <BottomNav />
      <Toast toast={toast} />
    </div>
  )
}
