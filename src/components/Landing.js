'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Landing() {
  return (
    <main className="flex-1">
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Build Intelligent AI Workflows
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Combine N8N's visual builder with PostgreSQL vector database and local Ollama models for powerful AI applications.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/workflows">
              <Button variant="outline" size="lg" className="px-8">
                View Workflows
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Visual Workflows</h4>
              <p className="text-gray-600">Build AI pipelines with N8N's drag-and-drop interface.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🗄️</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Vector Database</h4>
              <p className="text-gray-600">Store and search documents with PostgreSQL pgvector.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Local AI Models</h4>
              <p className="text-gray-600">Run Ollama models locally for privacy and control.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="workflows" className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Available Workflows</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Document Q&A</h4>
              <p className="text-gray-600">Interactive question-answering for uploaded documents.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Docling Processing</h4>
              <p className="text-gray-600">Advanced document parsing and data extraction.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">News & Web Search</h4>
              <p className="text-gray-600">AI-powered content aggregation and analysis.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Vector Store RAG</h4>
              <p className="text-gray-600">Retrieval-augmented generation with vector search.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
