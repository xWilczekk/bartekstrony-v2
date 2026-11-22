import { formatPLN, getService } from "./services";
import { addons } from "./pricing";
import type { Locale } from "@/i18n/config";
import { faqEn, pricingFaqEn } from "./en/faq";

export type FaqItem = {
  q: string;
  a: string;
  link?: { href: string; label: string };
};

const price = (slug: string) => {
  const p = getService(slug)?.priceFrom;
  return p ? formatPLN(p) : "wycena indywidualna";
};
const time = (slug: string) => getService(slug)?.timeline ?? "";
const careFrom = formatPLN(addons.find((a) => a.id === "opieka")?.price ?? 99);

export const faq: FaqItem[] = [
  {
    q: "Ile kosztuje strona internetowa?",
    a: `Landing page od ${price("landing-page")}, strona firmowa od ${price("strona-firmowa")}, sklep internetowy od ${price("sklep-internetowy")}. „Od” oznacza dolną granicę dla prostego zakresu. Dokładną kwotę dostajesz w wycenie w 24 godziny, zanim cokolwiek zaczniemy — a orientacyjne widełki policzysz sam w kalkulatorze w pół minuty.`,
    link: { href: "/wycena", label: "Policz swoją stronę" },
  },
  {
    q: "Ile trwa zrobienie strony?",
    a: `Landing page zwykle ${time("landing-page")}, strona firmowa ${time("strona-firmowa")}, sklep ${time("sklep-internetowy")}. Najczęściej opóźniają nie kody, tylko teksty i zdjęcia od klienta — dlatego pomagam je przygotować. Gdy zależy Ci na czasie, jest opcja ekspres (+30% do ceny), jeśli mam wolny termin.`,
  },
  {
    q: "Czy domena i hosting będą moje?",
    a: "Tak, wszystko jest Twoje. Domenę rejestrujemy na Twoje dane, konto hostingowe zakładamy na Twój e-mail i przekazuję Ci dostępy. Nikogo nie trzymam „w zakładnikach”: jeśli kiedyś zechcesz zmienić wykonawcę, zabierasz stronę ze sobą. Za domenę i hosting płacisz bezpośrednio dostawcy.",
  },
  {
    q: "Czy sam będę mógł zmieniać teksty i zdjęcia?",
    a: `Tak. W stronie firmowej i sklepie panel do edycji treści jest w cenie (przy landing page’u to dodatek) i pokazuję, jak z niego korzystać. Jeśli wolisz nie dotykać strony, wyślij mi mailem, co zmienić, a wprowadzę to w ramach opieki miesięcznej od ${careFrom}.`,
  },
  {
    q: "Czego potrzebujesz ode mnie na start?",
    a: "Piętnastu minut rozmowy, logo (jeśli masz) i kilku zdjęć swojej firmy. Resztę ustalamy w trakcie. Nie musisz przygotowywać żadnych tekstów — mogę je napisać za Ciebie, wystarczy, że opowiesz, co robisz i dla kogo.",
  },
  {
    q: "Czy strona będzie widoczna w Google?",
    a: "Tak, podstawy SEO są w cenie: poprawna struktura, szybkość, opisy, mapa strony, Google Search Console i wpis w Mapach. Nikt uczciwy nie obieca Ci pierwszego miejsca na każdą frazę, ale dobrze zbudowana strona z treściami o Twoim mieście ma realne szanse. Przy dużej konkurencji potrzebne jest osobne SEO, które wyceniam osobno.",
    link: { href: "/oferta/pozycjonowanie-seo", label: "Zobacz, jak działa SEO" },
  },
  {
    q: "Robisz też sklepy internetowe?",
    a: `Tak. Sklep zaczyna się od ${price("sklep-internetowy")}: katalog z wariantami, płatności BLIK, Przelewy24 i kartą, kurierzy z InPostem, panel zamówień. Pomagam też przejść z Allegro, OLX czy Facebooka na własny sklep, żeby nie płacić prowizji od każdej sprzedaży.`,
    link: { href: "/oferta/sklep-internetowy", label: "Oferta: sklep internetowy" },
  },
  {
    q: "Jak wyglądają płatności i faktury?",
    a: "Cenę i termin dostajesz na piśmie w wycenie i nic w niej się nie zmienia bez Twojej zgody. Płacisz BLIK-iem albo przelewem. Na start wpłacasz zadatek, który rezerwuje mój czas na Twój projekt. Jest bezzwrotny: jeśli zrezygnujesz w trakcie, pokrywa pracę, którą już wykonałem. Resztę płacisz po akceptacji projektu, zanim strona pójdzie na żywo. Nie mam firmy (działam w ramach działalności nierejestrowanej), więc nie wystawiam faktur VAT. Dostajesz rachunek, a cena z wyceny jest kwotą końcową, bez doliczonego VAT.",
  },
  {
    q: "Co się dzieje po uruchomieniu strony?",
    a: `Masz 30 dni wsparcia technicznego w cenie: gdyby coś przestało działać albo się zepsuło, naprawiam to bez dopłat i odpowiadam na pytania. Zaakceptowany projekt jest skończony, więc zmiany w wyglądzie czy treściach nie wchodzą już w ten zakres. Potem wybierasz: radzisz sobie sam albo korzystasz z opieki miesięcznej (hosting, aktualizacje, zmiany) od ${careFrom}.`,
  },
  {
    q: "Dlaczego nie zrobić strony na Wixie albo z gotowego szablonu WordPressa?",
    a: "Czasem to dobry wybór: jeśli strona ma być prywatnym hobby albo budżet jest poniżej 500 zł. Dla firmy, która ma zarabiać na stronie, szablon ma wady: wygląda jak tysiąc innych, ładuje się wolniej (co widać w Google), a kreator trzyma Twoją stronę w abonamencie. Moja strona jest napisana pod Twoją firmę, szybka i w całości Twoja.",
  },
  {
    q: "A jeśli projekt mi się nie spodoba?",
    a: "Projekt widzisz, zanim zacznę pisać kod, więc zmiany są tanie i szybkie. Poprawki do rozsądnej liczby rund są w cenie (ustalamy to w wycenie). Wycena jest darmowa i niezobowiązująca, więc nic nie ryzykujesz, zanim zaakceptujesz ofertę.",
  },
  {
    q: "Pracujesz tylko z firmami z Białegostoku?",
    a: "Nie. Pracuję zdalnie z klientami z całej Polski: rozmowa przez telefon albo wideo, reszta mailem. Lokalnie jestem w Białymstoku, Sokółce i okolicach Podlasia — tu chętnie spotkam się na żywo.",
  },
];

