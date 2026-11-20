# The Elf Shop — Online Store 💙

**Bringing Korea to your hands — since 2013 · Seoul & Alexandria**

A fast, modern online store for authentic Korean skincare, sheet masks, Korean snacks, K-pop and culture products.

- **3 languages:** Arabic (default, right-to-left), English and Korean, switched with the **ع / EN / 한** button in the header.
- **Shopping cart & checkout:** customers can pay with **Cash on Delivery** or **InstaPay** (with instructions for sending the payment screenshot).
- **WhatsApp ordering:** there's an "Order via WhatsApp" button on every product, in the cart and at checkout, plus a floating WhatsApp button.
- **Facebook / Meta Pixel:** ready for ad tracking, retargeting and custom audiences.
- **Lead capture:** newsletter sign-ups, the contact form and orders are all emailed to `tes.korea2013@gmail.com`.

There's no server, database or monthly fee. It's plain HTML/CSS/JS that can be hosted for free.

---

## 📁 Project structure

```
index.html        Home (hero, categories, best sellers, offers, reviews, social, newsletter)
shop.html         Shop grid with category filter, search, sort, "on sale" toggle
product.html      Product page (gallery, description, how to use, add to cart, WhatsApp)
checkout.html     Checkout (delivery form, COD / InstaPay, order confirmation)
about.html        Our story
contact.html      WhatsApp numbers, email, contact form, social links
assets/
  css/style.css   All styles (colors at the top under :root)
  js/config.js    ⭐ STORE SETTINGS — phones, email, Pixel ID, shipping
  js/products.js  ⭐ PRODUCTS + REVIEWS — edit your catalog here
  js/i18n.js      All texts in Arabic / English / Korean
  js/app.js       Core: header/footer, cart, language, Pixel, leads
  js/pages.js     Page logic
  js/art.js       Illustrated placeholders shown until real photos are added
  products/       Put your product photos here
```

---

## 🚀 1. Put the site online (free)

**Option A: GitHub Pages**
1. On GitHub, open the repository → **Settings → Pages**.
2. Under *Source*, choose the branch and the `/ (root)` folder, then save.
3. A minute later the site is live at `https://<username>.github.io/elf-shop/`.

**Option B: Netlify**: drag and drop the project folder on [app.netlify.com/drop](https://app.netlify.com/drop).

You can connect your own domain (for example `theelfshop.com`) in either service.

**To preview locally:** open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit `http://localhost:8000`.

---

## ✉️ 2. Activate order and lead emails (one time)

Orders, newsletter sign-ups and contact messages are sent to **tes.korea2013@gmail.com** through [FormSubmit](https://formsubmit.co), a free service that needs no backend.

1. After the site is online, place a **test order** (or subscribe to the newsletter).
2. FormSubmit sends an **activation email** to `tes.korea2013@gmail.com`. Click **Activate Form**.
3. From then on, every order and lead arrives in Gmail as a neat table. Each one includes the customer's details and, if they came from an ad, the **ad source** (`utm_source`, `utm_campaign`, `fbclid`).

> Tip: once it's activated, FormSubmit gives you a random alias. You can put it in `formEndpoint` in `config.js` so the email address doesn't appear in the page code.

Orders are also always sent to **WhatsApp**: the confirmation page has a "Send order on WhatsApp" button. So nothing is lost even if an email fails.

---

## 📣 3. Facebook ads & audience (Meta Pixel)

1. Go to **Meta Events Manager → Connect data sources → Web → Meta Pixel** and create a pixel.
2. Copy the **Pixel ID** (a number like `123456789012345`).
3. Paste it into `assets/js/config.js`:
   ```js
   metaPixelId: "123456789012345",
   ```
4. Done. The site automatically sends these events:

| Event | When |
|---|---|
| `PageView` | every page |
| `ViewContent` | a product page is opened |
| `AddToCart` | a product is added to the cart |
| `InitiateCheckout` | the checkout page is opened |
| `Purchase` | an order is placed (with its value in EGP) |
| `Lead` | someone subscribes to the newsletter or sends the contact form |
| `Contact` | a WhatsApp order button is clicked |
| `Search` | someone searches the shop |

**What you can do with it in Ads Manager:**
- **Website traffic / sales campaigns** from your Facebook page that send people to the site, optimized for `Purchase` or `Lead`.
- **Retargeting:** build a Custom Audience such as *"visited a product page but didn't buy in the last 30 days"* and show them offers.
- **Lookalike audiences:** find new people similar to your buyers and subscribers.
- **Link tracking:** add UTM tags to ad links so each lead email shows which campaign it came from, for example:
  `https://your-site.com/?utm_source=facebook&utm_campaign=ramadan_offer`

---

## 💌 4. Sending promotional emails & offers

Every newsletter sign-up arrives in Gmail with the person's **name, email and WhatsApp number**. To send offers:

- **Small list:** send from Gmail using **BCC** so subscribers can't see each other's addresses.
- **Growing list (recommended):** use **[Brevo](https://brevo.com)** (free for up to 300 emails a day) or **[Mailchimp](https://mailchimp.com)** (free plan). Sign up with `tes.korea2013@gmail.com`, import your subscribers (copy them from the lead emails into a spreadsheet, then upload it as CSV), and design campaigns with ready-made templates. Both tools show who opened and clicked.
- **WhatsApp offers:** use the phone numbers you collected with WhatsApp Business **broadcast lists**.

The newsletter pop-up appears once per visitor after 25 seconds. You can change this in `config.js` (`leadPopup`).

---

## 🛍️ 5. Adding products & photos

Open `assets/js/products.js`. Each product looks like this:

```js
{
  id: "snail-mucin-essence",           // unique, used in the link
  cat: "skincare",                     // skincare | sheetmask | kitchen | kpop | culture | accessories
  price: 650, oldPrice: 780,           // oldPrice is optional and shows a "Sale" badge
  tags: ["best"],                      // "best" = best seller on the homepage, "new" = New badge
  size: "100 ml",
  images: ["assets/products/snail-1.jpg", "assets/products/snail-2.jpg"],
  name:  { ar: "...", en: "...", ko: "..." },
  desc:  { ar: "...", en: "...", ko: "..." },
  usage: { ar: "...", en: "...", ko: "..." }
}
```

- **Photos:** put them in `assets/products/` and list them in `images`. Square photos (about 1000×1000) look best. While `images` is empty, a styled illustration is shown instead.
- ⚠️ **The current products and prices are samples.** Replace them with your real stock.

## ⭐ 6. Customer reviews

At the bottom of `products.js`, `ELF_REVIEWS` contains **placeholders**. Copy real reviews from your Facebook page (the Reviews / Recommendations tab) into it, with the customer's name and city.

## ⚙️ 7. Other settings (`config.js`)

- `whatsappOrders`: the WhatsApp number that receives orders (`201144246362`).
- `instapayNumber` / `whatsappPayments`: the InstaPay number and the WhatsApp number for payment screenshots (`01015044457`).
- `shipping.flat`: set a fixed shipping fee (for example `60`). If you leave it as `null`, checkout shows "confirmed on WhatsApp".
- `shipping.freeOver`: free shipping above this amount.

## 🎨 Colors

The colors are defined at the top of `assets/css/style.css`: royal blue `#2230D9`, navy `#0A0F5C`, white, ink black `#0E0F1A` and gold `#C9A44C`.
