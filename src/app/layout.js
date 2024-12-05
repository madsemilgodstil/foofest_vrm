import localFont from 'next/font/local'
import './globals.css'
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/footer/Footer'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

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

export const metadata = {
  title: 'FooFest 2025',
  description: 'Created by VRM'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
        <Footer />
        <div className='fixed bottom-5 right-5'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href='/pages/artist'>Top</Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to top</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </body>
    </html>
  )
}
