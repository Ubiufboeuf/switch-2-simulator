import { index, layout, type RouteConfig } from '@react-router/dev/routes'

export default [
  layout('layouts/ConsoleLayout.tsx', [
    index('routes/index.tsx')
  ])
] satisfies RouteConfig
