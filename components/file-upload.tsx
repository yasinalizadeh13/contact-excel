"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  loading?: boolean
}

export function FileUpload({ onFileSelect, loading }: FileUploadProps) {
  const { t, language } = useLanguage()
  const [error, setError] = useState<string>("")

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        if (file.name.endsWith(".vcf") || file.name.endsWith(".csv")) {
          setError("")
          onFileSelect(file)
        } else {
          setError(t("upload.error"))
        }
      }
    },
    [onFileSelect, t],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/vcard": [".vcf"],
      "text/csv": [".csv"],
    },
    multiple: false,
  })

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <h2 className={`text-2xl font-bold mb-4 ${language === "fa" ? "text-right" : "text-left"}`}>
          {t("upload.title")}
        </h2>
        <p className={`text-muted-foreground mb-6 ${language === "fa" ? "text-right" : "text-left"}`}>
          {t("upload.subtitle")}
        </p>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          } ${loading ? "pointer-events-none opacity-50" : ""}`}
        >
          <input {...getInputProps()} />

          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-lg">{t("upload.processing")}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Upload className="w-12 h-12 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">{t("upload.dragDrop")}</p>
                <p className="text-sm text-muted-foreground mt-2">{t("upload.supportedFormats")}</p>
              </div>
              <Button type="button">
                <FileText className="w-4 h-4 mr-2" />
                {t("buttons.upload")}
              </Button>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 mt-4 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
