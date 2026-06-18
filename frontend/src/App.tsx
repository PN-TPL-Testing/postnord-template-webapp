import { useState } from 'react'
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
}

export default function App() {
  // TEMPLATE: This is simple React state — not persisted across page loads.
  // In a real provisioned app, replace this with a proper auth session:
  // e.g. AWS Amplify's Auth.signIn(), a JWT stored in memory, or an
  // HttpOnly cookie set by the platform's auth service.
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <BrowserRouter basename={config.prefix}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/guide" replace />
            ) : (
              <LoginPage config={config} onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/guide"
          element={
            isAuthenticated ? (
              <VibeCodingGuidePage config={config} onLogout={() => setIsAuthenticated(false)} />
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
