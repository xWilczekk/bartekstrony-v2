import type { CategoryId, MetricId, Verdict } from "./audit-copy";
import { RATING_LABEL } from "./rating";

type Explain = { title: string; why: string };
const e = (title: string, why: string): Explain => ({ title, why });

export const fmtSecondsEn = (ms: number) =>
  `${(ms / 1000).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} s`;
export const fmtMsEn = (ms: number) => `${Math.round(ms).toLocaleString("en-US")} ms`;
export const fmtClsEn = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const categoryLabelEn: Record<CategoryId, string> = {
  performance: "Performance",
  seo: "SEO",
  accessibility: "Accessibility",
  "best-practices": "Best practices",
};

export const categoryHintEn: Record<CategoryId, string> = {
  performance: "how fast the site works on a phone",
  seo: "whether Google understands what your site is about",
  accessibility: "whether every customer can use it",
  "best-practices": "security and technical tidiness",
};

export const ratingLabelEn = RATING_LABEL.en;

export const metricTextEn: Record<
  MetricId,
  { name: string; bench: string; format: (v: number) => string; sentence: (formatted: string, raw: number) => string }
> = {
  fcp: {
    name: "First view",
    bench: "good: up to 1.8 s",
    format: fmtSecondsEn,
    sentence: (v) => `The first content appears after ${v}. Until then the customer sees a blank screen.`,
  },
  lcp: {
    name: "Main content",
    bench: "good: up to 2.5 s",
    format: fmtSecondsEn,
    sentence: (v) => `The customer sees the main content — a heading or a photo — after ${v}.`,
  },
  tbt: {
    name: "Response to touch",
    bench: "good: up to 200 ms",
    format: fmtMsEn,
    sentence: (v) => `For ${v} while loading, the page is busy and doesn’t respond to taps.`,
  },
  cls: {
    name: "Layout stability",
    bench: "good: up to 0.1",
    format: fmtClsEn,
    sentence: (v, raw) =>
      raw < 0.005
        ? "The layout stays put — nothing jumps away from the customer’s finger."
        : `Elements move around while loading (score ${v}). It’s easy to tap the wrong thing.`,
  },
  si: {
    name: "Loading pace",
    bench: "good: up to 3.4 s",
    format: fmtSecondsEn,
    sentence: (v) => `The page fills with content in ${v}.`,
  },
};

const renderBlocking = e(
  "Scripts and styles block the page from showing",
  "The browser has to download them before it shows anything. The customer stares at an empty screen.",
);
const heavyImages = e(
  "Images are too heavy",
  "Oversized or poorly compressed images are the most common reason for slow sites. The customer pays for them in data and time.",
);
const serverSlow = e(
  "The server responds too slowly",
  "Too much time passes before content starts loading. Weak hosting or a bloated system is usually to blame.",
);
const layoutShift = e(
  "Elements jump around while loading",
  "The customer goes to tap a button and it slips from under their finger — annoying, and it ends with them leaving.",
);
const thirdParty = e(
  "Third-party scripts slow the site down",
  "Chats, ad pixels and widgets are someone else’s code that loads along with your site and slows it down.",
);
const unusedJs = e("The phone downloads code the site doesn’t use", "Unnecessary JavaScript lengthens loading and eats the customer’s data.");
const caching = e(
  "The browser doesn’t remember the site’s files",
  "It downloads the same files again on every visit, so even returning customers wait every time.",
);
const domSize = e(
  "The page is built in an overly complicated way",
  "Thousands of elements on one page are hard work for a phone. The result: slow scrolling and loading.",
);
const legacyJs = e("The site sends code for very old browsers", "Modern phones get unnecessary, heavy code that does nothing for them.");
const dupJs = e("The same code is loaded several times", "Duplicates make the page bigger and loading longer for no reason.");
const lcpLate = e("The main image loads too late", "The most important element on the page waits in line behind less important things.");
const fontSwap = e("Text appears only after the font loads", "For a moment the customer sees blank spaces instead of text.");
const chains = e(
  "Files load one after another",
  "Instead of downloading in parallel, they wait for each other in a queue. That lengthens every visit.",
);
const jank = e("The page freezes after a tap", "The phone is busy calculating and briefly stops responding to touch.");
const viewport = e(
  "The site isn’t adapted to phone screens",
  "Customers on a phone get a shrunken desktop version and have to zoom in with their fingers.",
);
const tapTargets = e(
  "Buttons and links are too small on a phone",
  "They’re hard to hit with a thumb — and tapping is the first thing a customer does on a phone.",
);
const altText = e(
  "Images without descriptions",
  "Google and blind users don’t know what’s in the picture — you lose visibility in image search.",
);
const oldLibs = e(
  "Old libraries with security holes",
  "The site uses outdated components with known bugs. That’s an open door for a break-in.",
);
const oldProtocol = e(
  "The server uses an outdated protocol",
  "Newer HTTP/2 and HTTP/3 download many files at once — the older one does it more slowly.",
);
const badLists = e("Incorrectly built lists", "Screen readers read such lists out wrongly.");
const popupOnStart = e("The site asks for permissions right away", "A pop-up question on arrival scares customers off before they see anything.");

export const auditCopyEn: Record<string, Explain> = {
  "render-blocking-resources": renderBlocking,
  "render-blocking-insight": renderBlocking,
  "render-blocking-insights": renderBlocking,
  "unused-javascript": unusedJs,
  "unused-css-rules": e("The site sends styles it doesn’t use", "Unused CSS rules lengthen loading and give the customer nothing in return."),
  "uses-optimized-images": heavyImages,
  "image-delivery-insight": heavyImages,
  "modern-image-formats": e(
    "Images in an outdated format",
    "Modern formats (WebP, AVIF) give the same quality with smaller files — the site loads faster.",
  ),
  "uses-responsive-images": e("Phones get desktop-sized images", "A small screen downloads huge files that it then shows as thumbnails anyway."),
  "offscreen-images": e(
    "Images below the screen load straight away",
    "They should load only when the customer scrolls to them. Right now they slow down what’s visible at the start.",
  ),
  "uses-text-compression": e(
    "The site is sent without compression",
    "Turning on compression is a server setting and can cut the transfer several times over.",
  ),
  "uses-long-cache-ttl": caching,
  "cache-insight": caching,
  "total-byte-weight": e("The page is very heavy", "The more megabytes, the longer the customer waits — especially on a weak signal."),
  "dom-size": domSize,
  "dom-size-insight": domSize,
  "server-response-time": serverSlow,
  "document-latency-insight": serverSlow,
  redirects: e(
    "Unnecessary redirects",
    "Before the customer reaches the right page, the browser is bounced from address to address. Every bounce costs fractions of a second.",
  ),
  "unminified-javascript": e("Script code isn’t slimmed down", "Removing unnecessary characters from code makes files smaller without changing the look."),
  "unminified-css": e("Style code isn’t slimmed down", "Removing unnecessary characters from code makes files smaller without changing the look."),
  "legacy-javascript": legacyJs,
  "legacy-javascript-insight": legacyJs,
  "duplicated-javascript": dupJs,
  "duplicated-javascript-insight": dupJs,
  "third-party-summary": thirdParty,
  "third-parties-insight": thirdParty,
  "bootup-time": e(
    "The phone takes long to process scripts",
    "A weaker phone needs seconds to “digest” the site’s code before the page starts responding.",
  ),
  "mainthread-work-breakdown": e(
    "The phone is busy calculating",
    "The page gives the processor too much work, so it loads slowly and responds slowly.",
  ),
  "lcp-lazy-loaded": lcpLate,
  "prioritize-lcp-image": lcpLate,
  "lcp-discovery-insight": lcpLate,
  "lcp-phases-insight": e("The main content appears too late", "The most important element on the page waits a long time before the customer sees it."),
  "layout-shifts": layoutShift,
  "layout-shift-elements": layoutShift,
  "cls-culprits-insight": layoutShift,
  "unsized-images": layoutShift,
  "font-display": fontSwap,
  "font-display-insight": fontSwap,
  "uses-rel-preconnect": chains,
  "critical-request-chains": chains,
  "network-dependency-tree-insight": chains,
  "long-tasks": jank,
  "forced-reflow-insight": jank,
  "interaction-to-next-paint-insight": jank,
  "non-composited-animations": e("Animations stutter on phones", "Badly built animations load the processor and cause stuttering."),
  "efficient-animated-content": e(
    "Animated GIFs are too heavy",
    "One GIF can weigh more than the rest of the page. A short video does the same for a fraction of the transfer.",
  ),
  "uses-http2": oldProtocol,
  "modern-http-insight": oldProtocol,
  viewport,
  "viewport-insight": viewport,
  "meta-viewport": e(
    "The site blocks zooming on phones",
    "Customers with weaker eyesight can’t enlarge the text — and Google treats this as an error.",
  ),
  "no-document-write": e("An outdated way of loading scripts", "Such code can halt the display of the whole page on a slower connection."),

  "document-title": e("No page title", "The title is the headline shown in Google results. Without it, clicks are hard to get."),
  "meta-description": e(
    "No page description in Google results",
    "The description is the two sentences under the title in search. Without it Google picks a random snippet, and fewer customers click.",
  ),
  "http-status-code": e("The page returns an error", "Google won’t list a page that responds with an error code."),
  "link-text": e("“Click here” style links", "Google reads link text to understand where links lead. “Here” tells it nothing."),
  "crawlable-anchors": e("Google may not follow some links", "Some pages may be invisible to the search engine."),
  "is-crawlable": e("The page is blocked from Google", "If that’s not intentional — for Google, your site simply doesn’t exist."),
  "robots-txt": e("The robots.txt file is invalid", "It’s the instruction file for search engines. Errors in it can block indexing."),
  "image-alt": altText,
  canonical: e(
    "Google may point to the wrong address",
    "Without a correct canonical address, the search engine may split the page’s strength across several versions.",
  ),
  hreflang: e("Incorrect language version tags", "The search engine may show the page in the wrong country or language."),
  "font-size": e("Text too small on phones", "Customers have to zoom in to read anything — and Google notices."),
  "tap-targets": tapTargets,
  "target-size": tapTargets,

  "color-contrast": e(
    "Text contrast too weak",
    "Light grey text on white is hard to read in sunlight and for older people. The customer won’t read your offer.",
  ),
  "button-name": e("Buttons without names", "A screen reader can’t tell what a button does. For some customers the site is unusable."),
  "link-name": e("Links without names", "Screen readers and Google don’t know where such a link leads."),
  label: e(
    "Form fields without labels",
    "Customers don’t know what to type, and screen readers can’t read the field. The contact form loses enquiries.",
  ),
  "html-has-lang": e(
    "The page language isn’t set",
    "Browsers and screen readers may mispronounce the text or offer an unnecessary translation.",
  ),
  "html-lang-valid": e("The page language is set incorrectly", "Browsers and screen readers may read the text wrongly."),
  "heading-order": e(
    "Headings in the wrong order",
    "Headings are the page’s table of contents — for Google and screen readers. Skipping levels muddles their meaning.",
  ),
  bypass: e("No “skip to content” link", "Keyboard users have to tab through the whole menu on every page."),
  "frame-title": e("Frames without titles", "People using screen readers don’t know what an embedded element contains."),
  tabindex: e("Broken keyboard order", "Moving through the page with the Tab key happens in an illogical order."),
  "duplicate-id-aria": e("Repeated element IDs", "A small code error that confuses assistive technology."),
  list: badLists,
  listitem: badLists,

  "is-on-https": e(
    "The site doesn’t use a secure connection (HTTPS)",
    "Browsers mark it as “not secure”, which scares customers away and lowers your Google ranking.",
  ),
  "errors-in-console": e(
    "The site reports technical errors",
    "Something on the site doesn’t work as it should — often missing files or scripts.",
  ),
  "no-vulnerable-libraries": oldLibs,
  "js-libraries": oldLibs,
  "image-aspect-ratio": e("Images are stretched", "Image proportions are distorted — the site looks unprofessional."),
  "image-size-responsive": e("Images are too low-resolution", "They look blurry on modern screens."),
  deprecations: e("Outdated code", "The site uses features that browsers will soon stop supporting."),
  charset: e("No character encoding", "Special characters may show up as gibberish."),
  doctype: e("No document type declaration", "The browser may render the page in a compatibility mode for old versions."),
  "geolocation-on-start": popupOnStart,
  "notification-on-start": popupOnStart,
  "inspector-issues": e("The browser reports problems with the site", "Chrome found errors that may affect how the site works or its security."),
  "csp-xss": e(
    "No protection against injected foreign code",
    "Extra security headers make attacks on your site and its visitors harder.",
  ),
};