export const pricingFaq: FaqItem[] = [
  {
    q: "Dlaczego widzę ceny „od”, a nie jedną kwotę?",
    a: "Bo każda firma jest inna. „Od” to cena dla prostego zakresu: bez dodatkowych funkcji i bez pisania tekstów. Kalkulator pokazuje widełki od–do, a po 24 godzinach dostajesz od mnie jedną konkretną kwotę.",
    link: { href: "/wycena", label: "Policz widełki" },
  },
  {
    q: "Czy po wycenie są jakieś ukryte koszty?",
    a: "Nie. Wszystko, co kosztuje (strona, dodatki, ekspres, opieka), jest w wycenie z kwotą. Poza nią zostają tylko rzeczy, które i tak opłacasz sam: domena, hosting i ewentualne licencje narzędzi, o których informuję z góry.",
  },
  {
    q: "Ile kosztuje utrzymanie strony po wdrożeniu?",
    a: `Pierwsze 30 dni wsparcia technicznego jest w cenie. Potem masz dwa koszty: domena i hosting (płacisz dostawcy) oraz opcjonalna opieka miesięczna od ${careFrom} — hosting, aktualizacje i drobne zmiany. Możesz też zrezygnować z opieki i prowadzić stronę sam.`,
  },
  {
    q: "Czy cena strony firmowej zawiera teksty i zdjęcia?",
    a: "Cena zawiera projekt, wdrożenie, SEO na start i konfigurację. Jeśli masz własne teksty i zdjęcia, nie dopłacasz nic. Jeśli chcesz, żebym napisał teksty, to od 100 zł za podstronę (minimum 300 zł); obróbka zdjęć kosztuje 250 zł, sesja u fotografa jest wyceniana osobno.",
  },
  {
    q: "Czy mogę dokupić funkcje później?",
    a: "Tak. Strona jest zbudowana tak, żeby dało się ją rozwijać: blog, rezerwacje, płatności czy sklep można dołożyć w dowolnym momencie. Dodatki wyceniam według tego samego cennika.",
  },
  {
    q: "Dlaczego aplikacje nie mają ceny w cenniku?",
    a: "Bo zakres bywa bardzo różny — od prostego kalkulatora po system z kontami i integracjami. Zamiast zgadywać, krótko rozmawiamy i dostajesz wycenę dopasowaną do tego, czego naprawdę potrzebujesz.",
    link: { href: "/oferta/aplikacje-ai", label: "Oferta: aplikacje i AI" },
  },
];

export const faqFor = (locale: Locale) => (locale === "en" ? faqEn : faq);
export const pricingFaqFor = (locale: Locale) => (locale === "en" ? pricingFaqEn : pricingFaq);
