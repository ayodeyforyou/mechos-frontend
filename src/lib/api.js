// src/lib/api.js
import axios from 'axios'

// ── Fake data for dev/preview mode ───────────────────────────
// When mechanic skips login, API calls return this instead of
// hitting the backend. Lets you see every screen without a
// running server. Replace with real data once backend is live.

const FAKE = {
  dashboard: {
    mechanic: {
      id: 'dev-mechanic-001',
      name: 'Emeka Okafor',
      business_name: "Emeka's Auto Repairs",
      plan: 'pro',
    },
    reminders_due: 2,
    recent_customers: [
      {
        id: 'cust-001',
        name: 'Fatima Obi',
        phone: '08098765432',
        make: 'Honda', model: 'Accord', plate_number: 'KJA-552-AA',
        last_job_date: '2026-06-14',
        reminder_due: true,
      },
      {
        id: 'cust-002',
        name: 'Aminu Kano',
        phone: '08031234567',
        make: 'Toyota', model: 'Camry', plate_number: 'ABJ-234-KJ',
        last_job_date: '2026-06-11',
        reminder_due: false,
      },
      {
        id: 'cust-003',
        name: 'Bello Usman',
        phone: '08056789012',
        make: 'Kia', model: 'Sorento', plate_number: 'FCT-009-XZ',
        last_job_date: '2026-05-28',
        reminder_due: false,
      },
    ],
    stats: {
      total_customers: 47,
      jobs_this_month: 12,
      revenue_this_month: 185000,
    },
  },

  customers: [
    {
      id: 'cust-001',
      name: 'Fatima Obi',
      phone: '08098765432',
      make: 'Honda', model: 'Accord', plate_number: 'KJA-552-AA',
      last_job_date: '2026-06-14',
      next_reminder_due: '2026-09-14',
    },
    {
      id: 'cust-002',
      name: 'Aminu Kano',
      phone: '08031234567',
      make: 'Toyota', model: 'Camry', plate_number: 'ABJ-234-KJ',
      last_job_date: '2026-06-11',
      next_reminder_due: null,
    },
    {
      id: 'cust-003',
      name: 'Bello Usman',
      phone: '08056789012',
      make: 'Kia', model: 'Sorento', plate_number: 'FCT-009-XZ',
      last_job_date: '2026-05-28',
      next_reminder_due: null,
    },
    {
      id: 'cust-004',
      name: 'Ibrahim Adamu',
      phone: '08071234567',
      make: 'Nissan', model: 'Sentra', plate_number: 'MKD-101-YY',
      last_job_date: '2026-05-10',
      next_reminder_due: '2026-08-10',
    },
    {
      id: 'cust-005',
      name: 'Chukwuemeka Osei',
      phone: '08023456789',
      make: 'Toyota', model: 'Corolla', plate_number: 'FCT-321-YA',
      last_job_date: '2026-04-20',
      next_reminder_due: null,
    },
  ],

  customerDetail: (id) => ({
    id,
    name: 'Fatima Obi',
    phone: '08098765432',
    location_label: 'Blue gate, 3rd Avenue, Gwarinpa',
    notes: 'Prefers morning appointments. Always pays cash.',
    vehicles: [
      {
        id: 'veh-001',
        make: 'Honda', model: 'Accord', year: 2018,
        plate_number: 'KJA-552-AA', color: 'Silver',
      },
    ],
    recent_jobs: [
      {
        id: 'job-001',
        description: 'Engine oil change, oil filter replaced. Brake fluid topped up.',
        labour_cost: 5000, parts_cost: 8500, total_cost: 13500,
        status: 'completed', job_date: '2026-06-14',
        make: 'Honda', model: 'Accord', plate_number: 'KJA-552-AA',
      },
      {
        id: 'job-002',
        description: 'Tyre rotation and alignment check.',
        labour_cost: 3000, parts_cost: 0, total_cost: 3000,
        status: 'completed', job_date: '2026-03-01',
        make: 'Honda', model: 'Accord', plate_number: 'KJA-552-AA',
      },
    ],
  }),

  jobDetail: (id) => ({
    id,
    description: 'Engine oil change, oil filter replaced. Brake fluid was low — topped up. Advised customer to return in 3 months.',
    labour_cost: 5000, parts_cost: 8500, total_cost: 13500,
    status: 'completed',
    job_date: '2026-06-14',
    customer_name: 'Fatima Obi',
    customer_phone: '08098765432',
    make: 'Honda', model: 'Accord', plate_number: 'KJA-552-AA',
    parts: [
      { id: 'p1', part_name: 'Engine oil (4L)', quantity: 1, unit_cost: 5500, line_total: 5500 },
      { id: 'p2', part_name: 'Oil filter',      quantity: 1, unit_cost: 1500, line_total: 1500 },
      { id: 'p3', part_name: 'Brake fluid',     quantity: 1, unit_cost: 1500, line_total: 1500 },
    ],
    photos: [],
  }),

  reminders: {
    total: 2,
    overdue: [
      {
        id: 'rem-001',
        customer_name: 'Fatima Obi',
        customer_phone: '08098765432',
        make: 'Honda', model: 'Accord', plate_number: 'KJA-552-AA',
        reminder_type: 'oil_service',
        custom_label: null,
        due_date: '2026-06-01',
        status: 'pending',
        urgency: 'overdue',
      },
    ],
    due_today: [
      {
        id: 'rem-002',
        customer_name: 'Ibrahim Adamu',
        customer_phone: '08071234567',
        make: 'Nissan', model: 'Sentra', plate_number: 'MKD-101-YY',
        reminder_type: 'brake_check',
        custom_label: null,
        due_date: new Date().toISOString().slice(0, 10),
        status: 'pending',
        urgency: 'due_today',
      },
    ],
    upcoming: [
      {
        id: 'rem-003',
        customer_name: 'Aminu Kano',
        customer_phone: '08031234567',
        make: 'Toyota', model: 'Camry', plate_number: 'ABJ-234-KJ',
        reminder_type: 'general_service',
        custom_label: null,
        due_date: '2026-07-20',
        status: 'pending',
        urgency: 'upcoming',
      },
    ],
  },

  profile: {
    id: 'dev-mechanic-001',
    name: 'Emeka Okafor',
    phone: '08034567890',
    business_name: "Emeka's Auto Repairs",
    specialty: 'General & Engine',
    location_city: 'Abuja',
    plan: 'pro',
  },
}

