import type React from "react"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <title>تبدیل مخاطبین به اکسل</title>
        <meta name="description" content="تبدیل آسان فایل‌های مخاطبین به فرمت اکسل" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
