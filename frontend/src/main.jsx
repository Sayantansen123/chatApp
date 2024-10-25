
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
     <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </BrowserRouter>
  
  
)
