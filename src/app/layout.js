import './globals.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { AuthContextProvider } from '@/lib/firebase/AuthContext'
import CursorGlow from './Components/CursorGlow'
import { ThemeProvider } from './Components/ThemeProvider'

export const metadata = {
  title: 'Real Estate Tracker',
  description: 'Track your real estate investments in real-time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <CursorGlow />

          {/* Background Effects */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 animate-gradient-move dark:from-gray-900 dark:via-slate-900 dark:to-gray-800" />
            
            <svg className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] opacity-40 blur-2xl" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#f472b6', stopOpacity: 0 }} />
                </radialGradient>
              </defs>
              <circle fill="url(#grad1)" cx="100" cy="100" r="100" />
            </svg>

            <svg className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] opacity-30 blur-2xl" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#f472b6', stopOpacity: 0 }} />
                </radialGradient>
              </defs>
              <circle fill="url(#grad2)" cx="100" cy="100" r="100" />
            </svg>
          </div>

          <AuthContextProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthContextProvider>
        </ThemeProvider>
        <div
        style={{
          textAlign: 'center',
          padding: '1.5rem 0',
          backdropFilter: 'blur(8px)',
          color: '#333',
          fontWeight: '500',
          fontSize: '1rem',
          borderTop: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <h1 style={{ marginBottom: '0.5rem'}} className='text-black dark:text-white'>Designed & Developed by Vetri</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '1.4rem' }}>
          <a
            href="https://www.linkedin.com/in/vetriselvan-r-a238b7263"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0077b5', textDecoration: 'none' }}
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/im.vetri"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color:'rgb(247, 88, 88)', textDecoration: 'none' }}
          >
            Instagram
          </a>
        </div>
      </div>
      </body>
    </html>
  )
}