import localFont from 'next/font/local'
import './globals.css'
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/footer/Footer'
import ScrollToTop from '@/components/scrolltotop/ScrollToTop'
import { AuthProvider } from '@/context/AuthContext'

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

const gajra = localFont({
  src: './fonts/gajra.woff',
  variable: '--font-gajra',
  weight: '400 900'
})

const rubik = localFont({
  src: './fonts/rubik.woff',
  variable: '--font-rubik',
  weight: '400 900'
})
const russo = localFont({
  src: './fonts/russo.woff',
  variable: '--font-russo',
  weight: '400 900'
})

const titan = localFont({
  src: './fonts/titan.woff',
  variable: '--font-titan',
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
        className={`
    ${geistSans.variable} 
    ${geistMono.variable} 
    ${moiraione.variable} 
    ${oswald.variable} 
    ${gajra.variable} 
    ${rubik.variable} 
    ${russo.variable} 
    ${titan.variable} 
    antialiased
  `}
      >
        <AuthProvider>
          <Navigation />
          {children}
          <Footer />
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  )
}
