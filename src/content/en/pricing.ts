import type { QuoteServiceSlug } from "../pricing";

type ScopeText = {
  question: string;
  hint: string;
  unit?: [string, string, string];
  steps?: string[];
  options?: { label: string; hint: string }[];
};

export const quoteServicesTextEn: Record<QuoteServiceSlug, { label: string; scope: ScopeText }> = {
  "landing-page": {
    label: "Landing page",
    scope: {
      question: "How many pages should the site have?",
      hint: "A landing page is one long page. Extra pages could be e.g. a thank-you page after the form, or terms and conditions.",
      unit: ["page", "pages", "pages"],
    },
  },
  "strona-firmowa": {
    label: "Business website",
    scope: {
      question: "How many pages do you need?",
      hint: "A typical business: Home, Services, About, Contact. Plus separate pages for individual services, portfolio, pricing.",
      unit: ["page", "pages", "pages"],
    },
  },
  "sklep-internetowy": {
    label: "Online store",
    scope: {
      question: "How many products will the store have?",
      hint: "Roughly. The more products and variants, the more importing, photos and testing.",
      steps: ["up to 20", "up to 50", "up to 150", "up to 500", "up to 2,000", "over 2,000"],
    },
  },
  "redesign-strony": {
    label: "Website redesign",
    scope: {
      question: "How many pages does your current site have?",
      hint: "Count the ones that should stay after the move. Unimportant posts can go.",
      unit: ["page", "pages", "pages"],
    },
  },
  "pozycjonowanie-seo": {
    label: "SEO and Google visibility",
    scope: {
      question: "How many services or pages should I optimize?",
      hint: "Each service is a separate search phrase and a separate page that should show up on Google.",
      unit: ["service", "services", "services"],
    },
  },
  "aplikacje-ai": {
    label: "App or AI integration",
    scope: {
      question: "How big is the project?",
      hint: "I don’t price this in the calculator — apps are quoted after a conversation. This choice helps me prepare.",
      options: [
        { label: "Simple", hint: "One calculator, form or a small panel." },
        { label: "Medium", hint: "User accounts, an admin panel, a few integrations." },
        { label: "Extensive", hint: "A system with many roles, payments and automations." },
      ],
    },
  },
};

export const addonsTextEn: Record<string, { label: string; short: string; hint: string }> = {
  cms: { label: "Content editing panel", short: "content editing panel", hint: "Change copy, photos and prices yourself — no need to call me. Included with a business website and a store." },
  blog: { label: "Blog / news", short: "blog", hint: "A place for articles that bring in customers from Google." },
  "rezerwacje-gotowe": {
    label: "Connecting a ready booking system (Booksy, Calendly…)",
    short: "bookings via Booksy / Calendly",
    hint: "Already have a booking system? I connect it to the site: a button, the calendar and a matching look.",
  },
  rezerwacje: {
    label: "Custom online booking system",
    short: "custom online booking",
    hint: "An appointment calendar on your site, e-mail confirmations, reminders, a bookings panel.",
  },
  "opinie-google": {
    label: "Google reviews on the site",
    short: "Google reviews",
    hint: "Your best Google Maps reviews shown on the site, with stars and a link to all of them.",
  },
  platnosci: { label: "Online payments", short: "online payments", hint: "BLIK, Przelewy24, cards — for deposits, services or tickets." },
  jezyk: { label: "Second language version", short: "second language version", hint: "E.g. English or Ukrainian. The price doesn’t include translating the copy." },
  kalkulator: { label: "Calculator or configurator on the site", short: "on-site calculator", hint: "Customers work out the price of a service or build an order from options." },
  newsletter: { label: "Newsletter and sign-ups", short: "newsletter", hint: "A sign-up form connected to MailerLite or a similar tool." },
  gbp: { label: "Google Business Profile (setup)", short: "Google Business Profile", hint: "Your Maps listing: categories, photos, hours, linked to the site." },
  "import-hurtownia": { label: "Product import from a wholesaler (XML / CSV)", short: "wholesaler product import", hint: "Prices and stock levels update automatically." },
  ksiegowosc: { label: "Accounting integration", short: "accounting integration", hint: "Invoices from orders go automatically to Fakturownia, wFirma etc." },
  allegro: { label: "Allegro integration", short: "Allegro integration", hint: "One inventory for the store and your listings." },
  "seo-artykul": { label: "Extra article for a search phrase (1 pc.)", short: "extra SEO articles", hint: "A text aimed at a specific search in your area." },
  "seo-konkurencja": { label: "Competitor analysis in your town", short: "competitor analysis", hint: "Who’s ahead of you on Google, and why." },
  "seo-miesiecznie": { label: "Ongoing SEO care (monthly)", short: "ongoing SEO care", hint: "A visibility report and further fixes every month." },
  opieka: { label: "Monthly care (hosting, updates, small changes)", short: "monthly care", hint: "After the 30 days of free support: someone looks after the site and makes small changes." },
  "app-konta": { label: "User accounts and login", short: "user login", hint: "Customers or staff have their own accounts and permissions." },
  "app-admin": { label: "Admin panel", short: "admin panel", hint: "Manage data, users and orders in one place." },
  "app-api": { label: "Integrations with other systems (API)", short: "API integrations", hint: "CRM, accounting, inventory, payments, couriers." },
  "app-ai": { label: "AI assistant or automation", short: "AI / automations", hint: "Answering customer questions, analysing documents, generating content." },
  "app-raporty": { label: "Reports, charts and data export", short: "reports and export", hint: "Summaries in PDF / Excel, a dashboard with the numbers." },
};

