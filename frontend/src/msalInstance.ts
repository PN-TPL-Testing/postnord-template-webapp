import { PublicClientApplication } from '@azure/msal-browser'

const cfg = window.__APP_CONFIG__ ?? { entraClientId: '', entraTenantId: '', prefix: '' }

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: cfg.entraClientId,
    authority: `https://login.microsoftonline.com/${cfg.entraTenantId}`,
    redirectUri: window.location.origin + cfg.prefix,
  },
  cache: { cacheLocation: 'sessionStorage', storeAuthStateInCookie: false },
})
