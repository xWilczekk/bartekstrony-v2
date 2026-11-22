import type { Locale } from "@/i18n/config";
import { projectsTextEn } from "./en/projects";

export type IndustrySlug =
  | "restauracje"
  | "motoryzacja"
  | "budowlanka"
  | "gabinety"
  | "hotele"
  | "transport"
  | "e-commerce"
  | "energetyka"
  | "uslugi";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  city?: string;
  citySlug?: string;
  industry: IndustrySlug;
  description: string;
  tags: string[];
  scope: string[];
  shot: { src: string; width: number; height: number; kind: "fullpage" | "viewport" };
  palette: [string, string];
  liveUrl?: string;
  featured?: boolean;
  testimonialId?: string;
};

export const projects: Project[] = [
  {
    slug: "pestify",
    title: "Pestify",
    client: "Pestify",
    category: "Dezynsekcja, dezynfekcja i deratyzacja",
    city: "Warszawa",
    citySlug: "warszawa",
    industry: "uslugi",
    description:
      "Strona firmy DDD z Warszawy: osobne podstrony szkodników i usług, cennik, certyfikaty, oferta HACCP dla firm, poradnik i zamawianie usługi online.",
    tags: ["Usługi", "SEO", "Wielojęzyczna"],
    scope: [
      "Podstrony szkodników i usług DDD",
      "Cennik i zamówienie usługi online",
      "Certyfikaty i oferta HACCP dla firm",
      "Poradnik, przełącznik języka, tryb jasny i ciemny",
    ],
    shot: { src: "/work/hero/pestify.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#127f4a", "#0a3922"],
    liveUrl: "https://pestify.pl",
    featured: true,
  },
  {
    slug: "omniway",
    title: "Omniway",
    client: "Omniway, termowizja",
    category: "Diagnostyka termowizyjna",
    city: "Wielkopolska",
    industry: "energetyka",
    description:
      "Strona firmy, która bada kamerą termowizyjną budynki, instalacje i farmy fotowoltaiczne w całej Polsce: oferta, przebieg inspekcji, przykładowy raport i wycena online.",
    tags: ["Business", "Technical"],
    scope: [
      "Oferta termowizji budynków, instalacji i farm PV",
      "Przebieg inspekcji krok po kroku",
      "Przykład obrazu z kamery i raportu",
      "Wycena usługi i przejście do platformy PV Spectra",
    ],
    shot: { src: "/work/hero/omniway.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#84cc16", "#0a1220"],
    liveUrl: "https://omniway.pl",
    featured: true,
  },
  {
    slug: "pv-spectra",
    title: "PV Spectra",
    client: "PV Spectra / Omniway",
    category: "Platforma AI dla farm fotowoltaicznych",
    industry: "energetyka",
    description:
      "Środowisko do analizy zdjęć z drona i zarządzania farmami fotowoltaicznymi — moduł AI wykrywa usterki paneli, a serwis dostaje gotowe raporty.",
    tags: ["SaaS", "AI", "Dashboard"],
    scope: ["Panel klienta z logowaniem", "Moduł AI do analizy zdjęć termowizyjnych", "Mapy usterek i raporty", "Landing produktowy"],
    shot: { src: "/work/hero/pv-spectra.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#ff7502", "#f4f4f2"],
    liveUrl: "https://pvspectra.pl",
  },
  {
    slug: "sigma-sokolka",
    title: "Sigma",
    client: "Hotel & Sala bankietowa Sigma",
    category: "Hotel, sala weselna i restauracja",
    city: "Sokółka",
    citySlug: "sokolka",
    industry: "hotele",
    description:
      "Elegancka strona hotelu z ofertą noclegów, sal weselnych i restauracji — ciemny, złoty klimat, który sprzedaje wesela zanim para przyjedzie na miejsce.",
    tags: ["Hospitality", "Premium"],
    scope: ["Oferta noclegów i sal", "Galeria wnętrz", "Opinie gości", "Mapa i kontakt z numerem w nagłówku"],
    shot: { src: "/work/hero/sigma-sokolka.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#d29d66", "#141414"],
  },
  {
    slug: "jp-auto",
    title: "JP-Auto",
    client: "JP-Auto Wypożyczalnia",
    category: "Wypożyczalnia samochodów",
    city: "Sokółka",
    citySlug: "sokolka",
    industry: "motoryzacja",
    description:
      "Strona wypożyczalni z pełną flotą, cennikiem i rezerwacją online. Klienci sami przeglądają auta i wysyłają zapytania.",
    tags: ["Web design", "Rezerwacje"],
    scope: ["Katalog floty z cenami", "Formularz rezerwacji", "Sekcja warunków najmu", "Lokalne SEO"],
    shot: { src: "/work/hero/jp-auto.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#ff842f", "#1c3350"],
    liveUrl: "https://jpauto-wynajem-sokolka.pl",
    testimonialId: "jacek",
  },
  {
    slug: "profesjonalne-remonty",
    title: "Profesjonalne Remonty",
    client: "Profesjonalne Remonty",
    category: "Prace malarsko-budowlane",
    city: "Wielkopolska",
    industry: "budowlanka",
    description:
      "Strona firmy malarsko-budowlanej — pełna prezentacja usług, realizacji i procesu współpracy, tak żeby klient wiedział czego się spodziewać zanim zadzwoni.",
    tags: ["Business", "Premium"],
    scope: ["Prezentacja usług", "Galeria realizacji", "Opis procesu współpracy", "Formularz wyceny"],
    shot: { src: "/work/hero/profesjonalne-remonty.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#ebba76", "#161616"],
    featured: true,
  },
  {
    slug: "rafal-sakowski",
    title: "Rafał Sakowski",
    client: "Rafał Sakowski, hipnoterapia",
    category: "Hipnoterapia i psychoterapia",
    city: "Gdynia",
    industry: "gabinety",
    description:
      "Strona hipnoterapeuty z Gdyni: obszary terapii, przebieg pracy krok po kroku, certyfikaty, opinie pacjentów i bezpłatna pierwsza konsultacja jednym telefonem.",
    tags: ["Gabinet", "Marka osobista", "SEO"],
    scope: [
      "Podstrony obszarów terapii: lęki, bezsenność, uzależnienia",
      "Przebieg terapii i certyfikaty",
      "Opinie pacjentów i aktualności",
      "Bezpłatna konsultacja telefoniczna w hero",
    ],
    shot: { src: "/work/hero/rafal-sakowski.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#c9a84c", "#0d0d14"],
    liveUrl: "https://www.rafal-sakowski.pl",
    featured: true,
  },
  {
    slug: "alicedecor",
    title: "Alice Decor",
    client: "Alice Decor, dekoracje okien",
    category: "Zasłony, firany i rolety na wymiar",
    city: "Grudziądz",
    industry: "uslugi",
    description:
      "Strona pracowni dekoracji okien z Grudziądza: zasłony, firany, rolety i karnisze, droga od bezpłatnego pomiaru do montażu, galeria realizacji i umawianie pomiaru.",
    tags: ["Usługi", "Premium", "Lokalnie"],
    scope: [
      "Oferta zasłon, firan, rolet i karniszy",
      "Cztery kroki od rozmowy do montażu",
      "Galeria realizacji",
      "Umawianie bezpłatnego pomiaru",
    ],
    shot: { src: "/work/hero/alicedecor.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#5f7a5c", "#fbf8f4"],
    liveUrl: "https://www.dekoracjeokien-alicedecor.pl",
    featured: true,
  },
  {
    slug: "sk-sprzatanie",
    title: "SK Sprzątanie",
    client: "SK Sprzątanie (Stal Kar)",
    category: "Sprzątanie firm i obiektów",
    city: "Gdańsk",
    industry: "uslugi",
    description:
      "Strona firmy sprzątającej z Trójmiasta i Starogardu Gdańskiego: osiem usług od biur po sprzątanie po remoncie, prosty proces w czterech krokach, opinie klientów i darmowa wycena.",
    tags: ["Usługi", "Lokalnie", "Konwersja"],
    scope: [
      "Oferta: biura, klatki schodowe, okna, sprzątanie po remoncie i eventach",
      "Proces w czterech krokach",
      "Opinie klientów",
      "Formularz darmowej wyceny i szybki telefon",
    ],
    shot: { src: "/work/hero/sk-sprzatanie.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#22c55e", "#0b1210"],
    liveUrl: "https://www.sksprzatanie.pl",
  },
  {
    slug: "agencja-prime",
    title: "Prime",
    client: "Prime, agencja ochrony",
    category: "Agencja ochrony osób i mienia",
    city: "Wrocław",
    industry: "uslugi",
    description:
      "Strona agencji ochrony z Wrocławia: usługi od ochrony obiektów po monitoring 24/7, sektory klientów, proces od audytu do wdrożenia, FAQ i bezpłatna wycena, w ciemnym, złotym klimacie.",
    tags: ["Business", "Premium"],
    scope: [
      "Sześć usług ochrony z osobnymi opisami",
      "Sektory: biura, handel, budowy, osiedla, eventy",
      "Proces od audytu do wdrożenia",
      "FAQ, oferty pracy i formularz wyceny",
    ],
    shot: { src: "/work/hero/agencja-prime.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#d8b36a", "#0b0b0c"],
    liveUrl: "https://agencja-prime.vercel.app",
  },
  {
    slug: "hydrotech",
    title: "HydroTech Południe",
    client: "HydroTech Południe",
    category: "Lokalizacja wycieków i osuszanie po zalaniu",
    city: "Śląsk",
    industry: "uslugi",
    description:
      "Strona firmy, która lokalizuje wycieki i osusza budynki po zalaniu na Śląsku, w Zagłębiu i Małopolsce: usługi, wynajem osuszaczy, przebieg pracy, realizacje i rozliczenie z ubezpieczycielem.",
    tags: ["Usługi", "Lokalnie", "Konwersja"],
    scope: [
      "Usługi: lokalizacja wycieków, osuszanie, wynajem osuszaczy",
      "Przebieg pracy i rozliczenie z ubezpieczycielem",
      "Galeria realizacji",
      "Dwa numery telefonu na wierzchu, dostępność 24/7",
    ],
    shot: { src: "/work/hero/hydrotech.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#1d4ed8", "#0b1530"],
    liveUrl: "https://www.hydrotechpoludnie.pl",
  },
  {
    slug: "ozonerio",
    title: "Ozonerio",
    client: "Ozonerio",
    category: "Ozonowanie mieszkań, samochodów i biur",
    city: "Warszawa",
    citySlug: "warszawa",
    industry: "uslugi",
    description:
      "Strona firmy ozonującej mieszkania, samochody i biura w Warszawie: usługi, jak działa ozon, cennik z kalkulatorem kosztu zabiegu i oferta dla firm.",
    tags: ["Usługi", "Kalkulator", "Lokalnie"],
    scope: [
      "Podstrony usług ozonowania",
      "Kalkulator kosztu zabiegu",
      "Cennik i oferta dla firm",
      "Wyjaśnienie, jak działa ozon",
    ],
    shot: { src: "/work/hero/ozonerio.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#16305a", "#f4f7fb"],
    liveUrl: "https://ozonerio.pl",
  },
  {
    slug: "znicze-sokolka",
    title: "Znicze Sokółka",
    client: "Znicze Sokółka",
    category: "Sklep internetowy ze zniczami",
    city: "Sokółka",
    citySlug: "sokolka",
    industry: "e-commerce",
    description:
      "Sklep rodzinnej firmy z Sokółki: znicze klasyczne i LED, wkłady, lampiony i kompozycje kwiatowe na zamówienie, z koszykiem i odliczaniem do Wszystkich Świętych.",
    tags: ["Sklep", "E-commerce", "Lokalnie"],
    scope: [
      "Katalog: znicze, wkłady, lampiony, kompozycje",
      "Koszyk i zamówienia online",
      "Kompozycje na zamówienie",
      "Licznik do Wszystkich Świętych",
    ],
    shot: { src: "/work/hero/znicze-sokolka.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#d8b56a", "#2a1a14"],
    liveUrl: "https://zniczesokolka.pl",
  },
  {
    slug: "aneta-witoslaw",
    title: "Aneta Witosław",
    client: "Gabinet Psychologiczny Aneta Witosław",
    category: "Gabinet psychologiczny",
    city: "Sokółka",
    citySlug: "sokolka",
    industry: "gabinety",
    description:
      "Spokojna strona gabinetu psychologicznego z Sokółki: oferta, o mnie, cennik i umawianie wizyty, z informacją o wolnych terminach.",
    tags: ["Gabinet", "Marka osobista"],
    scope: ["Oferta i opis pracy", "Strona o mnie", "Cennik", "Umawianie wizyty i wolne terminy"],
    shot: { src: "/work/hero/aneta-witoslaw.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#2f5d3a", "#f6f4ee"],
    liveUrl: "https://anetawitoslaw.pl",
  },
  {
    slug: "auto-chomko",
    title: "AutoChomko",
    client: "AutoChomko.pl",
    category: "Samochody używane",
    industry: "motoryzacja",
    description:
      "Strona handlu sprawdzonymi samochodami używanymi z udokumentowaną historią: oferta aut, skup, zamiana i finansowanie.",
    tags: ["Automotive", "Katalog"],
    scope: ["Oferta samochodów", "Skup i zamiana aut", "Finansowanie", "Kontakt z numerem na wierzchu"],
    shot: { src: "/work/hero/auto-chomko.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#e11d2a", "#0b0b0c"],
    liveUrl: "https://autochomko.pl",
  },
  {
    slug: "smart-bud",
    title: "Smart-Bud",
    client: "Smart-Bud",
    category: "Wykończenia wnętrz i brukarstwo",
    city: "Kraków",
    industry: "budowlanka",
    description:
      "Strona firmy z Krakowa od wykończeń wnętrz i brukarstwa: remonty, płytki, malowanie, kostka brukowa, podjazdy i tarasy, z bezpłatną wyceną.",
    tags: ["Business", "Budowlanka"],
    scope: ["Oferta wykończeń i brukarstwa", "Realizacje", "Opinie klientów", "Bezpłatna wycena"],
    shot: { src: "/work/hero/smart-bud.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#6d28d9", "#ffffff"],
  },
  {
    slug: "kawiarnia-u-relkowej",
    title: "Kawiarnia U Rełkowej",
    client: "Kawiarnia U Rełkowej",
    category: "Kawiarnia",
    city: "Wyszków",
    citySlug: "wyszkow",
    industry: "restauracje",
    description:
      "Klimatyczna strona kawiarni z Wyszkowa: kawa i desery, menu, godziny otwarcia na żywo, adres, ceny i telefon na wierzchu.",
    tags: ["Restauracja", "Premium"],
    scope: ["Menu", "Status otwarcia na żywo", "O nas", "Kontakt i dojazd"],
    shot: { src: "/work/hero/kawiarnia-u-relkowej.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#d9c08a", "#0e0c0a"],
  },
  {
    slug: "kebab-nazar",
    title: "Kebab Nazar",
    client: "Kebab Nazar",
    category: "Restauracja & menu",
    city: "Wyszków",
    citySlug: "wyszkow",
    industry: "restauracje",
    description:
      "Ognista strona kebabu z menu, sosami, FAQ i zamówieniami telefonicznymi jednym kliknięciem.",
    tags: ["Restauracja", "Lokalnie"],
    scope: ["Menu z cenami", "Sekcja sosów i dodatków", "FAQ", "Przycisk „Zadzwoń i zamów”"],
    shot: { src: "/work/hero/kebab-nazar.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#ff8137", "#1c1414"],
    liveUrl: "https://kebabnazarwyszkow.pl",
  },
  {
    slug: "zacisze",
    title: "Restauracja Zacisze",
    client: "Restauracja Zacisze",
    category: "Restauracja",
    industry: "restauracje",
    description:
      "Klimatyczna strona restauracji z menu, rezerwacją stolika i prezentacją wnętrz.",
    tags: ["Restauracja", "Rezerwacje"],
    scope: ["Menu", "Rezerwacja stolika", "Galeria wnętrz", "Mapa dojazdu"],
    shot: { src: "/work/zacisze.webp", width: 857, height: 1920, kind: "fullpage" },
    palette: ["#ce7200", "#fdf8e6"],
    testimonialId: "anna",
  },
  {
    slug: "majster-bb",
    title: "Majster BB",
    client: "Majster BB",
    category: "Usługi remontowe",
    industry: "budowlanka",
    description:
      "Konwertująca strona firmy remontowej z portfolio realizacji i ofertą usług — zbudowana pod telefon od klienta.",
    tags: ["Business", "Konwersja"],
    scope: ["Portfolio realizacji", "Oferta usług", "Sticky przycisk telefonu", "Opinie"],
    shot: { src: "/work/majster-bb.webp", width: 480, height: 1920, kind: "fullpage" },
    palette: ["#ff6b13", "#f7f7f7"],
    testimonialId: "lukasz",
  },
  {
    slug: "kacik-smaku",
    title: "Kącik Smaku",
    client: "Kącik Smaku Wyszków",
    category: "Kebab & fast-food",
    city: "Wyszków",
    citySlug: "wyszkow",
    industry: "restauracje",
    description:
      "Apetyczna strona lokalu z pełnym menu, statystykami i integracją z Facebookiem.",
    tags: ["Restauracja", "Menu"],
    scope: ["Pełne menu", "Integracja z Facebookiem", "Godziny otwarcia", "Dojazd"],
    shot: { src: "/work/hero/kacik-smaku.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#c17f38", "#0b0606"],
  },
  {
    slug: "zak-auto",
    title: "ZAK Auto",
    client: "ZAK Auto Komis",
    category: "Komis samochodowy",
    city: "Sokółka",
    citySlug: "sokolka",
    industry: "motoryzacja",
    description:
      "Elegancka prezentacja aut sprowadzanych z Belgii i Niemiec, z pełną historią pojazdów.",
    tags: ["Automotive", "Katalog"],
    scope: ["Katalog aut", "Historia pojazdów", "Finansowanie", "Kontakt do handlowca"],
    shot: { src: "/work/hero/zak-auto.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#826c33", "#0a0a0a"],
    liveUrl: "https://samochody.sokolka.com",
  },
  {
    slug: "taxi-sokolka",
    title: "Taxi Sokółka",
    client: "Taxi Sokółka Krzysiek",
    category: "Usługi transportowe",
    city: "Sokółka",
    citySlug: "sokolka",
    industry: "transport",
    description:
      "Prosty, szybki landing z cennikiem kursów, opiniami i numerem do zamówienia na samej górze.",
    tags: ["Landing", "Local SEO"],
    scope: ["Cennik kursów", "Numer telefonu w hero", "Opinie", "Lokalne SEO"],
    shot: { src: "/work/hero/taxi-sokolka.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#97691b", "#ffffff"],
    liveUrl: "https://taxikrzysiek.pl",
    testimonialId: "krzysztof",
  },
  {
    slug: "kino-ton",
    title: "Kino TON",
    client: "Kino TON — wypożyczalnia strojów",
    category: "Wypożyczalnia strojów karnawałowych",
    city: "Białystok",
    citySlug: "bialystok",
    industry: "e-commerce",
    description:
      "Strona z katalogiem strojów, cennikiem i kontaktem dla klientów z Białegostoku.",
    tags: ["Katalog", "E-commerce"],
    scope: ["Katalog strojów", "Filtrowanie kategorii", "Cennik", "Kontakt"],
    shot: { src: "/work/hero/kino-ton.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#b53250", "#ffffff"],
    liveUrl: "https://strojekarnawalowe-bialystok.pl",
  },
  {
    slug: "weterynarz-lopaciuk",
    title: "Gabinet Łopaciuk",
    client: "Gabinet Weterynaryjny Łopaciuk",
    category: "Gabinet weterynaryjny",
    city: "Siedlce",
    industry: "gabinety",
    description:
      "Spokojna, stylowa strona gabinetu weterynaryjnego z pełną prezentacją usług.",
    tags: ["Healthcare", "Premium"],
    scope: ["Usługi i cennik", "Zespół", "Godziny przyjęć", "Rejestracja telefoniczna"],
    shot: { src: "/work/hero/weterynarz-lopaciuk.webp", width: 2400, height: 1500, kind: "viewport" },
    palette: ["#d37425", "#10201c"],
    liveUrl: "https://weterynariasiedlce.pl",
    testimonialId: "magdalena",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsByIndustry = (industry: IndustrySlug) =>
  projects.filter((p) => p.industry === industry);
export const projectsByCity = (citySlug: string) =>
  projects.filter((p) => p.citySlug === citySlug);

const projectsEn: Project[] = projects.map((p) => ({ ...p, ...projectsTextEn[p.slug] }));
export const projectsFor = (locale: Locale) => (locale === "en" ? projectsEn : projects);
export const getProjectFor = (slug: string, locale: Locale) => projectsFor(locale).find((p) => p.slug === slug);
