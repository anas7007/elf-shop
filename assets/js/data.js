/* =========================================================
   THE ELF SHOP — STORE DATA
   ---------------------------------------------------------
   This file holds everything the admin panel manages:
   settings, colors, categories, products, reviews and
   text changes. Edit it from  /admin.html  (recommended).
   ========================================================= */
window.ELF_DATA = {
  "version": 1,
  "updatedAt": "2026-11-27T21:53:36.939Z",
  "settings": {
    "storeName": "The Elf Shop",
    "since": 2013,
    "whatsappOrders": "201144246362",
    "whatsappOrdersDisplay": "+20 114 424 6362",
    "instapayNumber": "01015044457",
    "whatsappPayments": "201015044457",
    "whatsappPaymentsDisplay": "+20 101 504 4457",
    "email": "tes.korea2013@gmail.com",
    "social": {
      "facebook": "https://www.facebook.com/share/1AG4K3YahV/",
      "instagram": "https://www.instagram.com/the_elf_shop",
      "tiktok": "https://www.tiktok.com/@theelfshop4"
    },
    "currency": {
      "ar": "ج.م",
      "en": "EGP",
      "ko": "EGP"
    },
    "shipping": {
      "v": 2,
      "defaultFee": 90,
      "rates": {
        "Cairo": 75,
        "Alexandria": 75
      },
      "freeAbove": 2000
    },
    "metaPixelId": "",
    "formEndpoint": "https://formsubmit.co/ajax/tes.korea2013@gmail.com",
    "leadPopup": {
      "enabled": true,
      "delaySeconds": 25
    },
    "heroProducts": [
      "",
      "",
      ""
    ]
  },
  "theme": {},
  "categories": [
    {
      "id": "skincare",
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "K-BEAUTY"
      },
      "name": {
        "ar": "العناية بالبشرة",
        "en": "Skin Care",
        "ko": "스킨케어"
      },
      "desc": {
        "ar": "سيرومات، كريمات وواقي شمس",
        "en": "Serums, creams & sunscreen",
        "ko": "세럼, 크림, 선크림"
      }
    },
    {
      "id": "sheetmask",
      "art": {
        "type": "pouch",
        "c1": "#E3F2FF",
        "c2": "#2B6BD8",
        "label": "MASK"
      },
      "name": {
        "ar": "الماسكات الورقية",
        "en": "Sheet Masks",
        "ko": "시트 마스크"
      },
      "desc": {
        "ar": "ترطيب ونضارة في 20 دقيقة",
        "en": "Glow & hydration in 20 min",
        "ko": "20분 만에 촉촉한 광채"
      }
    },
    {
      "id": "kitchen",
      "art": {
        "type": "ramen",
        "c1": "#FFE9E3",
        "c2": "#D7261E",
        "label": "K-FOOD"
      },
      "name": {
        "ar": "المطبخ الكوري",
        "en": "Korean Kitchen",
        "ko": "한국 식품"
      },
      "desc": {
        "ar": "رامن، سناكس ومشروبات",
        "en": "Ramen, snacks & drinks",
        "ko": "라면, 과자, 음료"
      }
    },
    {
      "id": "kpop",
      "art": {
        "type": "lightstick",
        "c1": "#EEF0FF",
        "c2": "#5B3FD8",
        "label": ""
      },
      "name": {
        "ar": "منتجات الكيبوب",
        "en": "K-Pop Products",
        "ko": "K-팝 굿즈"
      },
      "desc": {
        "ar": "ألبومات، فوتوكارد ولايت ستيك",
        "en": "Albums, photocards & lightsticks",
        "ko": "앨범, 포토카드, 응원봉"
      }
    },
    {
      "id": "culture",
      "art": {
        "type": "fan",
        "c1": "#FFF3E8",
        "c2": "#1E2BD6",
        "label": ""
      },
      "name": {
        "ar": "منتجات الثقافة",
        "en": "Culture Products",
        "ko": "문화 상품"
      },
      "desc": {
        "ar": "هدايا وتحف من التراث الكوري",
        "en": "Gifts inspired by Korean heritage",
        "ko": "한국 전통에서 영감 받은 선물"
      }
    },
    {
      "id": "accessories",
      "art": {
        "type": "clip",
        "c1": "#F5F6FF",
        "c2": "#C9A44C",
        "label": ""
      },
      "name": {
        "ar": "إكسسوارات",
        "en": "Accessories",
        "ko": "액세서리"
      },
      "desc": {
        "ar": "مشابك، ميداليات وأكثر",
        "en": "Clips, keychains & more",
        "ko": "헤어클립, 키링 등"
      }
    }
  ],
  "products": [
    {
      "id": "hanji-fan",
      "cat": "culture",
      "price": 330,
      "tags": [
        "best"
      ],
      "size": "35 cm",
      "images": [
        "assets/products/hanji-fan-mwzcs47m0.jpg",
        "assets/products/hanji-fan-mwzcs47m1.jpg"
      ],
      "art": {
        "type": "fan",
        "c1": "#FFF3E8",
        "c2": "#C0392B",
        "label": ""
      },
      "name": {
        "ar": "مروحة يد كورية تقليدية",
        "en": "Traditional Korean Hand Fan",
        "ko": "전통 한지 부채"
      },
      "desc": {
        "ar": "مروحة يد مصنوعة من ورق الهانجي التقليدي بنقشة التايغوك الكورية — هدية أنيقة وقطعة ديكور مميزة.",
        "en": "A hand fan made of traditional hanji paper with the Korean taegeuk pattern — an elegant gift and a unique décor piece.",
        "ko": "전통 한지와 태극 문양으로 만든 부채 — 품격 있는 선물이자 특별한 인테리어 소품."
      },
      "usage": {
        "ar": "للاستخدام أو للعرض كديكور.",
        "en": "Use it or display it as décor.",
        "ko": "사용하거나 장식용으로 진열하세요."
      }
    },
    {
      "id": "retinoid-exosome-pore-lifting-shot-x2-dermafirm",
      "cat": "skincare",
      "price": 450,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "75",
      "hidden": false,
      "images": [
        "assets/products/retinoid-exosome-pore-lifting-shot-x2-dermafirm-mwzcyvqt0.jpg",
        "assets/products/retinoid-exosome-pore-lifting-shot-x2-dermafirm-mwzcyvqt1.jpg",
        "assets/products/retinoid-exosome-pore-lifting-shot-x2-dermafirm-mwzcyvqt2.jpg",
        "assets/products/retinoid-exosome-pore-lifting-shot-x2-dermafirm-mwzcyvqt3.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RETINOID"
      },
      "name": {
        "ar": "إكسوسوم ريتينويد لرفع المسام x2 dermafirm",
        "en": "retinoid exosome pore lifting shot x2 dermafirm",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "pdrn-exosome-glow-plumping-shot-x2-dermafirm",
      "cat": "skincare",
      "price": 450,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "75",
      "hidden": false,
      "images": [
        "assets/products/pdrn-exosome-glow-plumping-shot-x2-dermafirm-mwzddzvi0.jpg",
        "assets/products/pdrn-exosome-glow-plumping-shot-x2-dermafirm-mwzddzvi1.jpg",
        "assets/products/pdrn-exosome-glow-plumping-shot-x2-dermafirm-mwzddzvi2.jpg",
        "assets/products/pdrn-exosome-glow-plumping-shot-x2-dermafirm-mwzddzvi3.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "PDRN"
      },
      "name": {
        "ar": "إكسوسوم جلو بدرن لتحفيز اللمعان x2 dermafirm",
        "en": "pdrn exosome glow plumping shot x2 dermafirm",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "small-molecule-collagen-wrinkle-ampoule-cleaderm",
      "cat": "skincare",
      "price": 300,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "55",
      "hidden": false,
      "images": [
        "assets/products/small-molecule-collagen-wrinkle-ampoule-cleaderm-mwzdjxbg0.jpg",
        "assets/products/small-molecule-collagen-wrinkle-ampoule-cleaderm-mwzdjxbg1.jpg",
        "assets/products/small-molecule-collagen-wrinkle-ampoule-cleaderm-mwzdjxbg2.jpg",
        "assets/products/small-molecule-collagen-wrinkle-ampoule-cleaderm-mwzdjxbg3.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "SMALL"
      },
      "name": {
        "ar": "أمبول كولاجين جزيئات صغيرة لمكافحة التجاعيد cleaderm",
        "en": "small molecule collagen wrinkle ampoule cleaderm",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "silk-treatment-re-noia",
      "cat": "skincare",
      "price": 700,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "200",
      "hidden": false,
      "images": [
        "assets/products/silk-treatment-re-noia-mwze1vzo0.jpg",
        "assets/products/silk-treatment-re-noia-mwze1vzo1.jpg",
        "assets/products/silk-treatment-re-noia-mwze1vzo2.jpg",
        "assets/products/silk-treatment-re-noia-mwze1vzo3.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "SILK"
      },
      "name": {
        "ar": "علاج الحرير re noia",
        "en": "silk treatment re noia",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "niatamin-c-brightening-body-cream-on-the-body",
      "cat": "skincare",
      "price": 850,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "230",
      "hidden": false,
      "images": [
        "assets/products/niatamin-c-brightening-body-cream-on-the-body-mwze5wfb0.jpg",
        "assets/products/niatamin-c-brightening-body-cream-on-the-body-mwze5wfb1.jpg",
        "assets/products/niatamin-c-brightening-body-cream-on-the-body-mwze5wfb2.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "NIATAMIN"
      },
      "name": {
        "ar": "كريم مرطب نياتامين سي لمشرق البشرة على الجسم",
        "en": "niatamin c brightening body cream on the body",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "pdrn-tone-on-jelly-essence-vt",
      "cat": "skincare",
      "price": 650,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "150",
      "hidden": false,
      "images": [
        "assets/products/pdrn-tone-on-jelly-essence-vt-mwze8lum0.jpg",
        "assets/products/pdrn-tone-on-jelly-essence-vt-mwze8lum1.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "PDRN"
      },
      "name": {
        "ar": "إيسنس جل لون بدرن vt",
        "en": "pdrn tone on jelly essence vt",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "via-c-cream-boncept",
      "cat": "skincare",
      "price": 450,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "70",
      "hidden": false,
      "images": [
        "assets/products/via-c-cream-boncept-mwzeckd20.jpg",
        "assets/products/via-c-cream-boncept-mwzeckd21.jpg",
        "assets/products/via-c-cream-boncept-mwzeckd22.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "VIA"
      },
      "name": {
        "ar": "كريم فيا سي boncept",
        "en": "via c cream boncept",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "age-renew-eye-cream-wrinkle-ahc",
      "cat": "skincare",
      "price": 450,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "50",
      "hidden": false,
      "images": [
        "assets/products/age-renew-eye-cream-wrinkle-ahc-mwzegyrg0.jpg",
        "assets/products/age-renew-eye-cream-wrinkle-ahc-mwzegyrg1.jpg",
        "assets/products/age-renew-eye-cream-wrinkle-ahc-mwzegyrg2.jpg",
        "assets/products/age-renew-eye-cream-wrinkle-ahc-mwzegyrg3.jpg",
        "assets/products/age-renew-eye-cream-wrinkle-ahc-mwzegyrg4.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "AGE"
      },
      "name": {
        "ar": "كريم عين تجديد العمر لمكافحة التجاعيد ahc",
        "en": "age renew eye cream wrinkle ahc",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "extra-super-9-blackhead-care-solution-medipeel",
      "cat": "skincare",
      "price": 350,
      "oldPrice": null,
      "tags": [
        "best"
      ],
      "size": "70",
      "hidden": false,
      "images": [
        "assets/products/extra-super-9-blackhead-care-solution-medipeel-mwzen18f0.jpg",
        "assets/products/extra-super-9-blackhead-care-solution-medipeel-mwzen18f1.jpg",
        "assets/products/extra-super-9-blackhead-care-solution-medipeel-mwzen18f2.jpg",
        "assets/products/extra-super-9-blackhead-care-solution-medipeel-mwzen18f3.jpg",
        "assets/products/extra-super-9-blackhead-care-solution-medipeel-mwzen18f4.jpg",
        "assets/products/extra-super-9-blackhead-care-solution-medipeel-mwzen18f5.jpg",
        "assets/products/extra-super-9-blackhead-care-solution-medipeel-mwzen18f6.jpg",
        "assets/products/extra-super-9-blackhead-care-solution-medipeel-mwzen18f7.jpg",
        "assets/products/extra-super-9-blackhead-care-solution-medipeel-mwzen18f8.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "EXTRA"
      },
      "name": {
        "ar": "مصل رعاية الرؤوس السوداء سوبر 9 medipeel",
        "en": "extra super 9 blackhead care solution medipeel",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "super-aqua-sun-cream-re-cipe-sun-moon-lab",
      "cat": "skincare",
      "price": 500,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "90",
      "hidden": false,
      "images": [
        "assets/products/super-aqua-sun-cream-re-cipe-sun-moon-lab-mwzeqxsx0.jpg",
        "assets/products/super-aqua-sun-cream-re-cipe-sun-moon-lab-mwzeqxsx1.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "SUPER"
      },
      "name": {
        "ar": "كريم واقي شمس سوبر أكوا re cipe sun moon lab",
        "en": "super aqua sun cream re cipe sun moon lab",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "clear-hyal-dewy-glow-tinted-cream-the-lab-by-blanc-doux",
      "cat": "skincare",
      "price": 700,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "60",
      "hidden": false,
      "images": [
        "assets/products/clear-hyal-dewy-glow-tinted-cream-the-lab-by-blanc-doux-mwzev18e0.jpg",
        "assets/products/clear-hyal-dewy-glow-tinted-cream-the-lab-by-blanc-doux-mwzev18e1.jpg",
        "assets/products/clear-hyal-dewy-glow-tinted-cream-the-lab-by-blanc-doux-mwzev18e2.jpg",
        "assets/products/clear-hyal-dewy-glow-tinted-cream-the-lab-by-blanc-doux-mwzev18e3.jpg",
        "assets/products/clear-hyal-dewy-glow-tinted-cream-the-lab-by-blanc-doux-mwzev18e4.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "CLEAR"
      },
      "name": {
        "ar": "كريم مرطب لمعان حيوى واضح the lab by blanc doux",
        "en": "clear hyal dewy glow tinted cream the lab by blanc doux",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "spot-calming-gel-bye-od-td-copy",
      "cat": "skincare",
      "price": 350,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [
        "assets/products/spot-calming-gel-bye-od-td-copy-mwzez1l20.jpg",
        "assets/products/spot-calming-gel-bye-od-td-copy-mwzez1l21.jpg",
        "assets/products/spot-calming-gel-bye-od-td-copy-mwzez1l22.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "SPOT"
      },
      "name": {
        "ar": "جيل تهدئة البقع bye od td",
        "en": "spot calming gel bye od td",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "watermelon-hand-cream-the-face-shop",
      "cat": "skincare",
      "price": 300,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "55",
      "hidden": false,
      "images": [
        "assets/products/watermelon-hand-cream-the-face-shop-mwzf71zm0.jpg",
        "assets/products/watermelon-hand-cream-the-face-shop-mwzf71zm1.jpg",
        "assets/products/watermelon-hand-cream-the-face-shop-mwzf71zm2.jpg",
        "assets/products/watermelon-hand-cream-the-face-shop-mwzf71zm3.jpg",
        "assets/products/watermelon-hand-cream-the-face-shop-mwzf71zm4.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "WATERMELON"
      },
      "name": {
        "ar": "كريم مرطب يد بالبطيخ the face shop",
        "en": "watermelon hand cream the face shop",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "apple-hand-cream-the-face-shop",
      "cat": "skincare",
      "price": 300,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "55",
      "hidden": false,
      "images": [
        "assets/products/apple-hand-cream-the-face-shop-mwzfanm90.jpg",
        "assets/products/apple-hand-cream-the-face-shop-mwzfanm91.jpg",
        "assets/products/apple-hand-cream-the-face-shop-mwzfanm92.jpg",
        "assets/products/apple-hand-cream-the-face-shop-mwzfanm93.jpg",
        "assets/products/apple-hand-cream-the-face-shop-mwzfanm94.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "APPLE"
      },
      "name": {
        "ar": "كريم مرطب يد بالتفاح the face shop",
        "en": "apple hand cream the face shop",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "dr-cpu-whitening-vital-booster-ampoule",
      "cat": "skincare",
      "price": 450,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "70",
      "hidden": false,
      "images": [
        "assets/products/dr-cpu-whitening-vital-booster-ampoule-mwzfnuqc0.jpg",
        "assets/products/dr-cpu-whitening-vital-booster-ampoule-mwzfnuqc1.jpg",
        "assets/products/dr-cpu-whitening-vital-booster-ampoule-mwzfnuqc2.jpg",
        "assets/products/dr-cpu-whitening-vital-booster-ampoule-mwzfnuqc3.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "DR.CPU"
      },
      "name": {
        "ar": "أمبول مبيض dr.cpu whitening vital booster",
        "en": "dr.cpu whitening vital booster ampoule",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "dr-cpu-norishing-active-booster-ampoule",
      "cat": "skincare",
      "price": 450,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "70",
      "hidden": false,
      "images": [
        "assets/products/dr-cpu-norishing-active-booster-ampoule-mwzfmhea0.jpg",
        "assets/products/dr-cpu-norishing-active-booster-ampoule-mwzfmhea1.jpg",
        "assets/products/dr-cpu-norishing-active-booster-ampoule-mwzfmhea2.jpg",
        "assets/products/dr-cpu-norishing-active-booster-ampoule-mwzfmhea3.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "DR.CPU"
      },
      "name": {
        "ar": "أمبول مغذي dr.cpu norishing active booster",
        "en": "dr.cpu norishing active booster ampoule",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "dr-cpu-hydrating-hydro-booster-ampoule",
      "cat": "skincare",
      "price": 450,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "70",
      "hidden": false,
      "images": [
        "assets/products/dr-cpu-hydrating-hydro-booster-ampoule-mwzfp8g60.jpg",
        "assets/products/dr-cpu-hydrating-hydro-booster-ampoule-mwzfp8g61.jpg",
        "assets/products/dr-cpu-hydrating-hydro-booster-ampoule-mwzfp8g62.jpg",
        "assets/products/dr-cpu-hydrating-hydro-booster-ampoule-mwzfp8g63.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "DR.CPU"
      },
      "name": {
        "ar": "أمبول مرطب dr.cpu hydrating hydro booster",
        "en": "dr.cpu hydrating hydro booster ampoule",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "lip-mask-berry-as-us",
      "cat": "skincare",
      "price": 400,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "80",
      "hidden": false,
      "images": [
        "assets/products/lip-mask-berry-as-us-mwzfubxs0.jpg",
        "assets/products/lip-mask-berry-as-us-mwzfubxs1.jpg",
        "assets/products/lip-mask-berry-as-us-mwzfubxs2.jpg",
        "assets/products/lip-mask-berry-as-us-mwzfubxs3.jpg",
        "assets/products/lip-mask-berry-as-us-mwzfubxs4.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "LIP"
      },
      "name": {
        "ar": "ماسك شفاه بيري as us",
        "en": "lip mask berry as us",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "personal-cushion-blusher-drar-coral-eipkn",
      "cat": "skincare",
      "price": 300,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "40",
      "hidden": false,
      "images": [
        "assets/products/personal-cushion-blusher-drar-coral-eipkn-mwzfyaxy0.jpg",
        "assets/products/personal-cushion-blusher-drar-coral-eipkn-mwzfyaxy1.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "PERSONAL"
      },
      "name": {
        "ar": "كوشن خفيف للخدين drar coral eipkn",
        "en": "personal cushion blusher drar coral eipkn",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "personal-wearing-pocket-foun-cushion-no-21-ipkn",
      "cat": "skincare",
      "price": 300,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "40",
      "hidden": false,
      "images": [
        "assets/products/personal-wearing-pocket-foun-cushion-no-21-ipkn-mwzg3k5k0.jpg",
        "assets/products/personal-wearing-pocket-foun-cushion-no-21-ipkn-mwzg3k5k1.jpg",
        "assets/products/personal-wearing-pocket-foun-cushion-no-21-ipkn-mwzg3k5k2.jpg",
        "assets/products/personal-wearing-pocket-foun-cushion-no-21-ipkn-mwzg3k5k3.jpg",
        "assets/products/personal-wearing-pocket-foun-cushion-no-21-ipkn-mwzg3k5k4.jpg",
        "assets/products/personal-wearing-pocket-foun-cushion-no-21-ipkn-mwzg3k5k5.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "PERSONAL"
      },
      "name": {
        "ar": "حقيبة حمرة خفيفة للوجه رقم 21 ipkn",
        "en": "personal wearing pocket foun cushion no 21 ipkn",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "melanonx-dark-spot-cream-medipeel",
      "cat": "skincare",
      "price": 450,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "70",
      "hidden": false,
      "images": [
        "assets/products/melanonx-dark-spot-cream-medipeel-mwzg92n90.jpg",
        "assets/products/melanonx-dark-spot-cream-medipeel-mwzg92n91.jpg",
        "assets/products/melanonx-dark-spot-cream-medipeel-mwzg92n92.jpg",
        "assets/products/melanonx-dark-spot-cream-medipeel-mwzg92n93.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "MELANONX"
      },
      "name": {
        "ar": "كريم مرطب melanonx لمكان الدكنار",
        "en": "melanonx dark spot cream medipeel",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "reedle-shot-essence-lip-plumper-no-2-vt",
      "cat": "skincare",
      "price": 350,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [
        "assets/products/reedle-shot-essence-lip-plumper-no-2-vt-mwzgbh3p0.jpg",
        "assets/products/reedle-shot-essence-lip-plumper-no-2-vt-mwzgbh3p1.jpg",
        "assets/products/reedle-shot-essence-lip-plumper-no-2-vt-mwzgbh3p2.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "REEDLE"
      },
      "name": {
        "ar": "إيسنس ريدل شوت لمفاجئة الشفاه رقم 2 vt",
        "en": "reedle shot essence lip plumper no 2 vt",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "boncept-water-veil-tint-05-vanilla-water",
      "cat": "skincare",
      "price": 250,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [
        "assets/products/boncept-water-veil-tint-05-vanilla-water-mwzgflj90.jpg",
        "assets/products/boncept-water-veil-tint-05-vanilla-water-mwzgflj91.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "BONCEPT"
      },
      "name": {
        "ar": "بونسبت فيل ماء تينت 05 فانيليا ماء",
        "en": "boncept water veil tint 05 vanilla water",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "boncept-water-veil-tint-06-strawberry-water",
      "cat": "skincare",
      "price": 250,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [
        "assets/products/boncept-water-veil-tint-06-strawberry-water-mwzgj00b0.jpg",
        "assets/products/boncept-water-veil-tint-06-strawberry-water-mwzgj00b1.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "BONCEPT"
      },
      "name": {
        "ar": "بونسبت فيل ماء تينت 06 فريز ماء",
        "en": "boncept water veil tint 06 strawberry water",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "boncept-chiffon-bonding-tint-02-pink-chiffon",
      "cat": "skincare",
      "price": 250,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [
        "assets/products/boncept-chiffon-bonding-tint-02-pink-chiffon-mwzgmglw0.jpg",
        "assets/products/boncept-chiffon-bonding-tint-02-pink-chiffon-mwzgmglw1.jpg",
        "assets/products/boncept-chiffon-bonding-tint-02-pink-chiffon-mwzgmglw2.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "BONCEPT"
      },
      "name": {
        "ar": "بونسبت شيفون تينت 02 شيفون وردي",
        "en": "boncept chiffon bonding tint 02 pink chiffon",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "softune-nudy-water-tint-02-peony-brew",
      "cat": "skincare",
      "price": 250,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [
        "assets/products/softune-nudy-water-tint-02-peony-brew-mwzgqwm30.jpg",
        "assets/products/softune-nudy-water-tint-02-peony-brew-mwzgqwm31.jpg",
        "assets/products/softune-nudy-water-tint-02-peony-brew-mwzgqwm32.jpg",
        "assets/products/softune-nudy-water-tint-02-peony-brew-mwzgqwm33.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "SOFTUNE"
      },
      "name": {
        "ar": "سوف تون نودي تينت ماء 02 بيوني بريو",
        "en": "softune nudy water tint 02 peony brew",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "softune-nudy-water-tint-01-dewed-peach",
      "cat": "skincare",
      "price": 250,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [
        "assets/products/softune-nudy-water-tint-01-dewed-peach-mwzgsojk0.jpg",
        "assets/products/softune-nudy-water-tint-01-dewed-peach-mwzgsojk1.jpg",
        "assets/products/softune-nudy-water-tint-01-dewed-peach-mwzgsojk2.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "SOFTUNE"
      },
      "name": {
        "ar": "سوف تون نودي تينت ماء 01 بتش دودي",
        "en": "softune nudy water tint 01 dewed peach",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "water-glow-pop-play-101-no2-pink-mongle",
      "cat": "skincare",
      "price": 250,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [
        "assets/products/water-glow-pop-play-101-no2-pink-mongle-mwzh1gfl0.jpg",
        "assets/products/water-glow-pop-play-101-no2-pink-mongle-mwzh1gfl1.jpg",
        "assets/products/water-glow-pop-play-101-no2-pink-mongle-mwzh1gfl2.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "WATER"
      },
      "name": {
        "ar": "جلو ماء بوب بلاي 101 رقم 2 روز منجل",
        "en": "water glow pop play 101 no2 pink mongle",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "water-glow-pop-play-101-no3-salmon-sparkle",
      "cat": "skincare",
      "price": 250,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [
        "assets/products/water-glow-pop-play-101-no3-salmon-sparkle-mwzh3rne0.jpg",
        "assets/products/water-glow-pop-play-101-no3-salmon-sparkle-mwzh3rne1.jpg",
        "assets/products/water-glow-pop-play-101-no3-salmon-sparkle-mwzh3rne2.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "WATER"
      },
      "name": {
        "ar": "جلو ماء بوب بلاي 101 رقم 3 سلمون سباركل",
        "en": "water glow pop play 101 no3 salmon sparkle",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "pdrn-glow-lip-serum-rosy-peach-vt",
      "cat": "skincare",
      "price": 250,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [
        "assets/products/pdrn-glow-lip-serum-rosy-peach-vt-mwzh668t0.jpg",
        "assets/products/pdrn-glow-lip-serum-rosy-peach-vt-mwzh668t1.jpg",
        "assets/products/pdrn-glow-lip-serum-rosy-peach-vt-mwzh668t2.jpg",
        "assets/products/pdrn-glow-lip-serum-rosy-peach-vt-mwzh668t3.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "PDRN"
      },
      "name": {
        "ar": "سيروم شفاه جلوي روزي بيتش vt",
        "en": "pdrn glow lip serum rosy peach vt",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "nose-pack-coacos",
      "cat": "skincare",
      "price": 35,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "5",
      "hidden": false,
      "images": [
        "assets/products/nose-pack-coacos-mwzh95600.jpg",
        "assets/products/nose-pack-coacos-mwzh95601.jpg",
        "assets/products/nose-pack-coacos-mwzh95602.jpg",
        "assets/products/nose-pack-coacos-mwzh95603.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "NOSE"
      },
      "name": {
        "ar": "حزمة أنف كوكوس شيت واحد ",
        "en": "nose pack coacos",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "step-3-magic-nose-pack",
      "cat": "skincare",
      "price": 80,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "10",
      "hidden": false,
      "images": [
        "assets/products/step-3-magic-nose-pack-mwzhcugm0.jpg",
        "assets/products/step-3-magic-nose-pack-mwzhcugm1.jpg",
        "assets/products/step-3-magic-nose-pack-mwzhcugm2.jpg",
        "assets/products/step-3-magic-nose-pack-mwzhcugm3.jpg",
        "assets/products/step-3-magic-nose-pack-mwzhcugm4.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "STEP"
      },
      "name": {
        "ar": "حزمة أنف سحرية خطوة 3 شيت واحد ",
        "en": "step 3 magic nose pack",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "cover-up-blemish-patch-k-signature-edition-p-careplus",
      "cat": "skincare",
      "price": 300,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "10",
      "hidden": false,
      "images": [
        "assets/products/cover-up-blemish-patch-k-signature-edition-p-careplus-mwzhgzx60.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "COVER"
      },
      "name": {
        "ar": "باتش تغطية العيوب ك.سيجنيتشر إديشن بي كير بلاس",
        "en": "cover up blemish patch k.signature edition p careplus  48 patch",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "over-night-firming-retinol-sleeping-mask-banila-co",
      "cat": "skincare",
      "price": 75,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "10",
      "hidden": false,
      "images": [
        "assets/products/over-night-firming-retinol-sleeping-mask-banila-co-mwzhosck0.jpg",
        "assets/products/over-night-firming-retinol-sleeping-mask-banila-co-mwzhosck1.jpg",
        "assets/products/over-night-firming-retinol-sleeping-mask-banila-co-mwzhosck2.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "OVER"
      },
      "name": {
        "ar": "ماسك ترطيب ليلي لتقوية البشرة ريتينول بنيلا كو",
        "en": "over night firming retinol sleeping mask banila co",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "clean-it-zero-original-cleansing-balm-banila-co",
      "cat": "skincare",
      "price": 80,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "10",
      "hidden": false,
      "images": [
        "assets/products/clean-it-zero-original-cleansing-balm-banila-co-mwzhq3pa0.jpg",
        "assets/products/clean-it-zero-original-cleansing-balm-banila-co-mwzhq3pa1.jpg",
        "assets/products/clean-it-zero-original-cleansing-balm-banila-co-mwzhq3pa2.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "CLEAN"
      },
      "name": {
        "ar": "غسول رغوي أصل كليان إيت زيرو بنيلا كو",
        "en": "clean it zero original cleansing balm banila co",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "clean-it-zero-matcha-enzyme-powder-wash",
      "cat": "skincare",
      "price": 75,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "5",
      "hidden": false,
      "images": [
        "assets/products/clean-it-zero-matcha-enzyme-powder-wash-mwzhvo4m0.jpg",
        "assets/products/clean-it-zero-matcha-enzyme-powder-wash-mwzhvo4m1.jpg",
        "assets/products/clean-it-zero-matcha-enzyme-powder-wash-mwzhvo4m2.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "CLEAN"
      },
      "name": {
        "ar": "مسحوق غسيل إنزيم متشا ماثشا كليان إيت زيرو",
        "en": "clean it zero matcha enzyme powder wash",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "reedle-shot-facial-repair-egf-essence-vt",
      "cat": "skincare",
      "price": 60,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "5",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "REEDLE"
      },
      "name": {
        "ar": "ريديل شوت إيسنس إصلاح الوجه إج إف في تي",
        "en": "reedle shot facial repair egf essence vt",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "cica-vital-sleeping-mask-vt",
      "cat": "skincare",
      "price": 40,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "5",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "CICA"
      },
      "name": {
        "ar": "ماسك ورقي ليلي فيتال سيكا في تي",
        "en": "cica vital sleeping mask vt",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "eye-brows-razor",
      "cat": "skincare",
      "price": 100,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "15",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "EYE"
      },
      "name": {
        "ar": "شفرة حلاقة للحواجب",
        "en": "eye brows razor",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "sulwhasoo-firming-cream",
      "cat": "skincare",
      "price": 90,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "SULWHASOO"
      },
      "name": {
        "ar": "كريم مرطب لتقوية البشرة سول وها سو",
        "en": "sulwhasoo firming cream",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "sulwhasoo-balancing-water",
      "cat": "skincare",
      "price": 100,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "SULWHASOO"
      },
      "name": {
        "ar": "سولوهاسو ماء موازن",
        "en": "sulwhasoo balancing water",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "sulwhasoo-balancing-emulsion",
      "cat": "skincare",
      "price": 100,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "30",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "SULWHASOO"
      },
      "name": {
        "ar": "سولوهاسو إيمولشن موازن",
        "en": "sulwhasoo balancing emulsion",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tooth-brush-set",
      "cat": "skincare",
      "price": 500,
      "oldPrice": null,
      "tags": [
        "best"
      ],
      "size": "110",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TOOTH"
      },
      "name": {
        "ar": "مجموعة فرش أسنان",
        "en": "tooth brush set",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "adelica-puff",
      "cat": "skincare",
      "price": 200,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "75",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "ADELICA"
      },
      "name": {
        "ar": "أديليكا بف",
        "en": "adelica puff",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tooth-brush-adult",
      "cat": "skincare",
      "price": 150,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "108",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TOOTH"
      },
      "name": {
        "ar": "فرشاة أسنان للكبار",
        "en": "tooth brush adult",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "absolut-toner",
      "cat": "skincare",
      "price": 2000,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "35",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "ABSOLUT"
      },
      "name": {
        "ar": "أبسولوت تونر",
        "en": "absolut toner",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "absoult-serum",
      "cat": "skincare",
      "price": 2000,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "200",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "ABSOULT"
      },
      "name": {
        "ar": "أبسوليت سيروم",
        "en": "absoult serum",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "absoult-lotion",
      "cat": "skincare",
      "price": 2000,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "270",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "ABSOULT"
      },
      "name": {
        "ar": "أبسوليت لوشن",
        "en": "absoult lotion",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tooth-past-small",
      "cat": "skincare",
      "price": 280,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "120",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TOOTH"
      },
      "name": {
        "ar": "معجون أسنان صغير",
        "en": "tooth past small",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tooth-past-big",
      "cat": "skincare",
      "price": 850,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "245",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TOOTH"
      },
      "name": {
        "ar": "معجون أسنان كبير",
        "en": "tooth past big",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "peel-off-mask",
      "cat": "skincare",
      "price": 1000,
      "oldPrice": null,
      "tags": [
        "best"
      ],
      "size": "57",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "PEEL"
      },
      "name": {
        "ar": "ماسك ورقي قابل للانفصال",
        "en": "peel off mask",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "atomy-ep-skinbooster",
      "cat": "skincare",
      "price": 10000,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "233",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "ATOMY"
      },
      "name": {
        "ar": "اتومي إيب سكين بوستر",
        "en": "atomy ep skinbooster",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "deepcleanser",
      "cat": "skincare",
      "price": 1000,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "180",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "DEEPCLEANS"
      },
      "name": {
        "ar": "غسول عميق",
        "en": "deepcleanser",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "peeling-gel",
      "cat": "skincare",
      "price": 1000,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "400",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "PEELING"
      },
      "name": {
        "ar": "جيل تقشير",
        "en": "peeling gel",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "atomy-lip-treatment",
      "cat": "skincare",
      "price": 300,
      "oldPrice": null,
      "tags": [
        "best"
      ],
      "size": "20",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "ATOMY"
      },
      "name": {
        "ar": "علاج شفتين أتومي",
        "en": "atomy lip treatment",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "derma-calming-sunstick",
      "cat": "skincare",
      "price": 600,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "55",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "DERMA"
      },
      "name": {
        "ar": "عصا واقي شمس مهدئ ديرما",
        "en": "Derma calming sunstick",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tony-moly-pomegranate",
      "cat": "sheetmask",
      "price": 60,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [
        "assets/products/tony-moly-pomegranate-mwzihfoj0.jpg",
        "assets/products/tony-moly-pomegranate-mwzihfoj1.jpg",
        "assets/products/tony-moly-pomegranate-mwzihfoj2.jpg",
        "assets/products/tony-moly-pomegranate-mwzihfoj3.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TONY"
      },
      "name": {
        "ar": "tony moly رمان",
        "en": "tony moly pomegranate",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tony-moly-pumpkin",
      "cat": "sheetmask",
      "price": 60,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [
        "assets/products/tony-moly-pumpkin-mwzij7v60.jpg",
        "assets/products/tony-moly-pumpkin-mwzij7v61.jpg",
        "assets/products/tony-moly-pumpkin-mwzij7v62.jpg",
        "assets/products/tony-moly-pumpkin-mwzij7v63.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TONY"
      },
      "name": {
        "ar": "tony moly يقطين",
        "en": "tony moly pumpkin",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tony-moly-strawbery",
      "cat": "sheetmask",
      "price": 60,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [
        "assets/products/tony-moly-strawbery-mwziodu60.jpg",
        "assets/products/tony-moly-strawbery-mwziodu61.jpg",
        "assets/products/tony-moly-strawbery-mwziodu62.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TONY"
      },
      "name": {
        "ar": "tony moly فراولة",
        "en": "tony moly strawbery",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tony-moly-coconut",
      "cat": "skincare",
      "price": 60,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TONY"
      },
      "name": {
        "ar": "tony moly جوز هند",
        "en": "tony moly coconut",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tony-moly-shine-muscat",
      "cat": "sheetmask",
      "price": 60,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [
        "assets/products/tony-moly-shine-muscat-mwziq7je0.jpg",
        "assets/products/tony-moly-shine-muscat-mwziq7je1.jpg",
        "assets/products/tony-moly-shine-muscat-mwziq7je2.jpg"
      ],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TONY"
      },
      "name": {
        "ar": "tony moly شاين مسكات",
        "en": "tony moly shine muscat",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tony-moly-aloe",
      "cat": "skincare",
      "price": 60,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TONY"
      },
      "name": {
        "ar": "tony moly ألوة",
        "en": "tony moly aloe",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tony-moly-pienapple",
      "cat": "skincare",
      "price": 60,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TONY"
      },
      "name": {
        "ar": "tony moly أناناس",
        "en": "tony moly pienapple",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "tony-moly-tomato",
      "cat": "skincare",
      "price": 60,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "TONY"
      },
      "name": {
        "ar": "tony moly طماطم",
        "en": "tony moly tomato",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "biodance-hydro-cera-nol-real-deep-mask",
      "cat": "skincare",
      "price": 350,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "45",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "BIODANCE"
      },
      "name": {
        "ar": "biodance hydro cera nol ماسك ورقي عميق حقيقي",
        "en": "biodance hydro cera nol real deep mask",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "ricocell-aloe",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RICOCELL"
      },
      "name": {
        "ar": "ricocell ألوة",
        "en": "ricocell aloe",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "ricocell-potato",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RICOCELL"
      },
      "name": {
        "ar": "ricocell بطاطس",
        "en": "ricocell potato",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "ricocell-royal-jelly",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RICOCELL"
      },
      "name": {
        "ar": "ricocell عسل رويال",
        "en": "ricocell royal jelly",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "ricocell-collagen",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RICOCELL"
      },
      "name": {
        "ar": "ريكوسيل كولاجين",
        "en": "ricocell collagen",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "ricocell-snail",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RICOCELL"
      },
      "name": {
        "ar": "ريكوسيل إفراز الحلزون",
        "en": "ricocell snail",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "ricocell-pomegranate",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RICOCELL"
      },
      "name": {
        "ar": "ريكوسيل رمان",
        "en": "ricocell pomegranate",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "ricocell-rice",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RICOCELL"
      },
      "name": {
        "ar": "ريكوسيل أرز",
        "en": "ricocell rice",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "ricocell-vitamin",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RICOCELL"
      },
      "name": {
        "ar": "ريكوسيل فيتامين",
        "en": "ricocell vitamin",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "ricocell-green-tea",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RICOCELL"
      },
      "name": {
        "ar": "ريكوسيل شاي أخضر",
        "en": "ricocell green tea",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "ricocell-sea-weed",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "RICOCELL"
      },
      "name": {
        "ar": "ريكوسيل طحالب بحرية",
        "en": "ricocell sea weed",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    },
    {
      "id": "mwdiheal-birch-dermaplus-mask",
      "cat": "skincare",
      "price": 50,
      "oldPrice": null,
      "tags": [
        "new"
      ],
      "size": "33",
      "hidden": false,
      "images": [],
      "art": {
        "type": "bottle",
        "c1": "#E8ECFF",
        "c2": "#2B35D8",
        "label": "MWDIHEAL"
      },
      "name": {
        "ar": "مديهيل ماسك ورقي بيرش ديرما بلاس",
        "en": "mwdiheal birch dermaplus mask",
        "ko": ""
      },
      "desc": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "usage": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    }
  ],
  "reviews": [
    {
      "name": "Esraa",
      "city": {
        "ar": "الإسكندرية",
        "en": "Alexandria",
        "ko": "알렉산드리아"
      },
      "text": {
        "ar": "المنتجات أصلية والتوصيل كان سريع ",
        "en": "Good products and fast delivery ",
        "ko": "페이스북 페이지의 실제 후기를 여기에 넣으세요."
      }
    },
    {
      "name": "Aya ahmed",
      "city": {
        "ar": "القاهرة",
        "en": "Cairo",
        "ko": "카이로"
      },
      "text": {
        "ar": "أحسن مكان أجيب منه الماسكات الكورية",
        "en": "The best place to get Korean sheet masks.",
        "ko": "페이스북 페이지의 실제 후기를 여기에 넣으세요."
      },
      "rating": 5
    },
    {
      "name": "Sofia",
      "city": {
        "ar": "المنصورة",
        "en": "Mansoura",
        "ko": "만수라"
      },
      "text": {
        "ar": "كلمتهم عالواتساب ورشحولي افضل روتين لبشرتي",
        "en": "WhatsApp support helped me choose a routine for my skin.",
        "ko": "페이스북 페이지의 실제 후기를 여기에 넣으세요."
      },
      "rating": 5
    },
    {
      "name": "Menna",
      "city": {
        "ar": "الجيزة",
        "en": "Giza",
        "ko": "기자"
      },
      "text": {
        "ar": "من زمان وانا بتعامل مع اونر ندي وبجد هي اكثر حد ثقه بجيب منه اي حاجه تبع الكوري 💓",
        "en": "Put a real review from your Facebook page here. e.g. My album arrived authentic with the photocard.",
        "ko": "페이스북 페이지의 실제 후기를 여기에 넣으세요."
      }
    },
    {
      "name": "",
      "city": {
        "ar": "",
        "en": "",
        "ko": ""
      },
      "text": {
        "ar": "",
        "en": "",
        "ko": ""
      }
    }
  ],
  "texts": {
    "ar": {
      "hero.stat1": "١٣ سنة خبرة ",
      "hero.stat3": "كوريا .. مصر"
    },
    "en": {
      "hero.stat1": "13 years of trust ",
      "hero.stat3": "Korea .. egypt"
    },
    "ko": {
      "hero.stat1": "13 년의 신뢰",
      "hero.stat3": "한국 .. 이집트"
    }
  }
};
