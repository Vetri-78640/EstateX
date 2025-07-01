"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from '@/lib/firebase/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="bg-transparent text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 mt-[72px]">
        {/* My Hero Text - static, no animation */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-xl dark:text-slate-100">
            Track Your Real Estate Investments
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-xl text-gray-600 mx-auto md:mx-0 dark:text-slate-300">
            Monitor performance, get live market data, and gain valuable financial insights.
          </p>
          {user ? (
            <div className="flex justify-center md:justify-start">
              <motion.a
                href="/Dashboard"
                className="btn-glass inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg transition duration-300 whitespace-nowrap"
                style={{ borderRadius: '9999px' }}
                whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.24)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                Go to Dashboard
              </motion.a>
            </div>
          ) : (
            <div className="flex justify-center md:justify-start">
              <motion.a
                href="/signup"
                className="btn-glass px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg transition duration-300 inline-block"
                style={{ borderRadius: '9999px' }}
                whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.24)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                Get Started
              </motion.a>
            </div>
          )}
        </div>

        {/* Image - static, no animation or hover */}
        <div className="max-w-4xl mx-auto mt-6 md:mt-10 rounded-3xl bg-glass p-3 sm:p-4 md:p-6 shadow-2xl border border-slate-200">
          <motion.div
            className="overflow-hidden rounded-2xl shadow-xl"
            whileHover={{ scale: 1.04, boxShadow: '0 12px 40px 0 rgba(31,38,135,0.24)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Image
              src="/Hero.jpg"
              alt="Real Estate Investment Illustration"
              width={500}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-transparent py-8 sm:py-12 md:py-16" >
        <div className="container mx-auto px-4 sm:px-6" >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 " 
          >
            {["$1.2M Portfolio", "$7,200 Monthly Cashflow", "12 Properties", "Updated 2 mins ago"].map((text, i) => (
              <motion.div
                key={i}
                style={{ borderRadius: '9999px' }}
                className="bg-glass rounded-xl shadow-lg p-4 md:p-6 text-center cursor-pointer transform"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.24)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <p className="text-base sm:text-lg md:text-xl font-semibold text-blue-600 dark:text-blue-200">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-transparent py-8 sm:py-12 md:py-20" >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 md:mb-10 dark:text-slate-100">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-12" >
            {[
              { title: "Sign Up", desc: "Create your free account and log in securely." },
              { title: "Add Properties", desc: "Connect or manually input property data." },
              { title: "Track & Optimize", desc: "Visualize ROI, market trends, and insights." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-4 sm:p-6 bg-glass rounded-xl transform"
                style={{ borderRadius: '9999px' }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.24)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-blue-700 dark:text-blue-200">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-transparent py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 dark:text-slate-100">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              "Real-time Market Data",
              "ROI & Cash Flow Calculators",
              "Compare Properties",
              "Smart Alerts",
              "Tax Estimator",
              "Property Forecasts",
            ].map((feature, i) => (
              <motion.div
                key={i}
                style={{ borderRadius: '9999px' }}
                className="bg-glass p-4 sm:p-6 rounded-xl shadow-md transform"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.24)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <p className="font-semibold text-blue-700 text-sm sm:text-base md:text-lg text-center dark:text-blue-200">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-transparent py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 dark:text-slate-100">
            What Investors Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {[
              "EstateX helped me consolidate and understand my ROI across 6 properties!",
              "I love the real-time updates and simple dashboard views!",
            ].map((testimonial, i) => (
              <motion.blockquote
                key={i}
                style={{ borderRadius: '9999px' }}
                className="bg-glass p-4 sm:p-6 rounded-lg shadow transform"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.24)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <p className="italic text-sm sm:text-base text-gray-700 dark:text-slate-300">&quot;{testimonial}&quot;</p>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}