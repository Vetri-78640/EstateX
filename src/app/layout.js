// app/layout.js
import './globals.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { AuthContextProvider } from '@/lib/firebase/AuthContext'

export const metadata = {
  title: 'Real Estate Tracker',
  description: 'Track your real estate investments in real-time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthContextProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  )
}