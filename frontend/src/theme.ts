export const theme = {
  // Brand
  bluePrimary:   '#00A0D6',
  blueNavy:      '#0D234B',
  blueLink:      '#005D92',
  coral:         '#F06365',
  orange:        '#F89142',

  // Surfaces
  bgPage:        '#FFFFFF',
  bgCard:        '#FFFFFF',
  bgNav:         '#0D234B',
  bgCode:        '#F8FAFC',

  // Text
  textPrimary:   '#1E1E1E',
  textSecondary: '#475569',
  textOnDark:    '#FFFFFF',

  // Borders
  border:        '#E2E8F0',
  borderCode:    '#CBD5E1',

  // Env badge semantic colours
  envDev: '#2563eb',
  envTst: '#d97706',
  envPrd: '#16a34a',

  // Status
  statusHealthy: '#22c55e',
} as const

export const ENV_COLOURS: Record<string, string> = {
  dev: theme.envDev,
  tst: theme.envTst,
  prd: theme.envPrd,
}
