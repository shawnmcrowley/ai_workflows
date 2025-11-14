import './globals.css';
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration';

export const metadata = {
  title: 'AI Workflows',
  description: 'Build intelligent AI workflows with Langflow, PostgreSQL, and Ollama',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AI Workflows',
  },
};

export const viewport = {
  themeColor: '#2563eb',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AI Workflows" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
