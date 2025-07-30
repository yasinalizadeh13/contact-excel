"use server"

interface Contact {
  name: string
  phone: string
  email: string
}

export async function processContactFile(formData: FormData): Promise<Contact[]> {
  const file = formData.get("file") as File

  if (!file) {
    throw new Error("No file provided")
  }

  const content = await file.text()
  const contacts: Contact[] = []

  if (file.name.endsWith(".vcf")) {
    // Parse VCF format
    const vcards = content.split("BEGIN:VCARD")

    for (const vcard of vcards) {
      if (vcard.trim()) {
        const contact: Contact = { name: "", phone: "", email: "" }

        const nameMatch = vcard.match(/FN:(.*)/)
        if (nameMatch) contact.name = nameMatch[1].trim()

        const phoneMatch = vcard.match(/TEL[^:]*:(.*)/)
        if (phoneMatch) contact.phone = phoneMatch[1].trim()

        const emailMatch = vcard.match(/EMAIL[^:]*:(.*)/)
        if (emailMatch) contact.email = emailMatch[1].trim()

        if (contact.name || contact.phone || contact.email) {
          contacts.push(contact)
        }
      }
    }
  } else if (file.name.endsWith(".csv")) {
    // Parse CSV format
    const lines = content.split("\n")
    const headers = lines[0].toLowerCase().split(",")

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",")
      if (values.length >= headers.length) {
        const contact: Contact = { name: "", phone: "", email: "" }

        headers.forEach((header, index) => {
          const value = values[index]?.trim().replace(/"/g, "")
          if (header.includes("name") || header.includes("nm")) {
            contact.name = value
          } else if (header.includes("phone") || header.includes("tel") || header.includes("mobile")) {
            contact.phone = value
          } else if (header.includes("email") || header.includes("mail")) {
            contact.email = value
          }
        })

        if (contact.name || contact.phone || contact.email) {
          contacts.push(contact)
        }
      }
    }
  }

  return contacts
}
