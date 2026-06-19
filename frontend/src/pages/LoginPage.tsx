import { useEffect } from 'react'
import { useMsal } from '@azure/msal-react'
import { theme, ENV_COLOURS } from '../theme'

interface Props {
  config: AppConfig
  onLogin: () => void
}

const LOGIN_REQUEST = { scopes: ['openid', 'profile', 'email'] }

export default function LoginPage({ config, onLogin }: Props) {
  const { instance } = useMsal()
  const envColour = ENV_COLOURS[config.env] ?? theme.envUnknown

  useEffect(() => {
    if (config.entraClientId) {
      instance.loginRedirect(LOGIN_REQUEST)
    } else {
      onLogin()
    }
  }, [instance, config.entraClientId, onLogin])

  return (
    <div style={s.page}>
      <div style={s.card}>
        <header style={s.header}>
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
        <p style={s.signingIn}>Signing in with Microsoft...</p>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    background: theme.bgPage,
    color: theme.textPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '16px',
  },
  card: {
    background: theme.bgCard,
    border: `1px solid ${theme.border}`,
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    borderRadius: '16px',
    padding: '48px 52px',
    width: '100%',
    maxWidth: '420px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
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
    color: theme.textSecondary,
    fontSize: '0.875rem',
    margin: 0,
  },
  signingIn: {
    color: theme.textSecondary,
    fontSize: '0.875rem',
    textAlign: 'center',
    margin: 0,
  },
}
