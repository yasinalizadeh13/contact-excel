"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { DataPreview } from "@/components/data-preview"
import { LanguageSelector } from "@/components/language-selector"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Eye, Download } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { processContactFile } from "@/lib/actions"

interface Contact {
  name: string
  phone: string
  email: string
}

export default function HomePage() {
  const { t, language } = useLanguage()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"upload" | "preview">("upload")

  const handleFileSelect = async (file: File) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const processedContacts = await processContactFile(formData)
      setContacts(processedContacts)
      setStep("preview")
    } catch (error) {
      console.error("Error processing file:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewFile = () => {
    setContacts([])
    setStep("upload")
  }

  const features = [
    { icon: Zap, title: t("features.upload"), key: "upload" },
    { icon: Download, title: t("features.convert"), key: "convert" },
    { icon: Eye, title: t("features.preview"), key: "preview" },
    { icon: Download, title: t("features.download"), key: "download" },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${language === "fa" ? "rtl" : "ltr"}`}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className={`flex justify-between items-center ${language === "fa" ? "flex-row-reverse" : ""}`}>
          <div className={language === "fa" ? "text-right" : "text-left"}>
            <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
            <p className="text-gray-600 mt-2">{t("subtitle")}</p>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className={`text-2xl font-bold text-center mb-8 ${language === "fa" ? "text-right" : "text-left"}`}>
          {t("features.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold">{feature.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {step === "upload" ? (
          <FileUpload onFileSelect={handleFileSelect} loading={loading} />
        ) : (
          <DataPreview contacts={contacts} onNewFile={handleNewFile} />
        )}
      </main>

      {/* Privacy Section */}
      <section className="container mx-auto px-4 py-12">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className={`flex items-center gap-4 ${language === "fa" ? "flex-row-reverse" : ""}`}>
              <Shield className="w-8 h-8 text-green-600" />
              <div className={language === "fa" ? "text-right" : "text-left"}>
                <h3 className="text-lg font-semibold text-green-800 mb-2">{t("privacy.title")}</h3>
                <p className="text-green-700">{t("privacy.message")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            {language === "fa"
              ? "© ۲۰۲۴ تبدیل مخاطبین به اکسل. تمامی حقوق محفوظ است."
              : "© 2024 Contacts to Excel Converter. All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  )
}
