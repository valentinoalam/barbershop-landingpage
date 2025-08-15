import Link from 'next/link'
import React from 'react'

const CallToAction = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10">
    <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-serif font-bold text-slate-100 mb-6">Ready for Your Next Cut?</h2>
        <p className="text-xl text-slate-300 mb-8">
        Visit any of our locations or book online for the ultimate barbershop experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
            href="/booking"
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
        >
            Book Online
        </Link>
        <Link
            href="/"
            className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
        >
            Learn More
        </Link>
        </div>
    </div>
    </section>

  )
}

export default CallToAction