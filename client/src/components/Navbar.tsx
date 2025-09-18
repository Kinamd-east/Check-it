import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import useUserAuthentication from '@/hooks/useUserAuthentication'

const NavigationBar = () => {
  const navItems = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Pricing',
      link: '/pricing',
    },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useUserAuthentication()
  const [isLoading, setIsLoading] = useState('false')
  const navigate = useNavigate()

  const navigateToLogIn = () => {
    setIsMobileMenuOpen(false)
    navigate('/login')
  }
  const navigateToSignUp = () => {
    setIsMobileMenuOpen(false)
    navigate('/signup')
  }

  const navigateToProfile = () => {
    setIsMobileMenuOpen(false)
    navigate('/profile')
  }

  const navigateToDashboard = () => {
    setIsMobileMenuOpen(false)
    navigate('/dashboard')
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for session cookies
        },
      )

      if (!res.ok) {
        const errorData = await res.json()
        toast(errorData.message)
        throw new Error(errorData.message || 'Logout failed')
        setIsLoading(false)
      }

      // Redirect to dashboard or home after successful signup
      setIsLoading(false)
      toast('Successfully Logged out')
      navigate('/login')
    } catch (err: any) {
      setIsLoading(false)
      toast(err.message)
    }
  }

  return (
    <Navbar className="shadow-md">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex flex-row gap-2">
              <NavbarButton
                variant="primary"
                onClick={() => navigate('/dashboard')}
                className="flex flex-row items-center"
              >
                Dashboard
              </NavbarButton>
              <NavbarButton variant="secondary" onClick={handleLogout}>
                {isLoading ? 'Logout' : 'Logout'}
              </NavbarButton>
            </div>
          ) : (
            <div>
              <NavbarButton
                variant="secondary"
                onClick={() => navigate('/login')}
              >
                Login
              </NavbarButton>
              <NavbarButton
                variant="primary"
                onClick={() => navigate('/signup')}
              >
                Signup
              </NavbarButton>
            </div>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            {user ? (
              <div className="flex flex-col">
                <NavbarButton
                  onClick={navigateToDashboard}
                  variant="primary"
                  className="w-full"
                >
                  Dashboard
                </NavbarButton>
                <NavbarButton
                  onClick={handleLogout}
                  variant="primary"
                  className="w-full"
                >
                  {isLoading ? 'Logout' : 'Logout'}
                </NavbarButton>
              </div>
            ) : (
              <div>
                <NavbarButton
                  onClick={navigateToLogIn}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  onClick={navigateToSignUp}
                  variant="primary"
                  className="w-full"
                >
                  Signup
                </NavbarButton>
              </div>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}

export default NavigationBar
