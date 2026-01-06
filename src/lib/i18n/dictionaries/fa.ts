import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  nav: {
    home: "خانه",
    services: "خدمات",
    calculator: "محاسبه هزینه",
    request: "درخواست حمل",
    updates: "به‌روزرسانی‌ها",
    brands: "برندها",
    blog: "بینش‌ها",
    contact: "تماس",
    dashboard: "داشبورد",
    admin: "مدیریت",
  },
  common: {
    ctaPrimary: "شروع ارسال",
    ctaSecondary: "مشاوره لجستیک",
    learnMore: "بیشتر بدانید",
    viewAll: "مشاهده همه",
    getStarted: "شروع کنید",
  },
  home: {
    title: "لجستیک جهانی با سرعت و شفافیت.",
    subtitle:
      "حمل چین به سراسر دنیا، دید کامل CRM و عملیات آماده رشد.",
    highlights: [
      {
        title: "ردیابی کامل",
        description: "خط زمانی وضعیت، اسناد و اعلان‌های فعال.",
      },
      {
        title: "تحلیل CRM",
        description: "بینش رفتاری، سرنخ‌ها و تحلیل تبدیل.",
      },
      {
        title: "آماده برای سازمان",
        description: "ایمن، سازگار و آماده خدمات آینده.",
      },
    ],
    statLabel: "مرسوله‌های مدیریت‌شده ماهانه",
  },
  services: {
    title: "خدمات لجستیک",
    subtitle: "مسیرهای منعطف، قیمت شفاف و پشتیبانی قابل اعتماد.",
    cards: [
      {
        title: "حمل هوایی",
        description: "ارسال سریع با زمان‌بندی قابل پیش‌بینی.",
      },
      {
        title: "حمل دریایی",
        description: "کانتینر کامل یا تجمیعی با نرخ رقابتی.",
      },
      {
        title: "گمرک و تطابق",
        description: "بررسی اسناد و آمادگی مقرراتی.",
      },
    ],
  },
  calculator: {
    title: "محاسبه هزینه حمل",
    subtitle: "برآورد بر اساس وزن، حجم و بیمه اختیاری.",
    fields: {
      weight: "وزن (کیلوگرم)",
      volume: "حجم (cbm)",
      origin: "مبدا",
      destination: "مقصد",
      insurance: "بیمه",
    },
    estimateLabel: "بازه قیمت پیشنهادی",
  },
  request: {
    title: "درخواست حمل",
    subtitle: "جزئیات بار را ارسال کنید تا پیشنهاد اختصاصی دریافت کنید.",
    fields: {
      name: "نام و نام خانوادگی",
      email: "ایمیل کاری",
      company: "شرکت",
      cargo: "نوع کالا",
      message: "جزئیات محموله",
    },
    submit: "ارسال درخواست",
  },
  updates: {
    title: "به‌روزرسانی‌های روزانه لجستیک",
    subtitle: "عملکرد بنادر، ظرفیت و مسیرهای کلیدی.",
    items: [
      {
        title: "شنژن به روتردام",
        description: "میانگین ترانزیت ۲۱ تا ۲۴ روز ثابت شد.",
        date: "امروز",
      },
      {
        title: "ظرفیت حمل هوایی",
        description: "مسیرهای اولویت‌دار برای الکترونیک فعال شد.",
        date: "دیروز",
      },
      {
        title: "راهنمای گمرک",
        description: "الزامات جدید برای صادرات نساجی.",
        date: "۲ روز پیش",
      },
    ],
  },
  brands: {
    title: "همکار برندهای جهانی",
    subtitle: "شراکت با خرده‌فروشی، تولید و فناوری.",
    items: ["هانزو ترید", "میرا هوم", "نوواتک", "اطلس ساپلای", "برایت‌لاین"],
  },
  blog: {
    title: "اخبار و بینش‌ها",
    subtitle: "محتوای سئو برای مدیران زنجیره تامین.",
    posts: [
      {
        title: "کاهش زمان توقف در بندر مبدا",
        excerpt: "تاکتیک‌های اسناد و پیش‌اظهاری.",
        tag: "عملیات",
      },
      {
        title: "درک قیمت‌گذاری حجمی",
        excerpt: "انتخاب روش حمل با اطمینان بیشتر.",
        tag: "قیمت‌گذاری",
      },
      {
        title: "مقیاس‌پذیری تامین از چین",
        excerpt: "آنچه تیم‌های متوسط در ۲۰۲۶ باید بدانند.",
        tag: "استراتژی",
      },
    ],
  },
  contact: {
    title: "ارتباط با تیم",
    subtitle: "پشتیبانی چندکاناله برای ارسال‌های فوری و برنامه‌ریزی‌شده.",
    channels: [
      { label: "ایمیل", value: "ops@samlogistics.com" },
      { label: "تلفن", value: "+86 20 0000 0000" },
      { label: "ویچت", value: "SAM-Logistics" },
    ],
  },
  dashboard: {
    title: "داشبورد مشتری",
    subtitle: "ردیابی، مدیریت اسناد و پیام با پشتیبانی.",
    cards: [
      {
        title: "مرسوله‌های فعال",
        value: "۰۸",
        description: "در حال حمل یا پردازش",
      },
      {
        title: "اسناد معلق",
        value: "۰۳",
        description: "در انتظار بارگذاری مشتری",
      },
      {
        title: "پاسخ‌های پشتیبانی",
        value: "۰۲",
        description: "پاسخ‌های خوانده نشده",
      },
    ],
  },
  admin: {
    title: "مرکز مدیریت",
    subtitle: "نظارت بر CRM، مرسوله‌ها و عملکرد محتوا.",
    cards: [
      {
        title: "سرنخ‌های جدید",
        value: "۲۴",
        description: "۷ روز اخیر",
      },
      {
        title: "پایپ‌لاین درآمد",
        value: "۴۲۰K$",
        description: "فرصت‌های باز",
      },
      {
        title: "گفتگوهای فعال",
        value: "۱۸",
        description: "در انتظار پاسخ اپراتور",
      },
    ],
  },
};
