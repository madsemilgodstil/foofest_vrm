import localFont from 'next/font/local'
import './globals.css'
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/footer/Footer'
import ScrollToTop from '@/components/scrolltotop/ScrollToTop'
import { AuthProvider } from '@/context/AuthContext'
import Cookie from '@/components/cookie/Cookie'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

const moiraione = localFont({
  src: './fonts/moiraione-regular.woff',
  variable: '--font-moiraione',
  weight: '400 900'
})

const oswald = localFont({
  src: './fonts/oswald.woff',
  variable: '--font-oswald',
  weight: '400 900'
})

export const metadata = {
  title: 'FooFest 2025',
  description: 'Created by VRM'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${oswald.variable} ${moiraione.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navigation />
          {children}
          <Footer />
          <ScrollToTop />
        </AuthProvider>
        <Cookie />
      </body>
    </html>
  )
}
