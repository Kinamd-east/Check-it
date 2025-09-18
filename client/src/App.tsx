import { Route, Routes } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import { Dashboard, Home, ScheduleDetails } from './pages'
import AuthLayout from './layout/auth/AuthLayout'
import RootLayout from './layout/root/RootLayout'
import CreateSchedule from './pages/CreateSchedule'
import Login from '@/pages/auth/Login'
import Signup from './pages/auth/Signup'
import CreateTask from './pages/CreateTask'

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-schedule" element={<CreateSchedule />} />
          <Route path="/create-task/:id" element={<CreateTask />} />
          <Route path="/schedules/:id" element={<ScheduleDetails />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
