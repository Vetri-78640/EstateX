'use client'
import Link from 'next/link'
import { useAuth } from '@/lib/firebase/AuthContext'
import Image from 'next/image'
import { useState } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#1f2937] text-white px-6 py-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#6F8FAF] tracking-wider">
          EstateX
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
                  className="hover:text-[#2dd4bf] transition-colors duration-200"
                >Dashboard</Link>
              </li>
              <li>
                <Link 
                  href="/properties" 
                  className="hover:text-[#2dd4bf] transition-colors duration-200"
                >Properties</Link>
              </li>
              <li>
                <Link 
                  href="/Insights" 
                  className="hover:text-[#2dd4bf] transition-colors duration-200"
                >Insights</Link>
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
                <span className="text-sm">{user.displayName}</span>
                <button
                  onClick={logout}
                  className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  href="/login" 
                  className="hover:text-[#2dd4bf] transition-colors duration-200"
                >Login</Link>
              </li>
              <li>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-[#2dd4bf] hover:bg-[#2dd4bf]/80 rounded-md transition-colors duration-200"
                >Sign Up</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:hidden fixed top-[72px] left-0 right-0 bg-[#1f2937] shadow-lg z-40`}
        >
          <ul className="px-4 py-2 space-y-4 flex flex-col items-center">
            {user ? (
              <>
                <li className="w-full text-center">
                  <Link 
                    href="/Dashboard" 
                    className="block hover:text-[#2dd4bf] transition-colors duration-200"
                    onClick={toggleMenu}
                  >Dashboard</Link>
                </li>
                <li className="w-full text-center">
                  <Link 
                    href="/properties" 
                    className="block hover:text-[#2dd4bf] transition-colors duration-200"
                    onClick={toggleMenu}
                  >Properties</Link>
                </li>
                <li className="w-full text-center">
                  <Link 
                    href="/insights" 
                    className="block hover:text-[#2dd4bf] transition-colors duration-200"
                    onClick={toggleMenu}
                  >Insights</Link>
                </li>
                <li className="flex flex-col items-center gap-2 py-2 w-full">
                  {user.photoURL && (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm">{user.displayName}</span>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="w-full text-center">
                  <Link 
                    href="/login" 
                    className="block hover:text-[#2dd4bf] transition-colors duration-200"
                    onClick={toggleMenu}
                  >Login</Link>
                </li>
                <li className="w-full text-center">
                  <Link 
                    href="/signup" 
                    className="inline-block px-4 py-2 bg-[#2dd4bf] hover:bg-[#2dd4bf]/80 rounded-md transition-colors duration-200"
                    onClick={toggleMenu}
                  >Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar