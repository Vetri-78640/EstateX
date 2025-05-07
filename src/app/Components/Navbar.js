'use client'
import Link from 'next/link'
import { useAuth } from '@/lib/firebase/AuthContext'
import Image from 'next/image'

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#1f2937] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#6F8FAF] tracking-wider">
          EstateX
        </Link>
        <ul className="flex gap-6 text-base font-medium items-center">
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
                  href="/insights" 
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
      </div>
    </nav>
  )
}

export default Navbar