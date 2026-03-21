import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'scopus',
  description: 'Build a real optical instrument. Earn hardware budget. Ship something you can look through.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Hack Club banner */}
        <a href="https://hackclub.com/" target="_blank" rel="noopener noreferrer">
          <img
            style={{
              position: 'fixed',
              top: '20px',
              left: '25px',
              border: 0,
              width: '75px',
              zIndex: 999,
            }}
            src="https://assets.hackclub.com/flag-standalone-wtransparent.svg"
            alt="Hack Club"
          />
        </a>

        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}