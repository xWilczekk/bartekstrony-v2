import type { Locale } from "@/i18n/config";

export type Testimonial = {
  id: string;
  author: string;
  company: string;
  role: string;
  projectSlug?: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "krzysztof",
    author: "Krzysztof",
    company: "Taxi Sokółka",
    role: "Właściciel firmy taxi",
    projectSlug: "taxi-sokolka",
    quote:
      "Bartek zrobił mi prostą i konkretną stronę z cennikiem i numerem telefonu. Klienci dzwonią częściej, a strona ładuje się natychmiast. Polecam każdemu lokalnemu biznesowi.",
  },
  {
    id: "jacek",
    author: "Jacek",
    company: "JP-Auto",
    role: "Wypożyczalnia samochodów, Białystok",
    projectSlug: "jp-auto",
    quote:
      "Współpraca bardzo profesjonalna. Strona wygląda nowocześnie, klienci sami przeglądają flotę i rezerwują auta. Ilość zapytań przez formularz wyraźnie wzrosła.",
  },
  {
    id: "anna",
    author: "Anna",
    company: "Restauracja Zacisze",
    role: "Manager restauracji",
    projectSlug: "zacisze",
    quote:
      "Bartek od początku rozumiał, czego potrzebujemy. Strona ma klimat, dobrze prezentuje menu i wnętrze. Goście chwalą wygląd już przy rezerwacji stolika.",
  },
  {
    id: "lukasz",
    author: "Łukasz",
    company: "Majster BB",
    role: "Firma remontowo-budowlana",
    projectSlug: "majster-bb",
    quote:
      "Konkret, terminowość i pełen kontakt na każdym etapie. Strona ładnie pokazuje moje realizacje i realnie przekłada się na nowe zlecenia. Pełen profesjonalizm.",
  },
  {
    id: "magdalena",
    author: "Magdalena",
    company: "Gabinet Łopaciuk",
    role: "Gabinet weterynaryjny",
    projectSlug: "weterynarz-lopaciuk",
    quote:
      "Strona wyszła stylowo i spokojnie — dokładnie tak, jak chcieliśmy. Bartek doradził świetne rozwiązania, a wszystko było dopięte na ostatni guzik.",
  },
];

export const getTestimonial = (id?: string) => testimonials.find((t) => t.id === id);

const testimonialsTextEn: Record<string, { role: string; quote: string }> = {
  krzysztof: {
    role: "Taxi company owner",
    quote:
      "Bartek built me a simple, no-nonsense website with prices and my phone number. Customers call more often, and the site loads instantly. I recommend him to any local business.",
  },
  jacek: {
    role: "Car rental, Białystok",
    quote:
      "A very professional collaboration. The site looks modern, customers browse the fleet and book cars themselves. The number of enquiries through the form has clearly gone up.",
  },
  anna: {
    role: "Restaurant manager",
    quote:
      "Bartek understood what we needed from the start. The site has atmosphere and presents the menu and the interior well. Guests compliment the look as soon as they book a table.",
  },
  lukasz: {
    role: "Renovation and construction company",
    quote:
      "Straight to the point, on time and in touch at every stage. The site shows my work nicely and genuinely brings in new jobs. Fully professional.",
  },
  magdalena: {
    role: "Veterinary clinic",
    quote:
      "The site turned out stylish and calm — exactly as we wanted. Bartek suggested great solutions, and everything was done down to the last detail.",
  },
};

export const getTestimonialFor = (id: string | undefined, locale: Locale) => {
  const t = getTestimonial(id);
  return t && locale === "en" ? { ...t, ...testimonialsTextEn[t.id] } : t;
};
