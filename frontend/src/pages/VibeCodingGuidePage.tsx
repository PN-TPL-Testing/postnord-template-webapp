// TEMPLATE: This guide page ships with every provisioned PostNord platform app
// to give the first developer a quick orientation. Replace or extend it with your
// own app content once you're up and running.

interface Props {
  config: AppConfig
  onLogout: () => void
}

const ENV_COLOURS: Record<string, string> = {
  dev: '#2563eb',
  tst: '#d97706',
  prd: '#16a34a',
}

const SECTIONS = [
  {
    title: 'What is vibe coding?',
    body: `Vibe coding means using an AI coding assistant — like Claude Code — to write, refactor, and
explain code interactively. Instead of googling for snippets, you describe what you want and let the
model produce the first draft. You stay in the loop: review the diff, tweak the prompt, iterate.
The goal is fast, readable code where you understand every line — not generated code you can't own.`,
  },
  {
    title: 'How this platform works',
    body: `When someone clicks "New App" in the PostNord portal, the portal clones this template repo,
replaces {{TOKEN}} placeholders in the CI/CD workflow files with your app's AWS resources, and wires
up ECR, ECS, ALB, Route 53, IAM, and Secrets Manager automatically.

The result is a standalone GitHub repo (this one) with working CI/CD that deploys to
<slug>-dev.apps-tpl.internal on every push to main, and promotes to tst/prd via manual workflow dispatch.`,
  },
  {
    title: 'Platform conventions you must keep',
    body: `• Port 8080 — ECS and the ALB health check are hardcoded to this port.
• GET /health returning HTTP 200 — ECS uses this to decide if the task is healthy.
• APP_SLUG and APP_ENV env var names — injected by ECS, used for routing and Secrets Manager paths.
• dev / tst / prd environment names — baked into ECS service names, DNS, and IAM policies.
• {{TOKEN}} placeholders in .github/workflows/ — the portal replaces these at provision time; do not rename them.`,
  },
  {
    title: 'Adding features with Claude Code',
    body: `1. Open this repo in Claude Code (or run \`claude\` in the project directory).
2. Describe the feature in plain language: "Add a POST /items endpoint that stores items in DynamoDB".
3. Review the diff. Check for port 8080 compliance, /health stability, and no hard-coded credentials.
4. Run the tests: \`pytest\`. Fix anything that breaks.
5. Push — CI builds the image, deploy.yml updates the dev ECS service automatically.

Tips:
• Secrets belong in Secrets Manager at /apps/<slug>/<env>/config — never in the repo or env files.
• The IAM task role has a permissions boundary; don't assume broad AWS access without checking.
• Add new Python dependencies to requirements.txt and rebuild the Docker image to validate.`,
  },
  {
    title: 'Running locally',
    body: `# Backend (FastAPI)
uvicorn app.main:app --reload --port 8080

# Frontend (React, hot-reload)
cd frontend && npm install && npm run dev

# Full production build (React → app/static/, then served by FastAPI)
cd frontend && npm run build
uvicorn app.main:app --port 8080

# Docker (mirrors the ECS environment exactly)
docker build -t my-app . && docker run -p 8080:8080 -e APP_SLUG=my-app -e APP_ENV=dev my-app`,
  },
]

export default function VibeCodingGuidePage({ config, onLogout }: Props) {
  const envColour = ENV_COLOURS[config.env] ?? '#6b7280'

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <div style={s.navLeft}>
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
          {/* APP_SLUG comes from the ECS task env var set by the portal at provision time.
              Every app provisioned from this template will show its own slug here. */}
          <span style={s.appName}>{config.slug}</span>
        </div>
        <button style={s.logoutBtn} onClick={onLogout}>
          Sign out
        </button>
      </nav>

      <main style={s.main}>
        <div style={s.hero}>
          <h1 style={s.heroTitle}>Vibe Coding Guide</h1>
          <p style={s.heroSub}>
            Your quick-start reference for building on the PostNord App Platform.
          </p>
        </div>

        <div style={s.grid}>
          {SECTIONS.map(section => (
            <section key={section.title} style={s.card}>
              <h2 style={s.cardTitle}>{section.title}</h2>
              <p style={s.cardBody}>{section.body}</p>
            </section>
          ))}
        </div>

        <footer style={s.footer}>
          <span style={s.dot} />
          Healthy · {config.slug} · {config.env}
        </footer>
      </main>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    background: '#0f172a',
    color: '#f1f5f9',
    minHeight: '100vh',
  },
  nav: {
    background: '#1e293b',
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 24px',
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  envBadge: {
    border: '1px solid',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '2px 10px',
  },
  appName: {
    fontWeight: 600,
    fontSize: '0.95rem',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '0.85rem',
    padding: '6px 14px',
  },
  main: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  hero: {
    marginBottom: '40px',
  },
  heroTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    marginBottom: '10px',
  },
  heroSub: {
    color: '#94a3b8',
    fontSize: '1rem',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '28px 32px',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '12px',
  },
  cardBody: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    lineHeight: '1.7',
    whiteSpace: 'pre-line',
    margin: 0,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '48px',
    color: '#475569',
    fontSize: '0.8rem',
  },
  dot: {
    display: 'inline-block',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#22c55e',
    animation: 'pulse 2s infinite',
  },
}
