'use client'
import Link from 'next/link'
import { useAuth } from '@/lib/firebase/AuthContext'
import Image from 'next/image'
import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav  className="bg-white/20 backdrop-blur-md border border-white/30 text-gray-900 px-2 py-3 shadow-lg w-full md:w-[75%] max-w-[1000px] mx-auto rounded-none md:rounded-full flex items-center justify-between sticky top-0 md:top-6 z-50 dark:bg-slate-900/60 dark:text-slate-100 dark:border-white/20" >
      <div className="flex justify-between items-center w-full">
        <Link href="/" className="text-2xl pl-4 font-bold text-[#6F8FAF] tracking-wider">
          EstateX
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-base font-medium items-center">
          {user ? (
            <>
              <li>
                <Link 
                  href="/Dashboard" 
                  className="hover:text-[#4169E1] transition-colors duration-200 dark:hover:text-blue-200"
                >Dashboard</Link>
              </li>
              <li>
                <Link 
                  href="/properties" 
                  className="hover:text-[#4169E1] transition-colors duration-200 dark:hover:text-blue-200"
                >Properties</Link>
              </li>
              <li>
                <Link 
                  href="/Insights" 
                  className="hover:text-[#4169E1] transition-colors duration-200 dark:hover:text-blue-200"
                >Insights</Link>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className="btn-glass rounded-full p-2 border border-blue-200/40 shadow transition-colors duration-200 flex items-center justify-center text-xl dark:text-yellow-300 text-blue-700 hover:bg-blue-100/30 dark:hover:bg-slate-800/40"
                  style={{ borderRadius: '9999px' }}
                >
                  {theme === 'dark' ? (
                    <SunIcon className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <MoonIcon className="w-6 h-6 text-blue-800" />
                  )}
                </button>
              </li>
              <li className="flex items-center gap-2">
                {user.photoURL && (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm dark:text-blue-100">{user.displayName}</span>
                <button
                  onClick={async () => {
                    setLogoutLoading(true);
                    await logout();
                    setLogoutLoading(false);
                  }}
                  className="ml-4 px-4 py-2 btn-glass border border-red-400 text-red-600 hover:border-red-600 hover:text-red-700 rounded-full transition-colors duration-200 disabled:opacity-60 dark:border-red-300 dark:text-red-300 dark:hover:text-red-400"
                  style={{ borderRadius: '9999px' }}
                  disabled={logoutLoading}
                >
                  {logoutLoading ? (
                    <span className="flex items-center"><span className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full inline-block"></span>Logging out...</span>
                  ) : 'Logout'}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  href="/login" 
                  className="hover:text-[#4169E1] transition-colors duration-200 dark:hover:text-blue-200"
                >Login</Link>
              </li>
              <li>
                <Link 
                  href="/signup" 
                  className="btn-glass px-4 py-2 rounded-full transition-colors duration-200 border border-blue-300 text-blue-700 hover:border-blue-400 hover:text-blue-800 dark:border-blue-200/30 dark:text-blue-100 dark:hover:text-blue-200"
                  style={{ borderRadius: '9999px' }}
                >Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Mobile menu overlay - outside the flex container */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 min-h-screen w-full overflow-y-auto flex flex-col justify-center items-center bg-white/30 backdrop-blur-2xl border border-white/30 dark:bg-slate-900/80 dark:text-slate-100 dark:border-white/20 shadow-2xl transition-all px-6 py-8 gap-10"> 
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-slate-800 dark:text-slate-100 text-4xl focus:outline-none bg-white/40 dark:bg-slate-800/60 rounded-full p-2 shadow-lg z-50"
            aria-label="Close menu"
          >
            &times;
          </button>
          {/* Theme toggle for mobile */}
          <button
            onClick={toggleTheme}
            className="mb-6 btn-glass rounded-full p-4 border border-blue-200/40 shadow-lg flex items-center justify-center text-3xl dark:text-yellow-300 text-blue-700 hover:bg-blue-100/30 dark:hover:bg-slate-800/40 w-16 h-16"
            aria-label="Toggle dark mode"
            style={{ borderRadius: '9999px' }}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-8 h-8 text-yellow-400" />
            ) : (
              <MoonIcon className="w-8 h-8 text-blue-800" />
            )}
          </button>
          <ul className="w-full flex flex-col items-center justify-center gap-10 text-3xl font-bold text-gray-900 dark:text-slate-100 px-4">
            {user ? (
              <>
                <li className="w-full text-center">
                  <Link href="/Dashboard" className="block py-3 hover:text-[#4169E1] transition-colors duration-200 dark:hover:text-blue-200" onClick={toggleMenu}>Dashboard</Link>
                </li>
                <li className="w-full text-center">
                  <Link href="/properties" className="block py-3 hover:text-[#4169E1] transition-colors duration-200 dark:hover:text-blue-200" onClick={toggleMenu}>Properties</Link>
                </li>
                <li className="w-full text-center">
                  <Link href="/Insights" className="block py-3 hover:text-[#4169E1] transition-colors duration-200 dark:hover:text-blue-200" onClick={toggleMenu}>Insights</Link>
                </li>
                <li className="flex flex-col items-center gap-4 py-4 w-full">
                  {user.photoURL && (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white"
                    />
                  )}
                  <span className="text-lg dark:text-blue-100">{user.displayName}</span>
                  <button
                    onClick={async () => {
                      setLogoutLoading(true);
                      await logout();
                      setLogoutLoading(false);
                      toggleMenu();
                    }}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white text-lg font-semibold transition-colors duration-200 disabled:opacity-60 dark:bg-red-700 dark:hover:bg-red-800"
                    disabled={logoutLoading}
                  >
                    {logoutLoading ? (
                      <span className="flex items-center"><span className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full inline-block"></span>Logging out...</span>
                    ) : 'Logout'}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="w-full text-center">
                  <Link href="/login" className="block py-3 hover:text-[#2dd4bf] transition-colors duration-200 dark:hover:text-blue-200" onClick={toggleMenu}>Login</Link>
                </li>
                <li className="w-full text-center">
                  <Link href="/signup" className="inline-block px-8 py-3 btn-glass rounded-full text-blue-700 text-lg font-semibold border border-blue-300 text-blue-700 hover:border-blue-400 hover:text-blue-800 dark:border-blue-200/30 dark:text-blue-100 dark:hover:text-blue-200 transition-colors duration-200" onClick={toggleMenu}>Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar