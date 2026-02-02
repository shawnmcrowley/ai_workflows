# AI Workflows - Agent Guidelines

This document provides essential information for AI agents working on this codebase.

## Project Overview

**AI Workflows** - A Next.js 16 web application for building intelligent AI workflows with Langflow, PostgreSQL, and Ollama. Uses the App Router pattern with Server Actions.

## Build Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run dev:proxy        # Dev with Turbopack + proxy support
npm run dev-remote       # Dev accessible from remote IPs

# Production
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Run ESLint (Next.js built-in)

# No test framework configured - add tests with Jest or Vitest if needed
```

## Code Style Guidelines

### Imports
- **Order**: React imports first, then third-party libraries, then internal aliases
- **Path Aliases**: Use `@/*` aliases defined in `jsconfig.json`
  - `@/components/*` → `src/components/*`
  - `@/lib/*` → `src/lib/*`
  - `@/util/*` → `src/util/*`
- **React**: Import as namespace: `import * as React from "react"`
- **Utils**: Import `cn` from `@/lib/utils` for Tailwind class merging

### Formatting
- **Quotes**: Use double quotes for strings
- **Indentation**: 2 spaces
- **Semicolons**: Optional but consistent (project uses minimal)
- **Trailing Commas**: Use in multi-line objects/arrays

### Naming Conventions
- **Components**: PascalCase (e.g., `Button`, `CardHeader`)
- **Functions**: camelCase (e.g., `executeWorkflowAction`, `cn`)
- **Variables**: camelCase (e.g., `apiKey`, `isValid`)
- **Constants**: UPPER_SNAKE_CASE or camelCase
- **Files**: PascalCase for components, camelCase for utilities

### Component Patterns

#### UI Components (shadcn/ui style)
```javascript
import * as React from "react"
import { cn } from "@/lib/utils"

const Component = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("base-classes", className)}
    {...props}
  />
))
Component.displayName = "Component"

export { Component }
```

#### Server Actions
```javascript
'use server'

export async function myAction(formData) {
  try {
    // Logic here
    return {
      success: true,
      data: result,
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
```

### Styling (Tailwind CSS)
- Use `cn()` from `@/lib/utils` for conditional/dynamic classes
- Prefer Tailwind utility classes over custom CSS
- Use `class-variance-authority` (CVA) for component variants
- Follow shadcn/ui patterns for consistency

### Error Handling
- Always wrap async operations in try-catch
- Return consistent error response objects with `success: false`, `error`, `timestamp`
- Use `console.error()` for server-side error logging
- Validate inputs early and return descriptive error messages

### Type Guidelines
- Project uses JavaScript with JSDoc for types
- Add JSDoc comments for complex function signatures
- Use PropTypes sparingly (project prefers JSDoc)

### Key Libraries
- **UI**: Radix UI primitives + Tailwind CSS
- **Icons**: lucide-react
- **Forms**: React Server Actions with FormData
- **HTTP**: Native fetch (no axios)
- **Langflow**: @datastax/langflow-client

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── actions/         # Server Actions
│   ├── workflows/       # Route segments
│   ├── layout.js        # Root layout
│   ├── page.js          # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── ui/              # shadcn/ui components
│   └── *.js             # Feature components
├── lib/                 # Utility functions
│   └── utils.js         # cn() and helpers
└── util/                # Additional utilities
```

## Environment & Configuration

- **Node**: 18+
- **Next.js**: 16.x with App Router
- **React**: 19.x
- **Tailwind**: 3.x
- **Base Path**: `/workflow_automation` in production

## Important Notes

1. **No tests configured** - Add Jest/Vitest if testing is needed
2. **No Prettier config** - Follow existing code style manually
3. **Strict Mode disabled** in next.config.mjs
4. **PWA features** included with service worker registration
5. **CORS headers** configured for local network access
