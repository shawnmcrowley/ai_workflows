'use server'

export async function callLangflowAPI(data) {
  try {
    const response = await fetch(data.apiEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${data.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        input: data.input,
        files: data.files 
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}