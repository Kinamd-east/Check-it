import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'

const Signup = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
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
        throw new Error(errorData.message || 'Signup failed')
        setLoading(false)
      }

      // Redirect to dashboard or home after successful signup
      setLoading(false)
      toast('Successfully Signed up')
      navigate('/dashboard')
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
              Create your account
            </h2>

            <form onSubmit={handleSignup}>
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                name="name"
                placeholder="John Doe"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="johndoe_12"
                value={form.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
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
              <p className="text-sm text-slate-500 mt-6">
                Old blood?? Login{' '}
                <a
                  href="/login"
                  className="cursor-pointer underline text-blue-200"
                >
                  here
                </a>
              </p>
              <Button type="submit" className="w-full mt-2 cursor-pointer">
                {loading ? 'Please wait...' : 'Sign up'}
              </Button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Signup
