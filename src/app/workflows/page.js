'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileUpload } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { executeWorkflowAction, getWorkflowData } from '@/app/actions/workflow-actions';

export default function LangflowInterface() {
  const [input, setInput] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [selectedFlow, setSelectedFlow] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [httpMethod, setHttpMethod] = useState('POST');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const availableFlows = [
    { name: 'Document Q&A', filename: 'Document Q&A.json' },
    { name: 'Docling Processing', filename: 'Docling Processing.json' },
    { name: 'External API', filename: 'External API.json' },
    { name: 'News and Web Search', filename: 'News and Web Search.json' },
    { name: 'Quick Research', filename: 'Quick Research.json' },
    { name: 'Vector Store RAG', filename: 'Vector Store RAG.json' }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">N8N API Interface</h1>
            <p className="text-slate-600">Execute workflows with text input or file uploads</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Configuration</CardTitle>
                <CardDescription>Configure and execute your AI workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="config" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="config">Configuration</TabsTrigger>
                    <TabsTrigger value="files">File Upload</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="config" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="workflow">Select N8N Workflow</Label>
                      <select 
                        id="workflow"
                        value={selectedFlow} 
                        onChange={(e) => setSelectedFlow(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Choose a workflow...</option>
                        {availableFlows.map((flow) => (
                          <option key={flow.filename} value={flow.filename}>
                            {flow.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="method">Method</Label>
                        <select
                          id="method"
                          value={httpMethod}
                          onChange={(e) => setHttpMethod(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="PUT">PUT</option>
                          <option value="DELETE">DELETE</option>
                        </select>
                      </div>
                      <div className="col-span-3 space-y-2">
                        <Label htmlFor="endpoint">API Endpoint</Label>
                        <Input
                          id="endpoint"
                          type="text"
                          placeholder="http://localhost:7860/api/v1/run/workflow-id"
                          value={apiEndpoint}
                          onChange={(e) => setApiEndpoint(e.target.value)}
                          className="font-mono text-sm"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Get this URL from your N8N interface after creating a workflow
                    </p>

                    <div className="space-y-2">
                      <Label htmlFor="apikey">API Key (Optional)</Label>
                      <Input
                        id="apikey"
                        type="password"
                        placeholder="sk-..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>

                    {httpMethod !== 'GET' && (
                      <div className="space-y-2">
                        <Label htmlFor="input">Text Input</Label>
                        <Textarea
                          id="input"
                          placeholder="Enter your text input here..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          rows={6}
                          className="resize-none"
                        />
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="files" className="space-y-4">
                    <div className="text-center py-8 text-gray-500">
                      <p>File upload functionality will be added in a future update.</p>
                      <p className="text-sm mt-2">Currently supporting text input only.</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <form action={async (formData) => {
                  setIsLoading(true)
                  const method = formData.get('method')
                  const endpoint = formData.get('endpoint')
                  const apiKey = formData.get('apiKey')
                  
                  let result
                  if (method === 'GET') {
                    result = await getWorkflowData(endpoint, apiKey)
                  } else {
                    result = await executeWorkflowAction(formData)
                  }
                  
                  setResults(result)
                  setIsLoading(false)
                }}>
                  <input type="hidden" name="endpoint" value={apiEndpoint} />
                  <input type="hidden" name="input" value={input} />
                  <input type="hidden" name="apiKey" value={apiKey} />
                  <input type="hidden" name="method" value={httpMethod} />
                  
                  <Button 
                    type="submit"
                    className="w-full mt-4" 
                    disabled={isLoading || !apiEndpoint || (httpMethod !== 'GET' && !input)}
                  >
                    {isLoading ? 'Executing...' : `Execute ${httpMethod} Request`}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>Workflow Execution Results and Outputs</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-gray-500">Processing workflow...</p>
                  </div>
                ) : results ? (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${
                      results.success 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      {results.success ? (
                        <div>
                          <p className="text-green-800 font-medium">Request executed successfully!</p>
                          {results.contentType && (
                            <p className="text-xs text-green-600 mt-1">Content-Type: {results.contentType}</p>
                          )}
                          {results.data && (
                            <pre className="mt-2 text-sm text-green-700 bg-green-100 p-2 rounded overflow-auto max-h-64">
                              {typeof results.data === 'string' ? results.data : JSON.stringify(results.data, null, 2)}
                            </pre>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-red-800 font-medium">Execution failed</p>
                          <p className="text-sm text-red-600 mt-1">{results.error}</p>
                        </div>
                      )}
                      <p className="text-xs mt-2 opacity-70">
                        {results.success ? 'Completed' : 'Failed'} at: {new Date(results.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <p className="text-sm">Execute a workflow to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}