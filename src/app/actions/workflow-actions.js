'use server'

import { LangflowClient } from '@datastax/langflow-client'

export async function executeWorkflowAction(formData) {
  try {
    const endpoint = formData.get('endpoint')
    const input = formData.get('input')
    const apiKey = formData.get('apiKey')
    const method = formData.get('method') || 'POST'

    // Validate required fields
    if (!endpoint) {
      return {
        success: false,
        error: 'API endpoint is required',
        timestamp: new Date().toISOString()
      }
    }

    console.log('Checking endpoint:', endpoint, 'method:', method)
    console.log('Langflow check:', endpoint.includes('/api/v1/run/'), 'POST check:', method === 'POST')
    
    // For Langflow-specific endpoints, use the client
    if (endpoint.includes('/api/v1/run/') && method === 'POST') {
      console.log('Using Langflow client')
      return await executeLangflowWorkflow(endpoint, input, apiKey)
    }

    // Fallback to generic HTTP requests for other endpoints
    console.log('Using generic request')
    return await executeGenericRequest(endpoint, input, apiKey, method)
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
}

async function executeLangflowWorkflow(endpoint, input, apiKey) {
  console.log('=== LANGFLOW WORKFLOW EXECUTION START ===')
  console.log('Endpoint:', endpoint)
  console.log('Input:', input)
  console.log('API Key:', apiKey ? 'Present' : 'Not provided')
  
  try {
    // Extract base URL and flow ID from endpoint
    const url = new URL(endpoint)
    const baseURL = `${url.protocol}//${url.host}`
    const pathParts = url.pathname.split('/').filter(part => part.length > 0)
    
    // Find flow ID after '/api/v1/run/'
    const runIndex = pathParts.findIndex(part => part === 'run')
    const langflowId = runIndex !== -1 && runIndex + 1 < pathParts.length ? pathParts[runIndex + 1] : pathParts[pathParts.length - 1]
    
    console.log('Parsed URL - Base:', baseURL, 'Flow ID:', langflowId)
    console.log('Path parts:', pathParts)
    console.log('Run index:', runIndex, 'Flow ID extracted:', langflowId)
    
    if (!langflowId || langflowId === 'run') {
      throw new Error('Could not extract flow ID from endpoint. Expected format: /api/v1/run/{flowId}')
    }

    // Initialize Langflow client
    const clientConfig = {
      baseURL,
      langflowId: langflowId,
      ...(apiKey && { apiKey })
    }
    console.log('Client config:', clientConfig)
    
    const client = new LangflowClient({langflowId, apiKey})
    console.log('Langflow client initialized')
    const flow = client.flow(langflowId);

    // Run the flow
    console.log('Calling flow.run with:', {
      inputValue: input,
      inputType: 'chat',
      outputType: 'chat'
    })
    
    const result = await flow.run({
      inputs: {
        "Chat Input:": input || "Hello, Langflow!"
      }
    })
    
    console.log('Langflow result:', result)
    console.log('=== LANGFLOW WORKFLOW EXECUTION SUCCESS ===')

    return {
      success: true,
      data: result,
      contentType: 'application/json',
      timestamp: new Date().toISOString()
    }

  } catch (error) {
    console.error('=== LANGFLOW WORKFLOW EXECUTION ERROR ===')
    console.error('Error details:', error)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    
    return {
      success: false,
      error: `Langflow execution failed: ${error.message}`,
      timestamp: new Date().toISOString()
    }
  }
}

async function executeGenericRequest(endpoint, input, apiKey, method) {
  try {
    // Validate URL format
    new URL(endpoint)

    // Prepare request headers
    const headers = {
      'Content-Type': 'application/json'
    }

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
      headers['x-api-key'] = apiKey
    }

    // Prepare request options
    const requestOptions = {
      method: method.toUpperCase(),
      headers
    }

    // Add body for methods that support it
    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && input) {
        requestOptions.body = JSON.stringify({
        input_value: input,
        input_type: 'chat',
        output_type: 'chat'
      })
    }

    // Make API request
    const response = await fetch(endpoint, requestOptions)

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
        timestamp: new Date().toISOString()
      }
    }

    const contentType = response.headers.get('content-type')
    let result

    if (contentType && contentType.includes('application/json')) {
      result = await response.json()
    } else {
      result = await response.text()
    }

    return {
      success: true,
      data: result,
      contentType: contentType || 'unknown',
      timestamp: new Date().toISOString()
    }

  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
}

export async function getWorkflowData(endpoint, apiKey = null) {
  try {
    const headers = {}
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
      headers['x-api-key'] = apiKey
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers
    })
    console.log('Running the Get Workflow Data function with endpoint:', endpoint, headers)

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
        timestamp: new Date().toISOString()
      }
    }

    const contentType = response.headers.get('content-type')
    let result

    if (contentType && contentType.includes('application/json')) {
      result = await response.json()
    } else {
      result = await response.text()
    }
    console.log('Workflow data retrieved successfully:', result)
    
    return {
      success: true,
      data: result,
      contentType: contentType || 'unknown',
      timestamp: new Date().toISOString()
    }
    

  } catch (error) {
    console.error('Error retrieving workflow data:', error)
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
}

export async function validateWorkflowEndpoint(endpoint) {
  try {
    new URL(endpoint)
    return { isValid: true, errors: [] }
  } catch {
    return { 
      isValid: false, 
      errors: ['Invalid URL format'] 
    }
  }
}