export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2025 The Lycra Company. Built with Langflow, PostgreSQL, and Ollama.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/shawnmcrowley/ai_workflows" className="hover:text-white transition">GitHub</a>
            <a href="#" className="hover:text-white transition">Documentation</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
