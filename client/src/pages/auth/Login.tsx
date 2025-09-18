import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for session cookies
          body: JSON.stringify(form),
        },
      )

      if (!res.ok) {
        const errorData = await res.json()
        toast(errorData.message)
        throw new Error(errorData.message || 'Login failed')
        setLoading(false)
      }

      // Redirect to dashboard or home after successful signup
      setLoading(false)
      toast('Login successful')
      navigate('/')
    } catch (err: any) {
      setLoading(false)
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-sm"
      >
        <Card className="bg-black/4 backdrop-blur-md shadow-2xl border-white/10 text-black">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Welcome back...
            </h2>

            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-1 justify-center pb-3">
                <label htmlFor="email" className="flex flex-row">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="johndoe@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-white/5 text-black placeholder-white/90 border-white/20"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*******"
                  value={form.password}
                  onChange={handleChange}
                  className="bg-white/5 text-black placeholder-white/90 border-white/20"
                  required
                />
              </div>
              <p className="text-sm text-slate-500 mt-6">
                New user?? Signup{' '}
                <a
                  href="/signup"
                  className="cursor-pointer underline text-blue-200"
                >
                  here
                </a>
              </p>
              <Button type="submit" className="w-full mt-2 cursor-pointer">
                {loading ? 'Please wait...' : 'Login'}
              </Button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login
