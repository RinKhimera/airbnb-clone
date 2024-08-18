import { SiteHeader } from "@/components/SiteHeader"
// import { EdgeStoreProvider } from "@/lib/edgestore"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rin-Airbnb | Vacation rentals, cabins, beach houses, & more",
  description: "Find an Airbnb for each of your trips",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
