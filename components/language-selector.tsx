"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4" />
      <Button variant={language === "fa" ? "default" : "outline"} size="sm" onClick={() => setLanguage("fa")}>
        فارسی
      </Button>
      <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
        English
      </Button>
    </div>
  )
}
