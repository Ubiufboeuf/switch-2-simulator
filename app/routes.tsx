import { index, layout, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  layout('layouts/ConsoleLayout.tsx', [
    index('routes/index.tsx'),
    route('/home', 'routes/home.tsx')
  ])
] satisfies RouteConfig
