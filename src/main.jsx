import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='437883263165-q4o1keal39l6u79putnj1hlcn46f66r6.apps.googleusercontent.com'>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
    
  </StrictMode>,
)
