import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'
import { AiFillYoutube } from 'react-icons/ai'
import { MdOutlineVideoCall } from 'react-icons/md'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FiUser, FiLogOut } from 'react-icons/fi'
import { BsMicFill } from 'react-icons/bs'
import SearchBar from './SearchBar'
import NotificationsDropdown from './NotificationsDropdown'
import VoiceSearchModal from './VoiceSearchModal'

const Navbar = () => {
  const { user, login, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showVoiceSearch, setShowVoiceSearch] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifRef = useRef()
  const userMenuRef = useRef()

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotifications(false)
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setShowUserMenu(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        const profile = await res.json()
        login({
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
          accessToken: tokenResponse.access_token,
        })
      } catch (err) {
        console.error('Failed to fetch user profile', err)
      }
    },
    onError: () => console.error('Google login failed'),
    scope: 'openid email profile https://www.googleapis.com/auth/youtube.readonly',
  })

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#0f0f0f] border-b border-zinc-800">
        <div className="flex items-center justify-between px-4 h-14">

          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <RxHamburgerMenu className="text-white text-xl cursor-pointer hover:text-zinc-300 transition" />
            <Link to="/" className="flex items-center gap-1">
              <AiFillYoutube className="text-red-600 text-4xl" />
              <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
                YouTube
              </span>
            </Link>
          </div>

          {/* Center: Search + Mic */}
          <div className="flex-1 flex items-center justify-center px-4 gap-2">
            <SearchBar />
            <button
              onClick={() => setShowVoiceSearch(true)}
              className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex-shrink-0"
              title="Search with your voice"
            >
              <BsMicFill className="text-white text-base" />
            </button>
          </div>

          {/* Right: Icons + Auth */}
          <div className="flex items-center gap-1 flex-shrink-0">

            {/* Camera — only when signed in */}
            {user && (
              <button
                onClick={() => window.open('https://studio.youtube.com', '_blank')}
                className="p-2 rounded-full hover:bg-zinc-800 transition-colors hidden md:flex"
                title="YouTube Studio"
              >
                <MdOutlineVideoCall className="text-white text-2xl" />
              </button>
            )}

            {/* Notifications — only when signed in */}
            {user && (
              <div className="relative hidden md:block" ref={notifRef}>
                <button
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className="p-2 rounded-full hover:bg-zinc-800 transition-colors relative"
                  title="Notifications"
                >
                  <IoMdNotificationsOutline className="text-white text-2xl" />
                  {/* Red dot badge */}
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0f0f0f]" />
                </button>
                {showNotifications && (
                  <NotificationsDropdown
                    accessToken={user.accessToken}
                    onClose={() => setShowNotifications(false)}
                  />
                )}
              </div>
            )}

            {/* Sign In / User Avatar */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <img
                  src={user.picture}
                  alt={user.name}
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  className="w-8 h-8 rounded-full cursor-pointer ml-1 hover:ring-2 hover:ring-white transition-all"
                />
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#282828] rounded-xl shadow-2xl z-50 py-2 border border-zinc-700">
                    <div className="flex items-center gap-3 px-4 py-2 border-b border-zinc-700 mb-1">
                      <img src={user.picture} alt="" className="w-9 h-9 rounded-full" />
                      <div className="min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-zinc-400 text-xs truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-zinc-700 transition-colors"
                    >
                      <FiLogOut size={15} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => googleLogin()}
                className="flex items-center gap-1.5 border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition-all duration-200 px-3 py-1.5 rounded-full text-sm font-medium ml-1"
              >
                <FiUser size={16} />
                <span className="hidden sm:block">Sign in</span>
              </button>
            )}

          </div>
        </div>
      </nav>

      {/* Voice Search Modal — rendered outside nav to cover full screen */}
      {showVoiceSearch && (
        <VoiceSearchModal onClose={() => setShowVoiceSearch(false)} />
      )}
    </>
  )
}

export default Navbar