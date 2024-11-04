import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext/authContext.tsx'
import { Toaster } from 'react-hot-toast'
import { CheckCheck, XIcon } from 'lucide-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      containerClassName="pointer-events-none touch-none"
      data-testid="test_toaster"
      position="top-center"
      toastOptions={{
        style: {
          background: "#1C1C1C",
          color: "#fff",
          padding: "15px",
          borderRadius: "32px",
          gap: "6px", // o texto tem margin-left de 10px, gap 6px fará o espaço ser de 16px.
          maxWidth: "max-content",
          width: "95%",
          pointerEvents: "none",
          touchAction: "none",
        },
        duration: 5000,
        success: {
          icon: <CheckCheck size={24} color={"#38df0a"} />,
        },
        error: {
          icon: <XIcon size={24} color="#fd2b59" />,
        },
      }}
    />

    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
