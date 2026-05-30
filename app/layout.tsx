import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono, Poppins, Lobster, Pacifico, Cinzel, Righteous, Raleway } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-poppins',
})

const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
  variable: '--font-lobster',
})

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: '--font-pacifico',
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
  variable: '--font-cinzel',
})

const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
  variable: '--font-righteous',
})

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["900"],
  variable: '--font-raleway',
})

export const metadata: Metadata = {
  title: 'Ayra Farm Labs — Farming as a Service | Telangana',
  description: 'Professional farm management and contract farming for landowners, investors, and agri-businesses across Telangana.',
  generator: 'v0.app',
  keywords: ['contract farming', 'FMCG supply', 'agricultural supply chain', 'traceability', 'documented produce', 'export-ready produce'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} ${poppins.variable} ${lobster.variable} ${pacifico.variable} ${cinzel.variable} ${righteous.variable} ${raleway.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
