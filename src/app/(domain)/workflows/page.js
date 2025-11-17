import React, { useState } from 'react';
import { Upload, Send, Loader2, CheckCircle, XCircle, FileText, ImageIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Mock server action - replace with actual server action
const callLangflowAPI = async (data) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    success: true,
    data: {
      message: "Workflow executed successfully",
      output: data.input || "No input provided",
      metadata: {
        timestamp: new Date().toISOString(),
        processingTime: "2.1s",
        tokensUsed: 450
      }
    }
  };
};

export default function LangflowInterface() {
  const [input, setInput] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Prepare data for API call
      const formData = {
        input,
        apiEndpoint,
        apiKey,
        files: files.map(f => ({ name: f.name, type: f.type, size: f.size }))
      };

      // Call server action (mock implementation)
      const response = await callLangflowAPI(formData);
      
      if (response.success) {
        setResult(response.data);
      } else {
        throw new Error('API call failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while processing your request');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setFiles([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">Langflow API Interface</h1>
          <p className="text-slate-600">Execute workflows with text input or file uploads</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Workflow Input</CardTitle>
              <CardDescription>Configure your Langflow workflow parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* API Configuration */}
                <div className="space-y-2">
                  <Label htmlFor="endpoint">Langflow API Endpoint</Label>
                  <Input
                    id="endpoint"
                    placeholder="https://api.langflow.io/v1/workflow/..."
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apikey">API Key</Label>
                  <Input
                    id="apikey"
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>

                {/* Input Tabs */}
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text">Text Input</TabsTrigger>
                    <TabsTrigger value="file">File Upload</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="space-y-2">
                    <Label htmlFor="input">Your Input</Label>
                    <Textarea
                      id="input"
                      placeholder="Enter your text input here..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </TabsContent>
                  
                  <TabsContent value="file" className="space-y-2">
                    <Label htmlFor="files">Upload Files</Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                      <input
                        id="files"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="files" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                        <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-500 mt-1">PDF, TXT, JSON, CSV, Images</p>
                      </label>
                    </div>
                    
                    {files.length > 0 && (
                      <div className="space-y-2 mt-3">
                        {files.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded border">
                            {file.type.startsWith('image/') ? (
                              <ImageIcon className="w-4 h-4 text-slate-500" />
                            ) : (
                              <FileText className="w-4 h-4 text-slate-500" />
                            )}
                            <span className="text-sm flex-1 truncate">{file.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {(file.size / 1024).toFixed(1)} KB
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={handleSubmit}
                    disabled={loading || (!input && files.length === 0)}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Execute Workflow
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={handleClear}
                    variant="outline"
                    disabled={loading}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Workflow execution output</CardDescription>
            </CardHeader>
            <CardContent>
              {!result && !error && !loading && (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <Send className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-sm">Execute a workflow to see results</p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-3" />
                  <p className="text-sm text-slate-600">Processing your request...</p>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {result && (
                <div className="space-y-4">
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      {result.message}
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-slate-500 uppercase">Output</Label>
                      <div className="mt-1 p-4 bg-slate-50 rounded-lg border">
                        <p className="text-sm whitespace-pre-wrap">{result.output}</p>
                      </div>
                    </div>

                    {result.metadata && (
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-xs text-blue-600 font-medium">Processing Time</p>
                          <p className="text-lg font-bold text-blue-900">{result.metadata.processingTime}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <p className="text-xs text-purple-600 font-medium">Tokens Used</p>
                          <p className="text-lg font-bold text-purple-900">{result.metadata.tokensUsed}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-xs text-green-600 font-medium">Status</p>
                          <p className="text-lg font-bold text-green-900">Success</p>
                        </div>
                      </div>
                    )}

                    {result.metadata?.timestamp && (
                      <p className="text-xs text-slate-500">
                        Completed at {new Date(result.metadata.timestamp).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Footer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Integration Guide</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-2">
            <p><strong>Step 1:</strong> Enter your Langflow API endpoint URL</p>
            <p><strong>Step 2:</strong> Provide your API key for authentication</p>
            <p><strong>Step 3:</strong> Choose text input or upload files</p>
            <p><strong>Step 4:</strong> Click "Execute Workflow" to process your request</p>
            <p className="text-xs text-slate-500 mt-3">
              Note: This is a demo interface. Replace the mock server action with actual Langflow API integration.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}