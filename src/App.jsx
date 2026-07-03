import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './lib/AuthContext'
import { Spinner } from './components/UI'
import Login from './pages/Login'
import Home from './pages/Home'
import CustomerList from './pages/CustomerList'
import AddCustomer from './pages/AddCustomer'
import CustomerDetail from './pages/CustomerDetail'
import AddVehicle from './pages/AddVehicle'
import AddJob from './pages/AddJob'
import JobDetail from './pages/JobDetail'
import Reminders from './pages/Reminders'
import Profile from './pages/Profile'

function PrivateRoute({ children }) {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return <Spinner page />
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default function App() {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return <Spinner page />
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/customers" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
      <Route path="/customers/new" element={<PrivateRoute><AddCustomer /></PrivateRoute>} />
      <Route path="/customers/:id" element={<PrivateRoute><CustomerDetail /></PrivateRoute>} />
      <Route path="/customers/:customerId/vehicles/new" element={<PrivateRoute><AddVehicle /></PrivateRoute>} />
      <Route path="/vehicles/:vehicleId/jobs/new" element={<PrivateRoute><AddJob /></PrivateRoute>} />
      <Route path="/jobs/:id" element={<PrivateRoute><JobDetail /></PrivateRoute>} />
      <Route path="/reminders" element={<PrivateRoute><Reminders /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  )
}
