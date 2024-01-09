"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

const queryClient = new QueryClient()

  return (
    <html lang="en">

      <body className=' bg-lightGray'>
      <QueryClientProvider client={queryClient}>

        <div className={inter.className}>
          <div className='flex flex-col gap-[6vw] items-center'>

          <Navigation />
          {children}
          </div>
        </div>
      </QueryClientProvider>
      </body>
    </html>
  )
}
