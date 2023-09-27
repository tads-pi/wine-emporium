import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import { SnackbarProvider } from 'notistack';


const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={client}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
        </QueryClientProvider>
      </Provider>
  </React.StrictMode>,
)
