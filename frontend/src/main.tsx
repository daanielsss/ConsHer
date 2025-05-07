import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from './components/ui/sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>

        <App />
        <Toaster visibleToasts={1} position='top-right' richColors />

      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)