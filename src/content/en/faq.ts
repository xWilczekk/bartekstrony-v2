import type { FaqItem } from "../faq";
import { addons } from "../pricing";
import { formatPrice, getServiceFor } from "../services";

const price = (slug: string) => {
  const p = getServiceFor(slug, "en")?.priceFrom;
  return p ? formatPrice(p, "en") : "individual quote";
};
const time = (slug: string) => getServiceFor(slug, "en")?.timeline ?? "";
const careFrom = formatPrice(addons.find((a) => a.id === "opieka")?.price ?? 99, "en");

export const faqEn: FaqItem[] = [
  {
    q: "How much does a website cost?",
    a: `A landing page from ${price("landing-page")}, a business website from ${price("strona-firmowa")}, an online store from ${price("sklep-internetowy")}. “From” means the lower limit for a simple scope. You get the exact amount in a quote within 24 hours, before we start anything — and you can work out a rough range yourself in the calculator in half a minute.`,
    link: { href: "/wycena", label: "Price your website" },
  },
  {
    q: "How long does it take to build a website?",
    a: `A landing page usually takes ${time("landing-page")}, a business website ${time("strona-firmowa")}, a store ${time("sklep-internetowy")}. Delays rarely come from the code — usually from copy and photos from the client, which is why I help prepare them. If you’re in a hurry, there’s an express option (+30% on the price) if I have a free slot.`,
  },
  {
    q: "Will the domain and hosting be mine?",
    a: "Yes, everything is yours. The domain is registered in your name, the hosting account is set up on your e-mail and I hand over all the logins. I don’t hold anyone “hostage”: if you ever want to switch developers, you take the site with you. You pay for the domain and hosting directly to the provider.",
  },
  {
    q: "Will I be able to change copy and photos myself?",
    a: `Yes. A business website and a store come with a content editing panel included (for a landing page it’s an add-on), and I show you how to use it. If you’d rather not touch the site, e-mail me what to change and I’ll do it as part of monthly care from ${careFrom}.`,
  },
  {
    q: "What do you need from me to get started?",
    a: "A fifteen-minute call, your logo (if you have one) and a few photos of your business. We settle the rest along the way. You don’t need to prepare any copy — I can write it for you, as long as you tell me what you do and for whom.",
  },
  {
    q: "Will the site be visible on Google?",
    a: "Yes, SEO basics are included: correct structure, speed, descriptions, a sitemap, Google Search Console and a Maps listing. Nobody honest will promise you first place for every search, but a well-built site with content about your town has a real chance. With strong competition you need dedicated SEO, which I quote separately.",
    link: { href: "/oferta/pozycjonowanie-seo", label: "See how SEO works" },
  },
  {
    q: "Do you build online stores too?",
    a: `Yes. A store starts at ${price("sklep-internetowy")}: a catalogue with variants, BLIK, Przelewy24 and card payments, couriers with InPost, an order panel. I also help you move from Allegro, OLX or Facebook to a store of your own, so you stop paying commission on every sale.`,
    link: { href: "/oferta/sklep-internetowy", label: "Services: online store" },
  },
  {
    q: "How do payments and invoices work?",
    a: "You get the price and the deadline in writing in the quote, and nothing in it changes without your consent. You pay by BLIK or bank transfer. To start, you pay a deposit that reserves my time for your project. It’s non-refundable: if you pull out midway, it covers the work I’ve already done. You pay the rest after approving the project, before the site goes live. I work under Poland’s small-scale unregistered activity rules (działalność nierejestrowana), so I don’t issue VAT invoices. You get a bill, and the price in the quote is final, with no VAT added.",
  },
  {
    q: "What happens after the site goes live?",
    a: `You get 30 days of technical support included: if something stops working or breaks, I fix it at no extra cost and answer your questions. An approved project is finished, so changes to the design or content are outside that scope. After that, you choose: manage it yourself or use monthly care (hosting, updates, changes) from ${careFrom}.`,
  },
  {
    q: "Why not build the site on Wix or with a ready-made WordPress theme?",
    a: "Sometimes that’s a good choice: for a private hobby site, or with a budget under PLN 500. For a business that needs its website to earn money, a template has downsides: it looks like a thousand others, loads slower (which Google notices), and a site builder keeps your site on a subscription. My site is written for your business, fast and entirely yours.",
  },
  {
    q: "What if I don’t like the design?",
    a: "You see the design before I start writing code, so changes are cheap and quick. Revisions up to a reasonable number of rounds are included (we agree on it in the quote). The quote is free and non-binding, so you risk nothing before you accept the offer.",
  },
  {
    q: "Do you only work with businesses in Białystok?",
    a: "No. I work remotely with clients from all over Poland: a phone or video call, the rest by e-mail. Locally I’m in Białystok, Sokółka and around Podlasie — here I’m happy to meet in person.",
  },
];

export const pricingFaqEn: FaqItem[] = [
  {
    q: "Why do I see “from” prices instead of one amount?",
    a: "Because every business is different. “From” is the price for a simple scope: no extra features and no copywriting. The calculator shows a from–to range, and within 24 hours you get one specific amount from me.",
    link: { href: "/wycena", label: "Work out the range" },
  },
  {
    q: "Are there any hidden costs after the quote?",
    a: "No. Everything that costs money (the site, add-ons, express, care) is in the quote with an amount. Outside it are only things you pay for yourself anyway: the domain, hosting and any tool licences, which I tell you about upfront.",
  },
  {
    q: "How much does it cost to maintain the site after launch?",
    a: `The first 30 days of technical support are included. After that you have two costs: domain and hosting (paid to the provider) and optional monthly care from ${careFrom} — hosting, updates and small changes. You can also skip the care and run the site yourself.`,
  },
  {
    q: "Does the business website price include copy and photos?",
    a: "The price includes design, build, launch SEO and setup. If you have your own copy and photos, you pay nothing extra. If you want me to write the copy, it’s from PLN 100 per page (minimum PLN 300); photo editing costs PLN 250, and a photo shoot is priced separately.",
  },
  {
    q: "Can I add features later?",
    a: "Yes. The site is built to grow: a blog, bookings, payments or a store can be added at any time. Add-ons are priced from the same price list.",
  },
  {
    q: "Why don’t apps have a price in the price list?",
    a: "Because the scope varies a lot — from a simple calculator to a system with accounts and integrations. Instead of guessing, we have a short conversation and you get a quote matched to what you really need.",
    link: { href: "/oferta/aplikacje-ai", label: "Services: apps and AI" },
  },
];
