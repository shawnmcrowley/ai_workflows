'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">AI</span>
            </div>
            <h1 className="text-2xl font-bold">Agentic Workflows</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-200 transition">Get Started</Link>
            <Link href="/workflows" className="hover:text-blue-200 transition">Workflows</Link>
            <Link href="/docs" className="hover:text-blue-200 transition">Documentation</Link>
          </nav>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {isOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block py-2 hover:text-blue-200 transition" onClick={() => setIsOpen(false)}>Get Started</Link>
            <Link href="/workflows" className="block py-2 hover:text-blue-200 transition" onClick={() => setIsOpen(false)}>Workflows</Link>
            <Link href="/docs" className="block py-2 hover:text-blue-200 transition" onClick={() => setIsOpen(false)}>Documentation</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
