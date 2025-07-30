export const translations = {
  fa: {
    title: "تبدیل مخاطبین به اکسل",
    subtitle: "فایل مخاطبین خود را به راحتی به اکسل تبدیل کنید",
    features: {
      title: "ویژگی‌های اصلی",
      upload: "آپلود آسان فایل",
      convert: "تبدیل خودکار",
      preview: "پیش‌نمایش داده‌ها",
      download: "دانلود سریع",
    },
    upload: {
      title: "آپلود فایل مخاطبین",
      subtitle: "فایل‌های .vcf یا .csv خود را انتخاب کنید",
      dragDrop: "فایل را اینجا بکشید یا کلیک کنید",
      supportedFormats: "فرمت‌های پشتیبانی شده: VCF, CSV",
      processing: "در حال پردازش...",
      error: "خطا در آپلود فایل",
    },
    preview: {
      title: "پیش‌نمایش مخاطبین",
      name: "نام",
      phone: "شماره تلفن",
      email: "ایمیل",
      total: "مجموع مخاطبین",
    },
    download: {
      title: "دانلود فایل اکسل",
      button: "دانلود Excel",
      format: "انتخاب فرمت خروجی",
    },
    privacy: {
      title: "حریم خصوصی و امنیت",
      message: "فایل‌های شما بلافاصله پس از پردازش حذف می‌شوند و هیچ‌گونه اطلاعاتی ذخیره نمی‌شود.",
    },
    buttons: {
      upload: "آپلود فایل",
      convert: "تبدیل به اکسل",
      download: "دانلود",
      newFile: "فایل جدید",
    },
  },
  en: {
    title: "Convert Contacts to Excel",
    subtitle: "Easily convert your contact files to Excel format",
    features: {
      title: "Key Features",
      upload: "Easy File Upload",
      convert: "Auto Conversion",
      preview: "Data Preview",
      download: "Quick Download",
    },
    upload: {
      title: "Upload Contact File",
      subtitle: "Select your .vcf or .csv files",
      dragDrop: "Drag file here or click to upload",
      supportedFormats: "Supported formats: VCF, CSV",
      processing: "Processing...",
      error: "Error uploading file",
    },
    preview: {
      title: "Contact Preview",
      name: "Name",
      phone: "Phone",
      email: "Email",
      total: "Total Contacts",
    },
    download: {
      title: "Download Excel File",
      button: "Download Excel",
      format: "Select output format",
    },
    privacy: {
      title: "Privacy & Security",
      message: "Your files are automatically deleted after processing and no data is stored.",
    },
    buttons: {
      upload: "Upload File",
      convert: "Convert to Excel",
      download: "Download",
      newFile: "New File",
    },
  },
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
