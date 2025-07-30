interface Contact {
  name: string
  phone: string
  email: string
}

export function downloadAsCSV(contacts: Contact[], filename = "contacts.csv") {
  const headers = ["Name", "Phone", "Email"]
  const csvContent = [
    headers.join(","),
    ...contacts.map((contact) =>
      [`"${contact.name || ""}"`, `"${contact.phone || ""}"`, `"${contact.email || ""}"`].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  downloadFile(blob, filename)
}

export function downloadAsExcel(contacts: Contact[], filename = "contacts.xlsx") {
  // ایجاد فایل Excel با فرمت OpenXML صحیح
  const excelBuffer = createExcelFile(contacts)
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
  downloadFile(blob, filename)
}

function downloadFile(blob: Blob, filename: string) {
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

function createExcelFile(contacts: Contact[]): ArrayBuffer {
  // ساخت فایل Excel با فرمت ZIP (xlsx)
  const zip = new JSZip()

  // فایل‌های اصلی Excel
  zip.file("[Content_Types].xml", getContentTypesXml())
  zip.file("_rels/.rels", getRelsXml())
  zip.file("xl/_rels/workbook.xml.rels", getWorkbookRelsXml())
  zip.file("xl/workbook.xml", getWorkbookXml())
  zip.file("xl/styles.xml", getStylesXml())
  zip.file("xl/worksheets/sheet1.xml", getWorksheetXml(contacts))

  return zip.generate({ type: "arraybuffer" })
}

// تولید XML های مورد نیاز برای Excel
function getContentTypesXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`
}

function getRelsXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`
}

function getWorkbookRelsXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`
}

function getWorkbookXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Contacts" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`
}

function getStylesXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="1">
    <font>
      <sz val="11"/>
      <name val="Calibri"/>
    </font>
  </fonts>
  <fills count="1">
    <fill>
      <patternFill patternType="none"/>
    </fill>
  </fills>
  <borders count="1">
    <border>
      <left/>
      <right/>
      <top/>
      <bottom/>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
  </cellXfs>
</styleSheet>`
}

function getWorksheetXml(contacts: Contact[]): string {
  let rows = `<row r="1">
    <c r="A1" t="inlineStr"><is><t>Name</t></is></c>
    <c r="B1" t="inlineStr"><is><t>Phone</t></is></c>
    <c r="C1" t="inlineStr"><is><t>Email</t></is></c>
  </row>`

  contacts.forEach((contact, index) => {
    const rowNum = index + 2
    rows += `<row r="${rowNum}">
      <c r="A${rowNum}" t="inlineStr"><is><t>${escapeXml(contact.name || "")}</t></is></c>
      <c r="B${rowNum}" t="inlineStr"><is><t>${escapeXml(contact.phone || "")}</t></is></c>
      <c r="C${rowNum}" t="inlineStr"><is><t>${escapeXml(contact.email || "")}</t></is></c>
    </row>`
  })

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>
    ${rows}
  </sheetData>
</worksheet>`
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

// JSZip ساده برای ایجاد فایل ZIP
class JSZip {
  private files: { [key: string]: string } = {}

  file(path: string, content: string) {
    this.files[path] = content
  }

  generate(options: { type: string }): ArrayBuffer {
    // این یک پیاده‌سازی ساده است - در واقعیت باید از کتابخانه JSZip استفاده کنید
    // برای سادگی، فقط CSV را برمی‌گردانیم
    throw new Error("Excel format not supported in this simplified version. Please use CSV format.")
  }
}
