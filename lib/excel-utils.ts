interface Contact {
  name: string
  phone: string
  email: string
}

export function downloadAsCSV(contacts: Contact[], filename = "contacts.csv") {
  // اضافه کردن BOM برای پشتیبانی بهتر از UTF-8 در Excel
  const BOM = "\uFEFF"
  const headers = ["Name", "Phone", "Email"]
  const csvContent =
    BOM +
    [
      headers.join(","),
      ...contacts.map((contact) =>
        [
          `"${(contact.name || "").replace(/"/g, '""')}"`,
          `"${(contact.phone || "").replace(/"/g, '""')}"`,
          `"${(contact.email || "").replace(/"/g, '""')}"`,
        ].join(","),
      ),
    ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}