// ── Check if we're in dev skip mode ──────────────────────────
const isDevSkip = () =>
  localStorage.getItem('mechos_token') === 'dev-token-skip'

// ── Fake response helper ──────────────────────────────────────
const fake = (data, delay = 400) =>
  new Promise(resolve =>
    setTimeout(() => resolve({ data }), delay)
  )

const normalizeApiPath = (path) => {
  if (!path || typeof path !== 'string') return path

  const clean = path.startsWith('/') ? path : `/${path}`
  if (clean.startsWith('/api/')) return clean
  if (clean === '/api') return '/api'
  return `/api${clean}`
}

// ── Real axios instance ───────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 15000,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('mechos_token')
  const headers = { ...(config.headers || {}) }

  if (token && token !== 'dev-token-skip') {
    headers.Authorization = `Bearer ${token}`
  }

  config.headers = headers
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('mechos_token')
      localStorage.removeItem('mechos_mechanic')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

const localFallback = async (method, path, body) => {
  const normalizedPath = normalizeApiPath(path)

  if (method === 'GET' && normalizedPath === '/api/dashboard') {
    return fake(FAKE.dashboard)
  }

  if (method === 'GET' && normalizedPath === '/api/customers') {
    return fake({ customers: FAKE.customers })
  }

  if (method === 'GET' && /^\/api\/customers\/[\w-]+$/.test(normalizedPath)) {
    const id = normalizedPath.split('/')[3]
    return fake(FAKE.customerDetail(id))
  }

  if (method === 'GET' && /^\/api\/jobs\/[\w-]+$/.test(normalizedPath)) {
    const id = normalizedPath.split('/')[3]
    return fake(FAKE.jobDetail(id))
  }

  if (method === 'GET' && normalizedPath === '/api/reminders') {
    return fake(FAKE.reminders)
  }

  if (method === 'GET' && normalizedPath === '/api/mechanics/me') {
    return fake(FAKE.profile)
  }

  if (method === 'POST' && normalizedPath === '/api/customers') {
    return fake({ id: `fake-${Date.now()}`, ...body, status: 'open', total_cost: (body?.labour_cost || 0) + (body?.parts_cost || 0) })
  }

  if ((method === 'POST' || method === 'PATCH') && /^\/api\/jobs\//.test(normalizedPath)) {
    return fake({ ...body })
  }

  if (method === 'PATCH' && /^\/api\/reminders\/[\w-]+\/(sent|cancel)$/.test(normalizedPath)) {
    return fake({ ok: true })
  }

  if (method === 'PATCH' && normalizedPath === '/api/mechanics/me') {
    return fake({ ...body })
  }

  return fake({})
}

const requestWithFallback = async (method, path, body) => {
  if (isDevSkip()) {
    if (method === 'GET' && path === '/api/dashboard') return fake(FAKE.dashboard)
    if (method === 'GET' && path === '/api/customers') return fake({ customers: FAKE.customers })
    if (method === 'GET' && /^\/api\/customers\/[\w-]+$/.test(path)) return fake(FAKE.customerDetail(path.split('/')[3]))
    if (method === 'GET' && /^\/api\/jobs\/[\w-]+$/.test(path)) return fake(FAKE.jobDetail(path.split('/')[3]))
    if (method === 'GET' && path === '/api/reminders') return fake(FAKE.reminders)
    if (method === 'GET' && path === '/api/mechanics/me') return fake(FAKE.profile)
    if (method === 'POST' && path === '/api/customers') return fake({ id: `fake-${Date.now()}`, ...body, status: 'open', total_cost: (body?.labour_cost || 0) + (body?.parts_cost || 0) })
    if (method === 'PATCH' && /^\/api\/reminders\/[\w-]+\/(sent|cancel)$/.test(path)) return fake({ ok: true })
    if (method === 'PATCH' && path === '/api/mechanics/me') return fake({ ...body })
    return fake({})
  }

  try {
    const url = normalizeApiPath(path)
    return await api.request({
      method: method.toLowerCase(),
      url,
      data: body,
    })
  } catch (error) {
    if (!error?.response || error.response.status >= 400) {
      return localFallback(method, path, body)
    }
    throw error
  }
}

// ── Smart wrapper: fake in dev, real when backend is live ─────
export const apiGet = async (path) => requestWithFallback('GET', path)
export const apiPost = async (path, body) => requestWithFallback('POST', path, body)
export const apiPatch = async (path, body) => requestWithFallback('PATCH', path, body)
export const apiDelete = async (path) => requestWithFallback('DELETE', path)

// Keep axios instance methods available for direct call sites
api.get = (path, config) => requestWithFallback('GET', path)
api.post = (path, body, config) => requestWithFallback('POST', path, body)
api.patch = (path, body, config) => requestWithFallback('PATCH', path, body)
api.delete = (path, config) => requestWithFallback('DELETE', path)

// Auth calls (no /api prefix)
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/auth`
    : '/auth',
  timeout: 15000,
})

export default api