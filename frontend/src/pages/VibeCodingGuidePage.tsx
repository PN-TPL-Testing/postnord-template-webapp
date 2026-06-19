// TEMPLATE: This guide page ships with every provisioned PostNord platform app.
// Replace or extend it with your own app content once you're up and running.

import { theme, ENV_COLOURS } from '../theme'

interface Props {
  config: AppConfig
  onLogout: () => void
}

const s: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    background: theme.bgPage,
    color: theme.textPrimary,
    minHeight: '100vh',
  },
  nav: {
    background: theme.bgNav,
    borderBottom: 'none',
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
    color: theme.textOnDark,
  },
  logoutBtn: {
    background: 'transparent',
    border: `1px solid ${theme.whiteTint30}`,
    borderRadius: '6px',
    color: theme.whiteTint80,
    cursor: 'pointer',
    fontSize: '0.85rem',
    padding: '6px 14px',
  },
  main: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  hero: {
    marginBottom: '32px',
    paddingBottom: '32px',
    borderBottom: `1px solid ${theme.border}`,
  },
  heroTitle: {
    fontSize: '2.25rem',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    marginBottom: '10px',
    background: `linear-gradient(90deg, ${theme.blueNavy} 0%, ${theme.bluePrimary} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    color: theme.textSecondary,
    fontSize: '1rem',
    margin: 0,
  },
  callout: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    background: theme.orangeTint08,
    border: `1px solid ${theme.orangeTint40}`,
    borderLeft: `3px solid ${theme.orange}`,
    borderRadius: '8px',
    padding: '14px 18px',
    marginBottom: '32px',
    color: theme.textPrimary,
    fontSize: '0.875rem',
    lineHeight: '1.6',
  },
  calloutIcon: {
    fontSize: '1rem',
    flexShrink: 0,
    marginTop: '1px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
    gap: '20px',
  },
  card: {
    background: theme.bgCard,
    border: `1px solid ${theme.border}`,
    borderRadius: '12px',
    padding: '24px 28px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    margin: 0,
  },
  iconChip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    fontSize: '1rem',
    flexShrink: 0,
  },
  cardBody: {
    fontSize: '0.875rem',
    lineHeight: '1.7',
    color: theme.textSecondary,
  },
  p: {
    margin: '0 0 12px',
    color: theme.textSecondary,
    lineHeight: '1.7',
  },
  ul: {
    margin: '0 0 12px',
    paddingLeft: '20px',
    color: theme.textSecondary,
    lineHeight: '1.8',
  },
  li: {
    marginBottom: '4px',
  },
  pre: {
    background: theme.bgCode,
    border: `1px solid ${theme.borderCode}`,
    borderRadius: '8px',
    padding: '12px 14px',
    margin: '0 0 12px',
    overflowX: 'auto',
    fontSize: '0.8rem',
    lineHeight: '1.6',
    fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
    color: theme.textPrimary,
    whiteSpace: 'pre',
  },
  inlineCode: {
    background: theme.bgCode,
    border: `1px solid ${theme.borderCode}`,
    borderRadius: '4px',
    padding: '1px 6px',
    fontSize: '0.8em',
    fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
    color: theme.textPrimary,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '48px',
    color: theme.textSecondary,
    fontSize: '0.8rem',
  },
  dot: {
    display: 'inline-block',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: theme.statusHealthy,
  },
}

interface Section {
  title: string
  icon: string
  body: React.ReactNode
}

const SECTIONS: Section[] = [
  {
    title: "What you're looking at",
    icon: '👋',
    body: (
      <>
        <p style={s.p}>
          This is the <strong>week 1 template response</strong> — the default page every new
          PostNord platform app starts with. It's not your app yet; it's the foundation.
        </p>
        <p style={s.p}>
          Right now the app is a <strong>FastAPI backend</strong> serving a{' '}
          <strong>React frontend</strong>, with Microsoft Entra authentication wired up and a
          full CI/CD pipeline deploying to ECS on every push to{' '}
          <code style={s.inlineCode}>main</code>. Everything compiles, deploys, and authenticates
          — you just haven't built anything on top of it yet.
        </p>
        <p style={{ ...s.p, marginBottom: 0 }}>
          Start a Claude Code session, describe what you want to build, and replace this page
          with something real.
        </p>
      </>
    ),
  },
  {
    title: 'What is vibe coding?',
    icon: '🤖',
    body: (
      <>
        <p style={s.p}>
          Vibe coding means using an AI coding assistant — like Claude Code — to write, refactor,
          and explain code interactively. Instead of googling for snippets, you describe what you
          want and let the model produce a first draft.
        </p>
        <p style={{ ...s.p, marginBottom: 0 }}>
          You stay in the loop: review the diff, tweak the prompt, iterate. The goal is fast,
          readable code where you understand every line — not generated code you can't own or
          explain.
        </p>
      </>
    ),
  },
  {
    title: 'How this platform works',
    icon: '⚙️',
    body: (
      <>
        <p style={s.p}>
          When someone clicks "New App" in the PostNord portal, it clones this template repo,
          replaces <code style={s.inlineCode}>{'{{TOKEN}}'}</code> placeholders in the CI/CD
          workflow files, and automatically wires up:
        </p>
        <ul style={s.ul}>
          <li style={s.li}>ECR container registry</li>
          <li style={s.li}>ECS services for dev / tst / prd</li>
          <li style={s.li}>ALB routing rules and Route 53 CNAMEs</li>
          <li style={s.li}>IAM task roles and a GitHub OIDC deploy role</li>
          <li style={s.li}>
            Secrets Manager paths at{' '}
            <code style={s.inlineCode}>/apps/{'<slug>'}{'/<env>'}/config</code>
          </li>
        </ul>
        <p style={{ ...s.p, marginBottom: 0 }}>
          The result is a standalone repo with working CI/CD that deploys to{' '}
          <code style={s.inlineCode}>{'<slug>'}-dev.apps-tpl.internal</code> on every push to
          main, and promotes to tst/prd via manual workflow dispatch.
        </p>
      </>
    ),
  },
  {
    title: 'Where this app is heading',
    icon: '🚀',
    body: (
      <>
        <p style={s.p}>
          The template gives you the scaffolding; Claude Code helps you fill it in. The typical
          progression looks like:
        </p>
        <ul style={s.ul}>
          <li style={s.li}>
            Add real API routes to <code style={s.inlineCode}>app/main.py</code> — Claude can
            scaffold endpoints from a plain-English description
          </li>
          <li style={s.li}>
            Replace this guide page with your actual React UI in{' '}
            <code style={s.inlineCode}>frontend/src/</code>
          </li>
          <li style={s.li}>
            Pull secrets from Secrets Manager and connect to your real data sources
          </li>
          <li style={s.li}>Iterate: describe → review diff → test → push → repeat</li>
        </ul>
        <p style={{ ...s.p, marginBottom: 0 }}>
          The CI/CD, auth, and infrastructure are already in place — you're building on top of
          a running foundation, not starting from zero.
        </p>
      </>
    ),
  },
  {
    title: 'Platform conventions to keep',
    icon: '📋',
    body: (
      <>
        <p style={s.p}>These are hardcoded into the platform — breaking them breaks your app:</p>
        <ul style={{ ...s.ul, marginBottom: 0 }}>
          <li style={s.li}>
            <strong>Port 8080</strong> — ECS and the ALB health check are hardcoded to this port
          </li>
          <li style={s.li}>
            <code style={s.inlineCode}>GET /health</code> returning HTTP 200 — ECS uses this to
            decide if the task is healthy
          </li>
          <li style={s.li}>
            <code style={s.inlineCode}>APP_SLUG</code> and{' '}
            <code style={s.inlineCode}>APP_ENV</code> env var names — injected by ECS, used for
            routing and Secrets Manager paths
          </li>
          <li style={s.li}>
            <strong>dev / tst / prd</strong> environment names — baked into ECS service names,
            DNS, and IAM policies
          </li>
          <li style={s.li}>
            <code style={s.inlineCode}>{'{{TOKEN}}'}</code> placeholders in{' '}
            <code style={s.inlineCode}>.github/workflows/</code> — the portal replaces these at
            provision time; do not rename them
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'Just push to main',
    icon: '🔄',
    body: (
      <>
        <p style={s.p}>
          You don't need to think about running this app. The platform handles it: every push to{' '}
          <code style={s.inlineCode}>main</code> triggers a CI build, packages your app into a
          Docker image, and deploys it to the dev environment automatically. Promoting to tst or
          prd is a single click in GitHub Actions. There's no server to manage, no container to
          run locally, no infrastructure to configure.
        </p>
        <p style={{ ...s.p, marginBottom: 0 }}>
          The right workflow with a provisioned app like this is: describe the change you want to
          Claude Code, review the diff, commit, and push. Let the platform do the rest. Your job
          is to steer the product — not operate the infrastructure.
        </p>
      </>
    ),
  },
]

export default function VibeCodingGuidePage({ config, onLogout }: Props) {
  const envColour = ENV_COLOURS[config.env] ?? theme.envUnknown

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

        <div style={s.callout}>
          <span style={s.calloutIcon}>🚧</span>
          <span>
            <strong>Week 1 demo — template response.</strong> This page is placeholder content
            that ships with every new app. Once you start building, replace it with your own UI.
          </span>
        </div>

        <div style={s.grid}>
          {SECTIONS.map(section => (
            <section key={section.title} style={s.card}>
              <div style={s.cardHeader}>
                <h2 style={s.cardTitle}>{section.title}</h2>
                <span
                  style={{
                    ...s.iconChip,
                    background: `${envColour}22`,
                    color: envColour,
                  }}
                >
                  {section.icon}
                </span>
              </div>
              <div style={s.cardBody}>{section.body}</div>
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
