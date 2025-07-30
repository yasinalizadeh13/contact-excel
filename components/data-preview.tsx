"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { downloadAsCSV } from "@/lib/excel-utils"

interface Contact {
  name: string
  phone: string
  email: string
}

interface DataPreviewProps {
  contacts: Contact[]
  onNewFile: () => void
}

export function DataPreview({ contacts, onNewFile }: DataPreviewProps) {
  const { t, language } = useLanguage()

  const handleDownload = () => {
    downloadAsCSV(contacts, "contacts.csv")
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${language === "fa" ? "flex-row-reverse" : ""}`}>
          <Users className="w-5 h-5" />
          {t("preview.title")}
        </CardTitle>
        <p className={`text-muted-foreground ${language === "fa" ? "text-right" : "text-left"}`}>
          {t("preview.total")}: {contacts.length}
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border max-h-96 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={language === "fa" ? "text-right" : ""}>{t("preview.name")}</TableHead>
                <TableHead className={language === "fa" ? "text-right" : ""}>{t("preview.phone")}</TableHead>
                <TableHead className={language === "fa" ? "text-right" : ""}>{t("preview.email")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.slice(0, 10).map((contact, index) => (
                <TableRow key={index}>
                  <TableCell className={language === "fa" ? "text-right" : ""}>{contact.name || "-"}</TableCell>
                  <TableCell className={language === "fa" ? "text-right" : ""}>{contact.phone || "-"}</TableCell>
                  <TableCell className={language === "fa" ? "text-right" : ""}>{contact.email || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {contacts.length > 10 && (
          <p className={`text-sm text-muted-foreground mt-2 ${language === "fa" ? "text-right" : "text-left"}`}>
            {language === "fa"
              ? `و ${contacts.length - 10} مخاطب دیگر...`
              : `And ${contacts.length - 10} more contacts...`}
          </p>
        )}

        <div className={`flex gap-4 mt-6 ${language === "fa" ? "flex-row-reverse" : ""}`}>
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            {t("buttons.download")} CSV
          </Button>
          <Button variant="outline" onClick={onNewFile}>
            {t("buttons.newFile")}
          </Button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className={`text-sm text-blue-700 ${language === "fa" ? "text-right" : "text-left"}`}>
            {language === "fa"
              ? "💡 نکته: فایل CSV را می‌توانید در Excel باز کنید و به فرمت xlsx ذخیره کنید."
              : "💡 Tip: You can open the CSV file in Excel and save it as xlsx format."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
