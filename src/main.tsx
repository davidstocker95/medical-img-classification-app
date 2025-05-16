import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppProvider } from './context/AppProvider.tsx';

/**
 * Entry Point
 *
 * Initializes the React application.
 * Wraps the entire app in <AppProvider> and enables React strict mode.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
