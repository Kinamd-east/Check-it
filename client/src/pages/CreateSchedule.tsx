import React, { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import useUserAuthentication from '../hooks/useUserAuthentication'

const CreateSchedule = () => {
  const [loading, setLoading] = useState(false)
  const { user } = useUserAuthentication()
  const [form, setForm] = useState({
    name: '',
    description: '',
  })
  const navigate = useNavigate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!form.name || !form.description) {
      toast.error('Please fill in all fields')
      setLoading(false)
      return
    }

    if (form.name.length < 3) {
      toast.error('Name must be at least 3 characters long')
      setLoading(false)
      return
    }

    if (form.description.length < 3) {
      toast.error('Description must be at least 3 characters long')
      setLoading(false)
      return
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/schedule/create/${user?._id}`,
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
        throw new Error(errorData.message || 'Schedule creation failed')
      }

      // Redirect to dashboard or home after successful signup
      setLoading(false)
      toast('Successfully created schedule')
      navigate('/dashboard')
    } catch (err: any) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 bg-black min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Create Schedule</h2>
          <p className="text-slate-400 mt-1">
            Plan your day and build consistency
          </p>
        </div>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Schedule Name
            </label>
            <input
              type="text"
              value={form.name}
              name="name"
              onChange={handleChange}
              placeholder="e.g., Morning Routine"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={handleChange}
              name="description"
              placeholder="Add some details about this schedule..."
              rows={3}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-1 cursor-pointer"
            >
              {loading ? 'Please wait...' : 'Create Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateSchedule
