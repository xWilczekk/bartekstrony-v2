import type { Locale } from "@/i18n/config";
import { servicesEn } from "./en/services";
import type { IndustrySlug } from "./projects";

export type Service = {
  slug: string;
  name: string;
  promise: string;
  forWho: string;
  priceFrom: number | null;
  timeline: string;
  includes: string[];
  keyword: string;

  metaTitle: string;
  metaDescription: string;
  h1: { a: string; accent: string; b?: string };
  intro: string[];
  audience: string[];
  notFor: string;
  deliverables: { title: string; text: string }[];
  process: { title: string; text: string; time: string }[];
  priceNote: string;
  faq: { q: string; a: string }[];
  relatedIndustries: IndustrySlug[];
  relatedProjects: string[];
  relatedPosts: string[];
  relatedServices: string[];
};

export const services: Service[] = [
  {
    slug: "landing-page",
    name: "Landing page",
    promise: "Jedna strona, jeden cel: telefon albo zapytanie od klienta.",
    forWho: "Usługi lokalne, start nowej firmy, kampania reklamowa, jeden produkt.",
    priceFrom: 500,
    timeline: "3–5 dni",
    includes: ["Projekt pod Twoją markę", "Teksty, które prowadzą do kontaktu", "Formularz + klik-do-zadzwonienia", "Podstawowe SEO i Google Maps", "Hosting i domena — pomogę skonfigurować"],
    keyword: "landing page",
    metaTitle: "Landing page od 500 zł — gotowy w 5 dni",
    metaDescription:
      "Landing page, który zbiera telefony i zapytania: projekt pod Twoją markę, teksty, formularz, SEO lokalne. Od 500 zł, gotowy w 3–5 dni. Wycena w 24h.",
    h1: { a: "Landing page, po którym telefon zaczyna", accent: "dzwonić" },
    intro: [
      "Landing page to jedna, dobrze poukładana strona z jednym zadaniem: sprawić, żeby odwiedzający zadzwonił, napisał albo zostawił numer. Bez rozbudowanego menu, bez dwudziestu podstron, bez zgadywania, gdzie kliknąć.",
      "Najlepiej działa tam, gdzie klient i tak szuka konkretnej usługi: hydraulik, taxi, kurs, gabinet, nowa firma albo kampania reklamowa. Zamiast wysyłać ludzi na ogólną wizytówkę, prowadzisz ich na stronę napisaną dokładnie pod to, czego szukali.",
    ],
    audience: [
      "Zaczynasz firmę i potrzebujesz czegoś więcej niż profil na Facebooku, a budżet jest ograniczony.",
      "Prowadzisz reklamy (Google Ads, Facebook) i potrzebujesz strony, na którą te kliknięcia mają trafiać.",
      "Sprzedajesz jedną usługę albo jeden produkt i nie potrzebujesz pełnej witryny firmowej.",
      "Masz już stronę-wizytówkę, ale dla jednej usługi chcesz osobne, mocniejsze wejście.",
    ],
    notFor:
      "Jeśli oferujesz kilkanaście różnych usług i chcesz, żeby każda z nich była osobno widoczna w Google, jedna strona nie wystarczy. Wtedy lepsza jest strona firmowa z podstronami.",
    deliverables: [
      { title: "Projekt pod Twoją markę", text: "Kolory, krój pisma i układ dopasowane do Twojej firmy. To nie szablon z podmienionym logo." },
      { title: "Teksty, które prowadzą do kontaktu", text: "Piszę nagłówek, opis oferty, odpowiedzi na typowe wątpliwości i wezwania do działania. Ty dajesz fakty, ja układam je tak, żeby klient dojechał do przycisku." },
      { title: "Formularz i klik-do-zadzwonienia", text: "Na telefonie numer dzwoni jednym dotknięciem. Formularz ma tylko te pola, które naprawdę są potrzebne." },
      { title: "Podstawowe SEO i Google Maps", text: "Tytuł, opis, szybkie ładowanie, dane lokalne i mapa, żeby Google wiedziało, czym się zajmujesz i gdzie." },
      { title: "Domena i hosting", text: "Pomagam kupić i skonfigurować domenę oraz hosting. Konta zakładasz na siebie, więc wszystko zostaje Twoje." },
    ],
    process: [
      { title: "Rozmowa i wycena", text: "Kilkanaście minut rozmowy albo wiadomość. Wycenę dostajesz w ciągu 24 godzin.", time: "24 h" },
      { title: "Materiały i teksty", text: "Zbieram zdjęcia, ofertę i opinie. Brakujące teksty piszę sam.", time: "1 dzień" },
      { title: "Projekt i wdrożenie", text: "Pokazuję działającą wersję, nie makietę w PDF. Poprawki zgłaszasz na żywo.", time: "1–3 dni" },
      { title: "Start i opieka", text: "Publikacja, podpięcie domeny, Google Search Console. Przez 30 dni masz wsparcie techniczne: gdyby coś przestało działać, naprawiam bez dopłat.", time: "1 dzień" },
    ],
    priceNote:
      "Od 500 zł za landing page z jednym celem i jednym formularzem. Cena rośnie, gdy dochodzą: własne zdjęcia lub grafiki, wersje językowe, integracja z kalendarzem rezerwacji albo kilka rozbudowanych sekcji z ofertą. Dokładną kwotę poznasz w wycenie, bez ukrytych pozycji.",
    faq: [
      { q: "Czy sam landing page wystarczy, żeby być w Google?", a: "Na frazy lokalne, na przykład „taxi Sokółka”, często tak, jeśli strona jest dobrze zrobiona, a Ty masz uzupełniony Profil Firmy w Google. Przy większej liczbie usług warto dołożyć podstrony." },
      { q: "Kto pisze teksty?", a: "Ja. Ty podajesz fakty: czym się zajmujesz, ile to kosztuje, gdzie działasz. Ja układam je w tekst, który prowadzi do kontaktu. Gotowe teksty od Ciebie też przyjmę i dopasuję do układu." },
      { q: "Czy mogę później rozbudować landing do pełnej strony?", a: "Tak. Budowane w tej samej technologii co strony firmowe, więc dokładam podstrony bez przebudowy od zera." },
      { q: "Ile to trwa?", a: "Typowo 3–5 dni od chwili, gdy dostanę materiały. Im szybciej odpowiadasz na pytania, tym szybciej strona jest online." },
    ],
    relatedIndustries: ["uslugi", "transport", "gabinety"],
    relatedProjects: ["taxi-sokolka", "majster-bb"],
    relatedPosts: ["strona-internetowa-czy-facebook", "ile-kosztuje-strona-internetowa"],
    relatedServices: ["strona-firmowa", "pozycjonowanie-seo"],
  },
  {
    slug: "strona-firmowa",
    name: "Strona firmowa",
    promise: "Wizytówka, po której klient wie, że jesteś najlepszym wyborem w okolicy.",
    forWho: "Firmy usługowe, gabinety, restauracje, hotele, warsztaty, budowlanka.",
    priceFrom: 1500,
    timeline: "1–2 tygodnie",
    includes: ["4 podstrony w cenie, kolejne po 200 zł", "Oferta, realizacje, opinie, kontakt", "SEO lokalne pod Twoje miasto", "Panel do edycji treści w cenie", "Analityka i Google Search Console"],
    keyword: "strona internetowa dla firmy",
    metaTitle: "Strona internetowa dla firmy od 1500 zł",
    metaDescription:
      "Strona firmowa: oferta, realizacje, opinie, kontakt i SEO lokalne. Od 1500 zł, gotowa w 1–2 tygodnie. Bezpłatna wycena w 24h.",
    h1: { a: "Strona firmowa, która robi dobre", accent: "pierwsze wrażenie" },
    intro: [
      "Strona firmowa to Twoja wizytówka dostępna 24 godziny na dobę. Klient szuka Cię w Google, wchodzi na telefonie, w kilkanaście sekund ocenia, czy jesteś kimś, komu można zaufać, i dzwoni albo idzie do konkurencji.",
      "Dlatego buduję ją tak, żeby od razu odpowiadała na trzy pytania: czym się zajmujesz, czy robisz to dobrze i jak się z Tobą skontaktować. Reszta to szczegóły, które decydują, czy ta strona będzie pracować na Twoje zlecenia.",
    ],
    audience: [
      "Masz firmę usługową, gabinet, warsztat, restaurację albo hotel i chcesz być widoczny w swoim mieście.",
      "Klienci pytają o ofertę i cennik, a Ty odpowiadasz na te same pytania po raz setny.",
      "Masz tylko profil na Facebooku i czujesz, że część klientów szuka Cię w Google i nie znajduje.",
      "Chcesz pokazać realizacje, certyfikaty i opinie w jednym uporządkowanym miejscu.",
    ],
    notFor:
      "Jeśli chcesz sprzedawać produkty z koszykiem i płatnościami, potrzebujesz sklepu internetowego. Jeśli masz jedną usługę i krótki budżet, landing page będzie szybszy i tańszy.",
    deliverables: [
      { title: "Tyle podstron, ile potrzebujesz", text: "W cenie bazowej 4 podstrony, każda kolejna 200 zł. Typowo: strona główna, oferta, poszczególne usługi, o firmie, realizacje, opinie, kontakt. Podstrony usług są ważne dla Google, bo każda może wchodzić na inną frazę." },
      { title: "Realizacje i opinie", text: "Zdjęcia prac, opisy zleceń i opinie klientów ułożone tak, żeby budowały zaufanie, zanim klient w ogóle zadzwoni." },
      { title: "SEO lokalne pod Twoje miasto", text: "Struktura, tytuły i treści pod frazy z nazwą miejscowości, dane firmy zgodne z Profilem Firmy w Google, mapa dojazdu." },
      { title: "Panel do edycji treści", text: "W cenie. Sam zmieniasz ceny i godziny otwarcia czy dodajesz zdjęcia w prostym panelu, bez uczenia się programowania. Pokazuję, jak z niego korzystać." },
      { title: "Analityka i Search Console", text: "Wiesz, ile osób wchodzi na stronę, skąd i na jakie frazy Cię znajdują. Bez zgadywania, co działa." },
    ],
    process: [
      { title: "Rozmowa i zakres", text: "Ustalamy, jakie podstrony potrzebujesz i co ma robić strona. Dostajesz wycenę w 24 godziny.", time: "1 dzień" },
      { title: "Struktura i treści", text: "Układam mapę strony i piszę teksty na bazie rozmowy i Twoich materiałów.", time: "2–3 dni" },
      { title: "Projekt i budowa", text: "Pokazuję działającą stronę, nie obrazki. Zbieram uwagi i poprawiam na bieżąco.", time: "4–7 dni" },
      { title: "Start i opieka", text: "Publikacja, SEO, Search Console, przekierowania. Przez 30 dni wsparcie techniczne w cenie.", time: "1 dzień" },
    ],
    priceNote:
      "Od 1500 zł za stronę z 4 podstronami, każda kolejna 200 zł. Na cenę wpływa liczba podstron, to czy dostarczasz teksty i zdjęcia, czy mam je przygotować, wersje językowe oraz integracje (rezerwacje, kalendarz, wyszukiwarka ofert). Wycena jest zawsze stała, a nie godzinowa.",
    faq: [
      { q: "Ile kosztuje strona internetowa dla firmy?", a: "Strona firmowa zaczyna się od 1500 zł. Panel do edycji treści jest w cenie. Rozbudowane projekty z wieloma podstronami lub integracjami kosztują więcej. Wycenę dostajesz w 24 godziny, a o czynnikach ceny piszę w artykule na blogu." },
      { q: "Czy dostanę dostęp do panelu i będę mógł sam zmieniać treści?", a: "Tak, panel do edycji treści jest w cenie strony firmowej i pokazuję, jak z niego korzystać. Jeśli wolisz nie dotykać strony, wystarczy jeden telefon, a zmiany wprowadzę ja." },
      { q: "Czy strona będzie widoczna w Google?", a: "Zadbam o całe techniczne SEO i lokalne treści pod Twoje miasto. Pozycje zależą jednak także od konkurencji i Profilu Firmy w Google. Nikt uczciwy nie obieca Ci „pierwszego miejsca”." },
      { q: "Czy ktoś może zobaczyć moją stronę przed zapłatą całości?", a: "Tak. Pokazuję działającą wersję w trakcie pracy, więc nie kupujesz kota w worku. Zasady płatności ustalamy z góry, razem z wyceną." },
    ],
    relatedIndustries: ["uslugi", "budowlanka", "gabinety", "hotele"],
    relatedProjects: ["majster-bb", "weterynarz-lopaciuk", "sigma-sokolka"],
    relatedPosts: ["ile-kosztuje-strona-internetowa", "klienci-z-google-w-swoim-miescie"],
    relatedServices: ["landing-page", "redesign-strony", "pozycjonowanie-seo"],
  },
  {
    slug: "sklep-internetowy",
    name: "Sklep internetowy",
    promise: "Sklep, który wygląda premium i sprzedaje od pierwszego dnia.",
    forWho: "Sprzedaż produktów online, przejście z Allegro / OLX / Facebooka na własny sklep.",
    priceFrom: 3500,
    timeline: "2–4 tygodnie",
    includes: ["Do 50 produktów w cenie bazowej", "Katalog produktów z wariantami", "Płatności BLIK, Przelewy24, karty", "Integracja z kurierami i InPost", "Panel zamówień", "SEO kategorii i produktów"],
    keyword: "sklep internetowy",
    metaTitle: "Sklep internetowy na zamówienie od 3500 zł",
    metaDescription:
      "Własny sklep internetowy: katalog z wariantami, BLIK i Przelewy24, kurierzy i InPost, panel zamówień, SEO produktów. Od 3500 zł, 2–4 tygodnie.",
    h1: { a: "Własny sklep internetowy, który", accent: "sprzedaje" },
    intro: [
      "Sprzedajesz na Allegro, OLX albo przez Facebooka i płacisz prowizje od każdej złotówki? Własny sklep nie zastąpi marketplace’u z dnia na dzień, ale daje coś, czego platformy nie dadzą: Twoją markę, Twoich klientów i marżę bez pośrednika.",
      "Buduję sklepy, które ładują się szybko, dobrze wyglądają na telefonie i mają dopracowany koszyk, bo to właśnie tam przepada najwięcej zamówień. Do tego płatności, dostawy i panel, w którym obsługujesz zamówienia bez nauki programowania.",
    ],
    audience: [
      "Sprzedajesz produkty na Allegro lub w mediach społecznościowych i chcesz mieć własny kanał sprzedaży.",
      "Masz sklep na szablonie, który jest wolny, nieczytelny albo ogranicza to, co możesz zrobić.",
      "Sprzedajesz produkty z wariantami (rozmiar, kolor) albo wypożyczasz i potrzebujesz czegoś więcej niż prosty katalog.",
      "Planujesz zacząć sprzedaż online i chcesz zbudować to dobrze od początku.",
    ],
    notFor:
      "Jeśli masz kilka produktów i sprzedajesz je okazjonalnie, sklep może być przesadą. Wystarczy landing page z formularzem zamówienia albo gotowy marketplace. Sklep zaczyna mieć sens, gdy zamówienia przychodzą regularnie.",
    deliverables: [
      { title: "Katalog z wariantami", text: "Produkty, kategorie, rozmiary, kolory, stany magazynowe i zdjęcia, ułożone tak, żeby klient znalazł to, czego szuka, w kilku kliknięciach." },
      { title: "Płatności online", text: "BLIK, Przelewy24 i karty. Klient płaci tak, jak jest przyzwyczajony, a Ty nie czekasz na przelewy." },
      { title: "Dostawy i InPost", text: "Integracja z kurierami i paczkomatami, żeby klient wybierał dostawę w koszyku, a Ty nie przepisywałeś adresów ręcznie." },
      { title: "Panel zamówień", text: "Widzisz zamówienia, zmieniasz statusy, dodajesz produkty i ceny. Wszystko w jednym, prostym miejscu." },
      { title: "SEO kategorii i produktów", text: "Czytelne adresy, opisy, dane strukturalne produktów i szybkie ładowanie, żeby klienci mogli trafiać do sklepu także z Google." },
    ],
    process: [
      { title: "Analiza i wycena", text: "Ustalamy, co sprzedajesz, jak dostarczasz i jakie płatności potrzebujesz. Wycena w 24 godziny.", time: "1–2 dni" },
      { title: "Projekt i układ sklepu", text: "Projektuję katalog, kartę produktu i koszyk. Zatwierdzasz, zanim zacznę budować.", time: "3–5 dni" },
      { title: "Budowa i integracje", text: "Płatności, dostawy, panel, import produktów. Testujesz na działającej wersji.", time: "1–2 tygodnie" },
      { title: "Testy i start", text: "Zamówienia próbne, SEO, publikacja. Po starcie 30 dni wsparcia technicznego bez dopłat.", time: "2–3 dni" },
    ],
    priceNote:
      "Od 3500 zł za sklep z katalogiem, płatnościami i dostawami. Cenę podnoszą: duża liczba produktów i wariantów, import z innego systemu, integracje z hurtownią lub systemem magazynowym, wersje językowe i niestandardowe funkcje. Koszty po stronie operatorów płatności i hostingu rozliczasz bezpośrednio z nimi.",
    faq: [
      { q: "Czy własny sklep zastąpi Allegro?", a: "Zwykle nie od razu. Dla większości firm sensowne jest sprzedawanie w obu miejscach: Allegro daje ruch, własny sklep daje markę i lepszą marżę na stałych klientach. Więcej piszę o tym na blogu." },
      { q: "Ile kosztuje sklep internetowy?", a: "Od 3500 zł. Ostateczna kwota zależy od liczby produktów, integracji i funkcji. Wycenę dostajesz w 24 godziny." },
      { q: "Czy będę mógł sam dodawać produkty?", a: "Tak. Dostajesz panel, w którym dodajesz produkty, zmieniasz ceny i obsługujesz zamówienia. Pokażę Ci to na wideo albo na spotkaniu." },
      { q: "Które płatności i kurierzy są dostępne?", a: "Standardowo BLIK, Przelewy24 i karty oraz InPost i firmy kurierskie. Jeśli używasz innego operatora, sprawdzę, czy da się go podłączyć." },
    ],
    relatedIndustries: ["e-commerce", "uslugi"],
    relatedProjects: ["kino-ton"],
    relatedPosts: ["wlasny-sklep-czy-allegro", "ile-kosztuje-strona-internetowa"],
    relatedServices: ["pozycjonowanie-seo", "aplikacje-ai"],
  },
  {
    slug: "redesign-strony",
    name: "Redesign strony",
    promise: "Twoja stara strona, tylko szybsza, ładniejsza i taka, która zbiera zapytania.",
    forWho: "Firmy ze stroną sprzed lat, wolną, nieczytelną na telefonie albo bez efektów.",
    priceFrom: 1200,
    timeline: "1–2 tygodnie",
    includes: ["Audyt obecnej strony", "Nowy projekt z zachowaniem pozycji w Google", "Przeniesienie treści", "Przekierowania 301", "Pomiar przed i po"],
    keyword: "redesign strony internetowej",
    metaTitle: "Redesign strony internetowej od 1200 zł",
    metaDescription:
      "Odświeżenie starej strony: audyt, nowy projekt, przeniesienie treści i przekierowania 301, żeby nie stracić pozycji w Google. Od 1200 zł, 1–2 tygodnie.",
    h1: { a: "Redesign strony bez utraty pozycji w", accent: "Google" },
    intro: [
      "Strona sprzed kilku lat często wygląda przyzwoicie na komputerze, a na telefonie ładuje się wieki i ma przyciski, w które trudno trafić. Klient wchodzi, nie widzi numeru, wychodzi. Ty nie dowiadujesz się, że w ogóle był.",
      "Redesign to nie tylko nowa szata graficzna. Zaczynam od audytu: sprawdzam, co działa, co Ci przynosi ruch i czego nie wolno ruszyć. Dopiero potem projektuję nową wersję, która zachowuje dobre rzeczy i usuwa ten balast.",
    ],
    audience: [
      "Twoja strona ładuje się wolno albo źle wygląda na telefonie.",
      "Wygląda przestarzale i wstydzisz się podać do niej link nowym klientom.",
      "Nie możesz sam niczego zmienić i każda poprawka to wielki projekt.",
      "Masz dobre pozycje w Google na kilka fraz i boisz się, że nowa strona je zepsuje.",
    ],
    notFor:
      "Jeśli strona jest dobra i po prostu nikt na nią nie wchodzi, problemem nie jest wygląd, tylko widoczność w Google. Zacznij wtedy od usługi SEO albo od darmowego audytu.",
    deliverables: [
      { title: "Audyt obecnej strony", text: "Sprawdzam prędkość, zgodność z telefonami, strukturę, treści i to, jakie podstrony przynoszą Ci ruch z Google. Dostajesz listę rzeczy do zachowania i do wyrzucenia." },
      { title: "Nowy projekt", text: "Nowy układ i wygląd, ale z zachowaniem adresów i treści, które w Google mają wartość." },
      { title: "Przeniesienie treści", text: "Teksty, zdjęcia i opinie przenoszę na nową stronę, poprawiając to, co mocno kuleje." },
      { title: "Przekierowania 301", text: "Stare adresy kierują na nowe, więc pozycje w Google i linki z innych stron nie przepadają." },
      { title: "Pomiar przed i po", text: "Mierzę prędkość i widoczność przed zmianą oraz po niej, więc widać efekt, a nie tylko wrażenie." },
    ],
    process: [
      { title: "Audyt", text: "Sprawdzam obecną stronę, ruch i to, co trzeba zachować. Dostajesz wycenę w 24 godziny.", time: "1 dzień" },
      { title: "Projekt nowej wersji", text: "Przygotowuję nowy układ i pokazuję go na działającej stronie.", time: "2–5 dni" },
      { title: "Przeniesienie i przekierowania", text: "Treści, adresy, przekierowania 301, mapa strony w Google Search Console.", time: "1–3 dni" },
      { title: "Start i pomiar", text: "Publikacja, kontrola indeksowania i porównanie wyników przed i po.", time: "1 dzień" },
    ],
    priceNote:
      "Od 1200 zł. Cena zależy od liczby podstron do przeniesienia, stanu obecnych treści, tego, czy potrzebny jest panel i czy strona stoi na własnym systemie, który trzeba rozpracować. Przy dużych stronach z długą historią wycena opiera się na audycie.",
    faq: [
      { q: "Czy po redesignie spadnę w Google?", a: "Przy poprawnie zrobionych przekierowaniach 301 i zachowanych adresach ryzyko jest małe. Po zmianie pozycje potrafią chwilę się ruszać, dlatego pilnuję Search Console i porównuję wyniki przed i po." },
      { q: "Czy mogę zostać przy swojej domenie?", a: "Tak, zwykle zostajesz przy tej samej domenie i adresach, co chroni wypracowaną widoczność." },
      { q: "Czy muszę przepisywać wszystkie teksty?", a: "Nie. Przenoszę to, co dobre, a słabe fragmenty poprawiamy razem. Nowe teksty piszę na Twoją prośbę." },
      { q: "Skąd mam wiedzieć, czy redesign mi się opłaca?", a: "Zacznij od darmowego audytu strony. Pokaże, czy problemem jest szybkość, układ, czy brak widoczności w Google, i czy warto robić redesign." },
    ],
    relatedIndustries: ["uslugi", "budowlanka", "motoryzacja"],
    relatedProjects: ["profesjonalne-remonty", "zak-auto"],
    relatedPosts: ["wolna-strona-kosztuje-klientow", "ile-kosztuje-strona-internetowa"],
    relatedServices: ["strona-firmowa", "pozycjonowanie-seo"],
  },
  {
    slug: "pozycjonowanie-seo",
    name: "SEO i widoczność w Google",
    promise: "Żeby klient z Twojego miasta znalazł Ciebie, a nie konkurencję.",
    forWho: "Firmy, które mają stronę, ale nikt na nią nie trafia.",
    priceFrom: 600,
    timeline: "od tygodnia",
    includes: ["Analiza fraz w Twojej okolicy", "Optymalizacja techniczna", "Profil Firmy w Google", "Treści pod konkretne usługi", "Raport widoczności"],
    keyword: "pozycjonowanie stron",
    metaTitle: "Pozycjonowanie stron i SEO lokalne od 600 zł",
    metaDescription:
      "SEO lokalne i pozycjonowanie dla firm: analiza fraz, optymalizacja techniczna, Profil Firmy w Google, treści i raport. Od 600 zł, bez obietnic „TOP 1”.",
    h1: { a: "Żeby klient z Twojego miasta znalazł", accent: "Ciebie" },
    intro: [
      "Masz stronę, a telefon milczy? Najczęściej problem nie leży w wyglądzie, tylko w tym, że Google nie wie, czym się zajmujesz i dla kogo. Albo wie, ale konkurencja ma lepiej poukładane dane, treści i opinie.",
      "Zajmuję się przede wszystkim SEO lokalnym: frazami typu „usługa + miasto”, Profilem Firmy w Google i tym, żeby strona była szybka i zrozumiała dla wyszukiwarki. Nie obiecuję miejsc na szczycie, bo nikt rzetelny ich nie gwarantuje. Obiecuję uporządkowaną robotę i raport, który pokazuje, co się zmieniło.",
    ],
    audience: [
      "Masz stronę, ale nie trafiają na nią klienci z Google.",
      "Chcesz być widoczny w Mapach Google i w wynikach dla swojego miasta.",
      "Konkurencja jest wyżej, a Ty nie wiesz dlaczego.",
      "Planujesz nową stronę i chcesz od razu zadbać o to, żeby była widoczna.",
    ],
    notFor:
      "Jeśli strona jest tak słaba, że trzeba ją przebudować (wolna, nieczytelna, bez podstron usług), SEO bez redesignu da niewiele. Wtedy zaczynamy od przebudowy albo łączymy oba zakresy.",
    deliverables: [
      { title: "Analiza fraz w Twojej okolicy", text: "Sprawdzam, czego faktycznie szukają Twoi klienci i co już robi konkurencja, i wybieram frazy, na które masz realną szansę." },
      { title: "Optymalizacja techniczna", text: "Prędkość, indeksowanie, tytuły, opisy, dane strukturalne, mapa strony i poprawne adresy. To fundament, bez którego treści nie pomogą." },
      { title: "Profil Firmy w Google", text: "Uzupełniam i porządkuję wizytówkę: kategorie, usługi, zdjęcia, godziny, opis i sposób zbierania opinii." },
      { title: "Treści pod konkretne usługi", text: "Opisy usług i podstrony pisane pod to, jak ludzie naprawdę wyszukują, a nie pod wyszukiwarkę." },
      { title: "Raport widoczności", text: "Prosty raport, z którego wynika, co zostało zrobione i jak zmieniły się wyświetlenia, kliknięcia i pozycje." },
    ],
    process: [
      { title: "Audyt startowy", text: "Sprawdzam stronę, Profil Firmy i konkurencję. Dostajesz wycenę w 24 godziny.", time: "1–2 dni" },
      { title: "Poprawki techniczne", text: "Naprawiam błędy, przyspieszam stronę, porządkuję strukturę.", time: "2–5 dni" },
      { title: "Treści i Profil Firmy", text: "Dodaję i poprawiam treści, zdjęcia i dane w wizytówce Google.", time: "1 tydzień" },
      { title: "Raport i dalsze kroki", text: "Pokazuję, co się zmieniło, i wskazuję, co jeszcze warto zrobić. Decydujesz, czy kontynuujemy.", time: "po miesiącu" },
    ],
    priceNote:
      "Od 600 zł za uporządkowanie podstaw: audyt, poprawki techniczne i Profil Firmy. Cena rośnie, gdy trzeba napisać wiele treści pod usługi, przebudować strukturę strony albo prowadzić działania w dłuższym okresie. Efekty SEO są rozłożone w czasie, więc zaplanuj kilka miesięcy, a nie kilka dni.",
    faq: [
      { q: "Czy gwarantujesz pierwsze miejsce w Google?", a: "Nie, i uciekaj od każdego, kto to robi. Algorytm należy do Google. Mogę zadbać o to, żeby Twoja strona i wizytówka były poukładane lepiej niż u większości konkurencji w Twoim mieście, i pokazać to w raporcie." },
      { q: "Po jakim czasie zobaczę efekty?", a: "Pierwsze zmiany w wynikach pojawiają się zwykle po kilku tygodniach, a wyraźny efekt po kilku miesiącach. Przy nowej stronie lub konkurencyjnej branży trwa to dłużej." },
      { q: "Czy muszę mieć stronę zrobioną przez Ciebie?", a: "Nie. Pracuję także na istniejących stronach. Jeśli są technicznie ograniczone, uczciwie Ci to powiem i zaproponuję rozwiązanie." },
      { q: "Czy Profil Firmy w Google jest ważniejszy od strony?", a: "Dla lokalnej firmy często tak samo ważny. Wizytówka w Mapach to pierwsze, co widzi klient. Najlepiej działają razem. Więcej piszę o tym na blogu." },
    ],
    relatedIndustries: ["uslugi", "gabinety", "restauracje", "hotele"],
    relatedProjects: ["taxi-sokolka", "jp-auto"],
    relatedPosts: ["klienci-z-google-w-swoim-miescie", "wolna-strona-kosztuje-klientow"],
    relatedServices: ["strona-firmowa", "redesign-strony"],
  },
  {
    slug: "aplikacje-ai",
    name: "Aplikacje i integracje AI",
    promise: "Panele, kalkulatory, automatyzacje i AI, które oszczędzają Ci godziny pracy.",
    forWho: "Firmy, które potrzebują czegoś więcej niż strona — jak PV Spectra.",
    priceFrom: null,
    timeline: "indywidualnie",
    includes: ["Panele klienta i dashboardy", "Integracje API i automatyzacje", "Asystenci AI na stronie", "Kalkulatory i konfiguratory", "Wdrożenie i utrzymanie"],
    keyword: "aplikacje webowe AI",
    metaTitle: "Aplikacje webowe i integracje AI na zamówienie",
    metaDescription:
      "Aplikacje webowe, panele klienta, kalkulatory i integracje AI dla firm. Autor PV Spectra, platformy AI do analizy farm fotowoltaicznych. Wycena indywidualna.",
    h1: { a: "Aplikacje i AI, które", accent: "oszczędzają", b: " Ci godziny" },
    intro: [
      "Czasem strona to za mało. Zapytania przychodzą mailem i trzeba je przepisywać do arkusza. Klient chce zalogować się i zobaczyć status zamówienia. Wycena wymaga godzin liczenia, a mogłaby policzyć się sama. W takich miejscach zaczyna się aplikacja.",
      "Buduję narzędzia webowe szyte pod konkretny proces: panele klienta, kalkulatory, konfiguratory, automatyzacje i integracje z AI. Pokazuję to na swoim przykładzie: PV Spectra to platforma, w której moduł AI analizuje zdjęcia termowizyjne z dronów i wskazuje usterki w panelach fotowoltaicznych.",
    ],
    audience: [
      "Powtarzasz te same czynności ręcznie: przepisujesz zapytania, liczysz wyceny, wysyłasz raporty.",
      "Chcesz dać klientom panel do logowania, w którym widzą swoje zamówienia, dokumenty lub raporty.",
      "Masz pomysł na produkt cyfrowy (SaaS) i potrzebujesz kogoś, kto zbuduje działający prototyp.",
      "Chcesz wprowadzić AI do swojej firmy, ale rozsądnie, tam, gdzie naprawdę coś ułatwia.",
    ],
    notFor:
      "Jeśli potrzebujesz zwykłej strony, nie ma sensu budować aplikacji. Zaczynamy od najprostszego rozwiązania, które rozwiązuje problem, a AI dokładamy tylko tam, gdzie daje wartość.",
    deliverables: [
      { title: "Panele klienta i dashboardy", text: "Logowanie, widoki danych, raporty i uprawnienia, żeby klient lub zespół mieli wszystko w jednym miejscu." },
      { title: "Integracje i automatyzacje", text: "Połączenia z Twoimi narzędziami przez API: mail, płatności, arkusze, CRM. Koniec z przepisywaniem danych." },
      { title: "Asystenci AI", text: "Asystent odpowiadający na pytania klientów na podstawie Twoich treści albo moduły analizujące dokumenty i obrazy. Z zasadami, które ograniczają błędy." },
      { title: "Kalkulatory i konfiguratory", text: "Klient sam liczy wstępną cenę lub składa ofertę, a Ty dostajesz gotowe zapytanie ze szczegółami." },
      { title: "Wdrożenie i utrzymanie", text: "Aplikacja działa na stabilnej infrastrukturze, a Ty wiesz, kto reaguje, gdy coś się zepsuje." },
    ],
    process: [
      { title: "Rozmowa i zakres", text: "Rozmawiamy o procesie, który chcesz ułatwić. Dostajesz wstępną wycenę i propozycję pierwszego etapu.", time: "kilka dni" },
      { title: "Prototyp", text: "Buduję najprostszą działającą wersję, żebyś mógł ją sprawdzić na prawdziwych danych.", time: "1–2 tygodnie" },
      { title: "Rozbudowa", text: "Dokładam funkcje etapami, każdy etap wyceniony osobno.", time: "wg zakresu" },
      { title: "Wdrożenie i utrzymanie", text: "Publikacja, szkolenie, monitoring i dalszy rozwój w ramach umowy.", time: "ciągle" },
    ],
    priceNote:
      "Tu nie ma cennika od-do, bo każdy projekt jest inny. Zaczynamy od małego, wycenionego etapu (prototyp lub jedna funkcja), a dalsze etapy dobieramy po jego sprawdzeniu. Dzięki temu nie płacisz z góry za coś, co jeszcze nie działa.",
    faq: [
      { q: "Ile kosztuje aplikacja webowa?", a: "Zależy od zakresu, dlatego wycena jest indywidualna. Zwykle zaczynam od małego etapu z ustaloną ceną, żebyś nie ryzykował dużej kwoty z góry." },
      { q: "Do czego realnie przydaje się AI w małej firmie?", a: "Najczęściej do odpowiadania na powtarzalne pytania klientów, porządkowania dokumentów, streszczania i analizy zdjęć lub danych. Tam, gdzie zadanie jest powtarzalne i jasne, AI sprawdza się dobrze." },
      { q: "Czy kod i dane będą moje?", a: "Tak. Ustalamy to w umowie. Konta i infrastruktura zakładane są na Twoją firmę." },
      { q: "Czy zajmujesz się też utrzymaniem aplikacji?", a: "Tak, w ramach osobnej umowy. Aplikacja żyje: wymaga aktualizacji, monitoringu i drobnych poprawek." },
    ],
    relatedIndustries: ["energetyka", "e-commerce"],
    relatedProjects: ["pv-spectra", "omniway"],
    relatedPosts: ["ile-kosztuje-strona-internetowa", "wlasny-sklep-czy-allegro"],
    relatedServices: ["sklep-internetowy", "strona-firmowa"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const formatPLN = (n: number) =>
  new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(n) + " zł";

export const servicesFor = (locale: Locale) => (locale === "en" ? servicesEn : services);
export const getServiceFor = (slug: string, locale: Locale) => servicesFor(locale).find((s) => s.slug === slug);

export const formatPrice = (n: number, locale: Locale) =>
  locale === "en" ? `PLN ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n)}` : formatPLN(n);
