import { useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return {
    toast,
    success: msg => showToast(msg, 'success'),
    error: msg => showToast(msg, 'error'),
    info: msg => showToast(msg, 'info'),
  }
}
