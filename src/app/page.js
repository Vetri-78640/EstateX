"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from '@/lib/firebase/AuthContext';

export default function Home() {
  const { user } = useAuth();

  // Animation variants for better performance
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="bg-gradient-to-b from-white via-slate-50 to-slate-100 text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 mt-[72px]">
        {/* My Hero Text Animation with smooth Fade in and move up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-xl">
            Track Your Real Estate Investments
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-xl text-gray-600 mx-auto md:mx-0">
            Monitor performance, get live market data, and gain valuable financial insights.
          </p>
          {user ? (
            // Butoon Interaction
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex justify-center md:justify-start">
              <Link
                href="/Dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg transition duration-300 inline-block"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex justify-center md:justify-start">
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg transition duration-300 inline-block"
              >
                Get Started
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Image and it's styles and animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto mt-6 md:mt-10 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 p-3 sm:p-4 md:p-6 shadow-2xl border border-slate-200"
        >
          <div className="overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <Image
              src="/Hero.jpg"
              alt="Real Estate Investment Illustration"
              width={500}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.1 }}
            variants={staggerContainer}
          >
            {["$1.2M Portfolio", "$7,200 Monthly Cashflow", "12 Properties", "Updated 2 mins ago"].map((text, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-4 md:p-6 text-center transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                variants={fadeInUp}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <p className="text-base sm:text-lg md:text-xl font-semibold text-blue-600">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-12">
            {[
              { title: "Sign Up", desc: "Create your free account and log in securely." },
              { title: "Add Properties", desc: "Connect or manually input property data." },
              { title: "Track & Optimize", desc: "Visualize ROI, market trends, and insights." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-4 sm:p-6 bg-slate-50 rounded-xl hover:shadow-xl transition duration-300 hover:scale-[1.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-blue-700">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-gradient-to-r from-blue-50 to-sky-100 py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            Key Features
          </motion.h2>
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
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-2xl transition duration-300 hover:scale-[1.02]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <p className="font-semibold text-blue-700 text-sm sm:text-base md:text-lg text-center">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            What Investors Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {[
              "EstateX helped me consolidate and understand my ROI across 6 properties!",
              "I love the real-time updates and simple dashboard views!",
            ].map((testimonial, i) => (
              <motion.blockquote
                key={i}
                className="bg-slate-100 p-4 sm:p-6 rounded-lg shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <p className="italic text-sm sm:text-base text-gray-700">&quot;{testimonial}&quot;</p>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Only show if user is not logged in */}
      {!user && (
        <section className="bg-blue-700 text-white py-8 sm:py-12 md:py-20 text-center">
          <motion.div
            className="container mx-auto px-4 sm:px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Get Started?</h2>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/signup"
                className="inline-block bg-white text-blue-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition"
              >
                Create Free Account
              </Link>
            </motion.div>
          </motion.div>
        </section>
      )}
    </main>
  );
}