export const ariaFallbackEn = e("Errors in accessibility markup", "The site is harder to use for people relying on screen readers.");
export const genericWhyEn = "Fixing this point improves the site’s score in Google’s test.";

export function buildVerdictEn(scores: Record<CategoryId, number | null>, lcpMs: number | null): Verdict {
  const perf = scores.performance;
  const seo = scores.seo;
  const lcp = lcpMs !== null ? fmtSecondsEn(lcpMs) : null;

  if (perf !== null && perf >= 90) {
    const seoOk = seo === null || seo >= 90;
    return {
      tone: "good",
      pre: "Your site is in ",
      accent: "good",
      post: " shape.",
      lead: seoOk
        ? "Technically, there’s nothing to rescue here. What’s left is visibility: a fast site alone isn’t enough for customers to find you instead of your competitors. That’s where SEO starts."
        : "The site is fast, but Google doesn’t read it as well as it could. That’s the cheapest route to more customers — SEO fixes.",
      ctaLabel: "I want more customers from Google — send me a proposal",
      usluga: "pozycjonowanie-seo",
    };
  }
  if (perf !== null && perf >= 50) {
    return {
      tone: "mid",
      pre: "It could be ",
      accent: "faster",
      post: " — and it’s worth it.",
      lead: `${lcp ? `The main content appears after ${lcp}. ` : ""}The site works, but it isn’t living up to its potential: some customers on phones will leave before they see your offer. The list below shows what to fix first.`,
      ctaLabel: "I want a fast website — send me a proposal",
      usluga: "redesign-strony",
    };
  }
  return {
    tone: "bad",
    pre: "This site is ",
    accent: "costing",
    post: " you customers.",
    lead: `${lcp ? `On a phone, the main content appears after ${lcp}. ` : ""}A slow site means fewer calls and enquiries — customers from Google go back to the results and click a competitor. It can be fixed, and often the best solution is a new, lightweight site.`,
    ctaLabel: "I want a fast website — send me a proposal",
    usluga: "redesign-strony",
  };
}
