Completed: 1. Update the color theme of project ai_workflows of (domain)/workflows/page.js to match the main page.js styling, don't not change the page layout or functionality
Completed: 2. npm install all the necessary components listed as imports in (domain)/worksflows/page.js
Completed: 3. create a directory called util and add a page/function to loop through the ai_workflows/flows directory and list those flows as a dropdown in the Langflow API Endpoint field of the (domain)/workflows/page.js
Completed: 4. Add new images to /public/icons for PWA can you create a very simple AI Icon and create the appropriate sizes
Completed: 5. make button components blue in main page and workflow page as well as tabs
Completed: 6. Move the workflow.api to /actions and create a server action to replace API call so it stays on the server
Completed: 7. Update workflow/pages form to call the server action
8. Add Swagger Documentation:
    openapi: 3.0.0
    info:
      title: Langflow API Documentation
      description: API for interacting with Langflow flows.
      version: 1.0.0
    servers:
      - url: https://your-langflow-instance.com/api # Replace with your Langflow server URL
        description: Langflow Production Server
    paths:
      /v1/run/{flow_id}:
        post:
          summary: Run a Langflow flow
          parameters:
            - in: path
              name: flow_id
              schema:
                type: string
              required: true
              description: The ID of the flow to execute.
          requestBody:
            required: true
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    inputs:
                      type: object
                      description: Input values for the flow.
                    tweaks:
                      type: object
                      description: Optional tweaks for flow components.
          responses:
            '200':
              description: Flow executed successfully.
              content:
                application/json:
                  schema:
                    type: object # Define your expected response schema here
            '401':
              description: Unauthorized - Missing or invalid API key.
    components:
      securitySchemes:
        ApiKeyAuth:
          type: apiKey
          in: header
          name: x-api-key # Or whatever header your Langflow instance uses for API keys
    security:
      - ApiKeyAuth: []