import { useState } from 'react'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import VibeCodingGuidePage from './pages/VibeCodingGuidePage'

// window.__APP_CONFIG__ is injected by FastAPI when serving index.html.
// Each provisioned app gets its own slug and env, so prefix differs per deployment
// (e.g. "/my-logistics-tool-dev"). React Router's basename keeps client-side
// navigation within that prefix. Fallback values let the frontend work standalone
// during `npm run dev` without a running backend.
const config: AppConfig = window.__APP_CONFIG__ ?? {
  slug: 'app',
  env: 'dev',
  prefix: '/app-dev',
  entraClientId: '',
  entraTenantId: '',
}

export default function App() {
  const msalAuthenticated = useIsAuthenticated()
  const [localAuthenticated, setLocalAuthenticated] = useState(false)
  const isAuthenticated = msalAuthenticated || localAuthenticated
  const { instance } = useMsal()

  const handleLogout = () => {
    if (config.entraClientId) {
      instance.logoutRedirect()
    } else {
      setLocalAuthenticated(false)
    }
  }

  return (
    <BrowserRouter basename={config.prefix}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/guide" replace />
            ) : (
              <LoginPage config={config} onLogin={() => setLocalAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/guide"
          element={
            isAuthenticated ? (
              <VibeCodingGuidePage config={config} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
