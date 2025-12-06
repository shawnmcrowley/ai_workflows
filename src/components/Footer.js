import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2025 The Lycra Company. Built with n8n, PostgreSQL, and Ollama.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="https://github.com/shawnmcrowley/ai_workflows" className="hover:text-white transition">GitHub</Link>
            <Link href="#" className="hover:text-white transition">Documentation</Link>
            <Link href="#" className="hover:text-white transition">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
