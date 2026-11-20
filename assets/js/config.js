/* =========================================================
   THE ELF SHOP — STORE SETTINGS
   Edit this file to change phone numbers, email, pixel, etc.
   ========================================================= */
window.ELF_CONFIG = {
  storeName: "The Elf Shop",
  since: 2013,

  // WhatsApp number that receives ORDERS (international format, digits only)
  whatsappOrders: "201144246362",
  whatsappOrdersDisplay: "+20 114 424 6362",

  // InstaPay transfer number + WhatsApp number that receives PAYMENT SCREENSHOTS
  instapayNumber: "01015044457",
  whatsappPayments: "201015044457",
  whatsappPaymentsDisplay: "+20 101 504 4457",

  // Email for orders, inquiries and newsletter sign-ups
  email: "tes.korea2013@gmail.com",

  // Social media
  social: {
    facebook: "https://www.facebook.com/share/1AG4K3YahV/",
    instagram: "https://www.instagram.com/the_elf_shop",
    tiktok: "https://www.tiktok.com/@theelfshop4"
  },

  // Currency label per language
  currency: { ar: "ج.م", en: "EGP", ko: "EGP" },

  // Shipping: set `flat` to a number (e.g. 60) to charge a fixed fee.
  // Leave as null to show "confirmed on WhatsApp" instead of a number.
  shipping: { flat: null, freeOver: null },

  /* ---------- FACEBOOK / META ADS ----------
     Paste your Meta Pixel ID (Events Manager → Data sources → Pixel).
     When set, the site automatically tracks: PageView, ViewContent,
     AddToCart, InitiateCheckout, Purchase, Lead, Contact.
     Use these events to build Custom Audiences and optimize ad campaigns. */
  metaPixelId: "",

  /* ---------- EMAIL DELIVERY (orders + leads) ----------
     Uses FormSubmit (free, no backend). The FIRST submission sends an
     activation email to the address below — click "Activate" once.
     After activation FormSubmit gives you a random alias string; you can
     paste it here instead of the plain email to hide the address. */
  formEndpoint: "https://formsubmit.co/ajax/tes.korea2013@gmail.com",

  // Newsletter pop-up (shown once per visitor after a delay)
  leadPopup: { enabled: true, delaySeconds: 25 }
};
