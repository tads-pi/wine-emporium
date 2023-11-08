import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SnackbarProvider } from 'notistack';

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
