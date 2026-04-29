import { Navbar } from "@/components/ui/navbar"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Apex IA",
  description: "Assistant IA avancé pour automatiser, analyser et optimiser vos opérations."
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
   <html lang="fr" className="dark">

      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}

