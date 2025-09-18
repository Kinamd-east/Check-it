import { Outlet } from 'react-router'
import { Navigate } from 'react-router'
import NavigationBar from '@/components/Navbar'
import useUserAuthentication from '@/hooks/useUserAuthentication'

const AuthLayout = () => {
  const { user, loading } = useUserAuthentication()

  if (loading) return <h1>Loading...</h1>
  return !user ? (
    <div className="flex flex-col min-h-screen w-full">
      <NavigationBar />
      <div className="m-2 flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/dashboard" />
  )
}

export default AuthLayout
