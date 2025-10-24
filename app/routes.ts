import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('layouts/ConsoleLayout.tsx', [
    index('routes/startup.tsx'),
    route('/home', 'routes/home.tsx')
  ]),
  route('/map-creator', 'routes/map_creator.tsx')
] satisfies RouteConfig
