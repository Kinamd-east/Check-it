import { useEffect, useState } from 'react'
import type { User } from '@/types'
const useUserAuthentication = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/getMe`,
        {
          method: 'GET',
          credentials: 'include',
        },
      )

      if (!res.ok) throw new Error('Not authenticated')

      const data = await res.json()
      setUser(data.user)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return { user, loading, refetchUser: fetchUser }
}

export default useUserAuthentication
