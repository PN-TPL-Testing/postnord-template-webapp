/// <reference types="vite/client" />

// Runtime config injected by FastAPI into index.html before serving.
// APP_SLUG and APP_ENV are set as ECS task environment variables by the portal
// at provision time — each app gets its own slug (e.g. "my-logistics-tool").
// In this template they fall back to "app" / "dev" so local dev works without a backend.
interface AppConfig {
  slug: string
  env: string
  prefix: string
  entraClientId: string
  entraTenantId: string
}

interface Window {
  __APP_CONFIG__?: AppConfig
}
