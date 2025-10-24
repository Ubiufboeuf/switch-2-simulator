import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('layouts/console.tsx', [
  index('routes/startup.tsx'),
  route('/home', 'routes/home.tsx')
  ]),
] satisfies RouteConfig
