import { useState, useEffect } from 'react'
import {
  Target,
  AlertTriangle,
  Settings,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Schedule } from '@/types'
import { Navigate, useNavigate, Link } from 'react-router'
import useUserAuthentication from '@/hooks/useUserAuthentication'
import { Button } from '@/components/ui/button'

const Dashboard = () => {     
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const { user, loading } = useUserAuthentication()
  const [scheduleLoading, setScheduleLoading] = useState(false)
  const navigate = useNavigate()
  const [currentView, setCurrentView] = useState<
    'dashboard' | 'schedule' | 'settings'
  >('dashboard')

  useEffect(() => {
    if (!user?._id) return
    const fetchSchedules = async () => {
      setScheduleLoading(true)
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/schedule/user/${user?._id}`,
          { credentials: 'include' },
        )

        if (!res.ok) {
          const errorData = await res.json()
          toast(errorData.message)
        }

        const data = await res.json()
        setSchedules(data.schedules)
      } catch (err) {
        console.error(err)
      } finally {
        setScheduleLoading(false)
      }
    }

    fetchSchedules()
  }, [user?._id])
  if (loading) return <h1>Loading...</h1>
  return user ? (
    // <div className="flex flex-col min-h-screen w-full">
    //   <div className="m-2 flex-1 overflow-y-auto">
    <div className="min-h-screen bg-white text-white">
      <header className="bg-white text-black border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">Check-it</h1>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6">
              {/*<div className="flex items-center space-x-2 text-orange-400">
                <Flame className="w-5 h-5" />
                <span className="font-semibold">0</span>
                <span className="text-sm text-slate-400">streak</span>
              </div>*/}
              <div className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">
                  {user.schedules.length}/{user.storage}
                </span>
                <span className="text-sm text-slate-400">
                  schedules created
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-1 mt-4 p-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                currentView === 'dashboard'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              Dashboard
            </button>
            {/*<button
              onClick={() => setCurrentView('schedule')}
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                currentView === 'schedule'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              Schedule
            </button>*/}
            <button
              onClick={() => setCurrentView('settings')}
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                currentView === 'settings'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {!loading && user ? (
          scheduleLoading ? (
            <p>Loading schedules...</p>
          ) : user.schedules && user.schedules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schedules.map((schedule) => (
                <Link
                  key={schedule._id}
                  to={`/schedules/${schedule._id}`}
                  className="block p-6 bg-white text-black rounded-xl border border-slate-700/50 transition transform hover:-translate-y-1 cursor-pointer shadow-md hover:bg-black hover:text-white hover:shadow-lg"
                >
                  <h3 className="text-lg font-bold">{schedule.name}</h3>
                  <p className="text-sm text-slate-400">
                    Streaks:{' '}
                    <span className="text-orange-400">{schedule.streaks}</span>
                  </p>
                  <p className="text-sm text-slate-400">
                    Strikes:{' '}
                    <span className="text-red-400">
                      {schedule.strikes}/{user.maxStrikes}
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              <p className="text-sm text-gray-500">
              No schedules found. Create one to get started!
            </p>
            <Button className='cursor-pointer' onClick={() =>  navigate('/create-schedule')}>Create Schedule</Button>
            </div>
          )
        ) : (
          <p className="text-sm text-gray-500">Loading user...</p>
        )}
      </main>
    </div>
  ) : (
    //   </div>
    // </div>
    <Navigate to="/login" />
  )
}

export default Dashboard
