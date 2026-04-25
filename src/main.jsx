import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext.jsx"
import { PostProvider } from './context/PostContext.jsx'
import { CommentProvider } from './context/CommentContext.jsx'
import { ToastContainer } from 'react-toastify'
import { NotificationProvider } from './context/NotificationContext.jsx'



createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <CommentProvider>
            <NotificationProvider>
            <App />
            </NotificationProvider>
          </CommentProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  
)
