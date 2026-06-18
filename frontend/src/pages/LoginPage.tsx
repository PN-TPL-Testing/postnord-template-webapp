import { useState } from 'react'

interface Props {
  config: AppConfig
  onLogin: () => void
}

// TEMPLATE: This login page ships in every provisioned PostNord platform app.
// Currently it accepts any non-empty credentials as a demo so developers can
// explore the app shell immediately after provisioning.
//
// To connect real authentication, replace the handleSubmit body with a call
// to the platform's auth service — for example:
//   await Auth.signIn(email, password)   // AWS Amplify Cognito
//   or a POST to /auth/token on your own auth endpoint.
//
// The SSO button below mirrors the portal login pattern. In a real app it would
// redirect to the PostNord identity provider OIDC endpoint. The portal provisions
// an OIDC client ID per app slug that you can use here.

const ENV_COLOURS: Record<string, string> = {
  dev: '#2563eb',
  tst: '#d97706',
  prd: '#16a34a',
}

export default function LoginPage({ config, onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const envColour = ENV_COLOURS[config.env] ?? '#6b7280'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    // TEMPLATE: Accepts any credentials. Replace with a real auth call.
    // In a real app provisioned on this platform each slug gets its own
    // Cognito user pool — the connection details come in via Secrets Manager
    // at /apps/<slug>/<env>/config, injected as env vars by the ECS task.
    onLogin()
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <header style={s.header}>
          {/* The env badge and slug update automatically per provisioned app
              because APP_SLUG / APP_ENV are set by the ECS task definition. */}
          <span
            style={{
              ...s.envBadge,
              background: `${envColour}22`,
              color: envColour,
              borderColor: `${envColour}55`,
            }}
          >
            {config.env}
          </span>
          <h1 style={s.appName}>{config.slug}</h1>
          <p style={s.platform}>PostNord App Platform</p>
        </header>

        <form onSubmit={handleSubmit} style={s.form} noValidate>
          <div style={s.field}>
            <label htmlFor="email" style={s.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@postnord.com"
              style={s.input}
              autoComplete="email"
            />
          </div>
          <div style={s.field}>
            <label htmlFor="password" style={s.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={s.input}
              autoComplete="current-password"
            />
          </div>

          {error && <p style={s.error}>{error}</p>}

          <button type="submit" style={s.submitBtn}>
            Sign in
          </button>
        </form>

        <div style={s.dividerRow}>
          <span style={s.dividerLine} />
          <span style={s.dividerText}>or</span>
          <span style={s.dividerLine} />
        </div>

        {/* TEMPLATE: This SSO button is a placeholder that bypasses the form.
            In a real app, replace onClick with a redirect to the PostNord
            identity provider, e.g.:
              window.location.href = `${authDomain}/oauth2/authorize?...`
            The portal can supply the OIDC endpoint URL as an env var. */}
        <button type="button" style={s.ssoBtn} onClick={onLogin}>
          Continue with PostNord SSO
        </button>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    background: '#0f172a',
    color: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '16px',
  },
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '16px',
    padding: '48px 52px',
    width: '100%',
    maxWidth: '420px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '36px',
  },
  envBadge: {
    display: 'inline-block',
    border: '1px solid',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '3px 12px',
    marginBottom: '14px',
  },
  appName: {
    fontSize: '1.75rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    margin: '0 0 8px',
  },
  platform: {
    color: '#64748b',
    fontSize: '0.875rem',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#94a3b8',
  },
  input: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '0.95rem',
    padding: '10px 14px',
    outline: 'none',
    width: '100%',
  },
  error: {
    color: '#f87171',
    fontSize: '0.85rem',
    margin: 0,
  },
  submitBtn: {
    background: '#2563eb',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 600,
    marginTop: '4px',
    padding: '12px',
    width: '100%',
  },
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '24px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#334155',
  },
  dividerText: {
    color: '#475569',
    fontSize: '0.8rem',
  },
  ssoBtn: {
    background: 'transparent',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '11px',
    width: '100%',
  },
}
