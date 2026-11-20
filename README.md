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

## 🛠️ Admin panel — `/admin.html`

Open `https://your-site/admin.html` to manage the store without touching code:

| Section | What you can do |
|---|---|
| **Dashboard** | Store overview, a launch checklist, and shortcuts to your orders, subscribers and inquiries in Gmail. |
| **Products** | Add, edit, duplicate, reorder, hide or delete products. Set prices, sale prices, "Best seller" / "New" / "Sold out", and upload photos (resized automatically). |
| **Categories** | Add, rename, reorder or delete shop categories. |
| **Reviews** | Add real customer reviews and remove the placeholders. |
| **Store settings** | WhatsApp numbers, InstaPay number, email, shipping fee, social links, Meta Pixel ID, newsletter pop-up, homepage featured products. |
| **Site texts** | Change any wording on the site in Arabic, English and Korean. |
| **Colors** | Change the three brand colors. |
| **Publish** | Send your changes to the live site. |

**How it works**
1. Your edits are saved automatically as a **draft in your browser**. Customers don't see them yet.
2. **Preview my changes** opens the real site showing your draft (only for you).
3. **Publish** saves the changes to your GitHub repository; the live site updates in 1–2 minutes.

**One-time setup: connect GitHub.** In the panel open **Publish**, follow "How do I get an access token?", paste the token and press **Save and test connection**. Set the branch to the one your site is published from.

**Security.** The panel has no password of its own because the site has no server. What protects the store is the GitHub token: only a browser holding it can publish. Someone who opens `/admin.html` without the token can only change a private draft on their own device. Keep the token secret, and don't tick "Remember on this device" on a shared computer.

**Orders** are not stored in the panel: they arrive by email and WhatsApp. The Dashboard links straight to them in Gmail.

**No GitHub?** In **Publish** you can download `data.js` and replace `assets/js/data.js` in the site files yourself.

---

## 📁 Project structure

```
index.html        Home (hero, categories, best sellers, offers, reviews, social, newsletter)
shop.html         Shop grid with category filter, search, sort, "on sale" toggle
product.html      Product page (gallery, description, how to use, add to cart, WhatsApp)
checkout.html     Checkout (delivery form, COD / InstaPay, order confirmation)
about.html        Our story
contact.html      WhatsApp numbers, email, contact form, social links
admin.html        ⭐ ADMIN PANEL
assets/
  js/data.js      ⭐ STORE DATA — settings, colors, categories, products, reviews, text changes
                     (written by the admin panel)
  js/i18n.js      Default texts in Arabic / English / Korean
  js/app.js       Core: header/footer, cart, language, Pixel, leads
  js/pages.js     Page logic
  js/admin.js     Admin panel logic
  js/art.js       Illustrated placeholders shown until real photos are added
  js/geo.js       Egyptian governorates for checkout
  css/style.css   Storefront styles
  css/admin.css   Admin panel styles
  products/       Product photos (the admin panel uploads here)
```

---

## 🚀 1. Put the site online (free)

**Option A (recommended): Cloudflare Pages + your own domain**

Cloudflare rebuilds the site every time something is pushed to GitHub, so **Publish** in the admin panel goes live about a minute later.

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**. Authorise GitHub and pick `elf-shop`.
2. Build settings: **Framework preset:** None · **Build command:** *(leave empty)* · **Build output directory:** `/`. Production branch: the branch the admin panel publishes to (Publish → *Branch the site is published from*). Press **Save and Deploy**.
3. The site is live at `https://elf-shop-xxx.pages.dev`.
4. **Domain:** Cloudflare → **Add a domain** → enter your domain → Free plan. Cloudflare shows two nameservers.
   In **Namecheap → Domain List → Manage → Nameservers** choose **Custom DNS**, paste the two Cloudflare nameservers and save (usually active within an hour, at most 24 h).
5. Back in the Pages project → **Custom domains → Set up a custom domain**: add `yourdomain.com`, then `www.yourdomain.com`. Cloudflare creates the DNS records and the HTTPS certificate.
6. The admin panel is at `https://yourdomain.com/admin` (`/admin.html` also works).

The `_headers` file sets security headers, hides `/admin` from search engines and makes sure fresh store data is always served.

**Option B: GitHub Pages**
1. On GitHub, open the repository → **Settings → Pages**.
2. Under *Source*, choose the branch and the `/ (root)` folder, then save.
3. A minute later the site is live at `https://<username>.github.io/elf-shop/`.

**Option C: Netlify**: drag and drop the project folder on [app.netlify.com/drop](https://app.netlify.com/drop).

You can connect your own domain (for example `theelfshop.com`) in either service.

**To preview locally:** open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit `http://localhost:8000`.

---

## ✉️ 2. Activate order and lead emails (one time)

Orders, newsletter sign-ups and contact messages are sent to **tes.korea2013@gmail.com** through [FormSubmit](https://formsubmit.co), a free service that needs no backend.

1. After the site is online, place a **test order** (or subscribe to the newsletter).
2. FormSubmit sends an **activation email** to `tes.korea2013@gmail.com`. Click **Activate Form**.
3. From then on, every order and lead arrives in Gmail as a neat table. Each one includes the customer's details and, if they came from an ad, the **ad source** (`utm_source`, `utm_campaign`, `fbclid`).

> Tip: once it's activated, FormSubmit gives you a random alias. You can put it in the admin panel (**Store settings → Form delivery address**) so the email address doesn't appear in the page code.

Orders are also always sent to **WhatsApp**: the confirmation page has a "Send order on WhatsApp" button. So nothing is lost even if an email fails.

---

## 📣 3. Facebook ads & audience (Meta Pixel)

1. Go to **Meta Events Manager → Connect data sources → Web → Meta Pixel** and create a pixel.
2. Copy the **Pixel ID** (a number like `123456789012345`).
3. Paste it in the admin panel under **Store settings → Facebook ads (Meta Pixel)** and publish.
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

The newsletter pop-up appears once per visitor after 25 seconds. You can change this in the admin panel under **Store settings**.

---

## 🛍️ 5. Products, reviews and settings

Use the **admin panel** (`/admin.html`) — see the top of this file.

- ⚠️ **The current products and prices are samples.** Replace them with your real stock.
- ⚠️ **The reviews are placeholders.** Replace them with real reviews from your Facebook page.
- Until a product has a photo, a styled illustration is shown instead.

## 🎨 Colors

Royal blue `#2230D9`, navy `#0A0F5C`, white, ink black and gold `#C9A44C`. Change the three brand colors in the admin panel under **Colors**; all lighter and darker shades follow automatically.
