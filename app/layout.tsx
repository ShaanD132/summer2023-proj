import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {ClerkProvider} from "@clerk/nextjs"
import localFont from "next/font/local"
import { ToasterProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const myFont = localFont({
  src: [
    {
      path: "../fonts/Kreadon-B.otf",
      weight: "700",
      style: "normal"
    }
  ]
})

export const metadata: Metadata = {
  title: 'myStore',
  description: 'myStore Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
