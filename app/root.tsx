import './app.css'
import { Links, Meta, Outlet, Scripts } from 'react-router'
import type { ReactNode } from 'react'
import { DebugPanel } from './components/DebugPanel'

export default function App () {
  return <Outlet />
}

export function Layout ({ children }: { children: ReactNode }) {
  return (
    <html lang='es'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='flex items-center justify-center min-h-fit min-w-fit'>
        <DebugPanel />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
