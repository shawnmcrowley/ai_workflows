import Link from 'next/link'

export default function Header() {
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
        </div>
      </div>
    </header>
  );
}
