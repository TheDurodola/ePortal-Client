import { Geist, Geist_Mono, Nunito_Sans, Public_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Metadata, Viewport } from "next"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ModeToggle } from "@/components/mode-toggle"

const publicSansHeading = Public_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
})

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})


export const metadata: Metadata = {
  creator: "Durodola Abolaji Toliat",
  title: "God's Vision School",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        nunitoSans.variable,
        publicSansHeading.variable
      )}
    >
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}
             <ModeToggle />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