export const quoteStepsEn = ["Service", "Scope", "Features", "Content", "Timing", "Result"] as const;

export const packsTextEn: Partial<Record<QuoteServiceSlug, { priceNote: string; bullets: string[] }>> = {
  "landing-page": {
    priceNote: "one page, no hidden costs",
    bullets: ["Design built around your brand", "Form and tap-to-call", "Basic SEO and Google Maps"],
  },
  "strona-firmowa": {
    priceNote: "up to 4 pages, each extra PLN 200",
    bullets: ["Services, work, reviews, contact", "Local SEO for your town", "Analytics and Google Search Console", "Content editing panel included"],
  },
  "sklep-internetowy": {
    priceNote: "up to 50 products, imported",
    bullets: ["BLIK, Przelewy24 and card payments", "Couriers and InPost", "Order panel", "Category and product SEO"],
  },
  "aplikacje-ai": {
    priceNote: "quoted after a conversation",
    bullets: ["Client panels and dashboards", "API integrations and automations", "AI assistants on your site"],
  },
  "redesign-strony": {
    priceNote: "up to 3 pages, each extra about PLN 120",
    bullets: ["Audit of your current site", "Content migration and 301 redirects", "Before-and-after measurement"],
  },
  "pozycjonowanie-seo": {
    priceNote: "up to 2 services, each extra about PLN 120",
    bullets: ["Local search research", "Technical optimization", "Visibility report"],
  },
};

export const comparisonRowsEn: { label: string; values: [string, string, string] }[] = [
  { label: "Pages included", values: ["1", "up to 4", "info pages + catalogue"] },
  { label: "Design built around your brand", values: ["tak", "tak", "tak"] },
  { label: "Phone and tablet layout", values: ["tak", "tak", "tak"] },
  { label: "Form and tap-to-call", values: ["tak", "tak", "tak"] },
  { label: "SEO at launch", values: ["basic", "local, for your town", "categories and products"] },
  { label: "Google Maps and Search Console", values: ["tak", "tak", "tak"] },
  { label: "Content editing panel", values: ["opcja", "tak", "tak"] },
  { label: "Online payments (BLIK, P24, cards)", values: ["opcja", "opcja", "tak"] },
  { label: "Product catalogue with variants", values: ["nie", "nie", "tak"] },
  { label: "Couriers and InPost", values: ["nie", "nie", "tak"] },
  { label: "30 days of technical support after launch", values: ["tak", "tak", "tak"] },
];

export const priceFactorsEn: { title: string; text: string }[] = [
  {
    title: "Scope",
    text: "The number of pages or products. A landing page is one page, a business site is several, a store is a catalogue. Every extra page means more design, content and testing.",
  },
  {
    title: "Content",
    text: "If you have copy and photos, you save time and money. If not, I’ll write the copy and pick the photos — that’s extra work, so it’s priced separately.",
  },
  {
    title: "Features",
    text: "A contact form is standard. Online booking, payments, an editing panel or a calculator are separate pieces to design and test.",
  },
  {
    title: "Integrations",
    text: "Connecting to Allegro, accounting or a wholesaler is real work — with the risk that the other system behaves differently from its documentation. I price them separately.",
  },
  {
    title: "Timing",
    text: "The standard timeline means calm work on one project. Express means I move other jobs around — hence +30%. I confirm available dates in the quote.",
  },
];

export const notIncludedEn: { title: string; text: string }[] = [
  {
    title: "Domain and hosting",
    text: "You register them in your name and pay the provider. I help you choose and set them up. That way you have full control over your site.",
  },
  {
    title: "Photos from a professional shoot",
    text: "I can recommend a photographer from my network (the photographer sets the price). Without a shoot, I’ll pick and edit the photos you have.",
  },
  {
    title: "Paid licences and plugins",
    text: "If the project needs a paid tool (e.g. a booking system), I’ll say so upfront in the quote — with the amount.",
  },
  {
    title: "Ads",
    text: "Google Ads and social media ads are paid directly to the platforms. I can set them up separately.",
  },
];

export const extraPriceItemsEn: { label: string; price: string; note?: string }[] = [
  { label: "Extra page (business website, landing page)", price: "PLN 200", note: "beyond the package" },
  { label: "Website copy (I write it for you)", price: "from PLN 100 / page", note: "min. PLN 300" },
  { label: "Photo selection and editing", price: "PLN 250" },
  { label: "Logo and basic brand identity", price: "from PLN 600" },
  { label: "Photo shoot with a partner photographer", price: "priced by the photographer" },
  { label: "Express (faster delivery)", price: "+30%", note: "on the one-off price" },
];
