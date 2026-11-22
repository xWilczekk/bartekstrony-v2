import type { Locale } from "@/i18n/config";
import type { IndustrySlug } from "./projects";

export type Industry = {
  slug: IndustrySlug;
  name: string;
  forName: string;
  hook: string;

  metaTitle: string;
  metaDescription: string;
  h1: { a: string; accent: string; b?: string };
  intro: string;
  problems: { title: string; text: string }[];
  mustHave: { title: string; text: string }[];
  searchPhrases: string[];
  serviceSlug: string;
  priceNote: string;
  faq: { q: string; a: string }[];
  relatedPosts: string[];
};

export const industries: Industry[] = [
  {
    slug: "restauracje",
    name: "Restauracje i gastronomia",
    forName: "restauracji i lokali gastronomicznych",
    hook: "Menu, rezerwacje i zamówienia jednym kliknięciem.",
    metaTitle: "Strony internetowe dla restauracji i barów",
    metaDescription:
      "Strona restauracji z menu, rezerwacją stolika, mapą i zamówieniem telefonicznym jednym kliknięciem. Realizacje: Zacisze, Kebab Nazar, Kącik Smaku. Od 500 zł.",
    h1: { a: "Strona internetowa dla restauracji, która", accent: "napełnia stoliki" },
    intro:
      "Gość wyciąga telefon, wpisuje „kebab” albo „restauracja” i nazwę miasta, a po kilku sekundach wybiera miejsce. Jeśli nie widzi menu, godzin otwarcia i numeru telefonu, wybiera następne. Strona restauracji ma jedno zadanie: dać mu to wszystko, zanim straci cierpliwość.",
    problems: [
      { title: "Menu jako PDF albo zdjęcie", text: "Na telefonie trzeba je powiększać, nie da się w nim niczego znaleźć, a Google nie czyta tekstu ze zdjęcia. Menu powinno być zwykłym tekstem na stronie, z cenami." },
      { title: "Nieaktualne godziny i ceny", text: "Gość jedzie pod zamknięte drzwi albo płaci więcej, niż widział w internecie, i zostawia gorszą opinię. Godziny na stronie i w Google muszą być takie same." },
      { title: "Telefon dzwoni, gdy kuchnia jest najbardziej zajęta", text: "Zamówienia i pytania o stolik przychodzą w godzinach szczytu. Przycisk „zadzwoń i zamów” oraz formularz rezerwacji odciążają obsługę." },
      { title: "Pośrednicy biorą swoją część", text: "Platformy z dostawą pobierają prowizję od każdego zamówienia. Własna strona z numerem i menu zostawia stałych gości przy Tobie." },
    ],
    mustHave: [
      { title: "Menu jako tekst, z cenami", text: "Podzielone na kategorie, czytelne na telefonie, z informacją o alergenach, którą i tak musisz podawać gościom." },
      { title: "Rezerwacja stolika", text: "Formularz albo przycisk telefonu, bez rejestracji i bez zbędnych pól. Najważniejsza jest data, godzina i liczba osób." },
      { title: "Godziny, mapa i dojazd", text: "Widoczne od razu, z mapą Google i informacją o parkingu. To najczęściej szukana informacja o lokalu." },
      { title: "Zamawianie jednym kliknięciem", text: "„Zadzwoń i zamów” na telefonie, a przy dostawie własnej: formularz z adresem i godziną odbioru." },
      { title: "Zdjęcia dań i wnętrza", text: "Prawdziwe, nie ze stocka. Ludzie jedzą oczami, a zdjęcia z Twojej kuchni budują zaufanie." },
      { title: "Opinie z Google", text: "Pokazane na stronie i spięte z Profilem Firmy, bo gość porównuje oceny, zanim wybierze lokal." },
      { title: "Imprezy i catering", text: "Osobna sekcja dla komunii, urodzin i firmowych spotkań, jeśli takie zamówienia przyjmujesz." },
    ],
    searchPhrases: ["restauracja + miasto", "kebab + miasto", "pizza z dostawą + miasto", "menu + nazwa lokalu", "rezerwacja stolika + miasto"],
    serviceSlug: "strona-firmowa",
    priceNote:
      "Lokal z jedną stroną, menu i mapą to landing page od 500 zł. Pełna strona z kilkoma podstronami, galerią i rezerwacją mieści się w stronie firmowej od 1500 zł. Własny system zamówień online z płatnością to osobny, droższy projekt i wycenię go indywidualnie.",
    faq: [
      { q: "Czy menu na stronie mogę zmieniać sam?", a: "Tak, strona firmowa ma panel do edycji w cenie. Możesz zmieniać ceny i dania bez znajomości kodu. Jeśli menu zmienia się rzadko, wygodniej jest, gdy aktualizuję je ja po jednym telefonie." },
      { q: "Czy strona zastąpi mi profil na Facebooku?", a: "Nie musi. Facebook dobrze działa na bieżące informacje, a strona jest miejscem, gdzie gość szuka menu i godzin. Najlepiej, gdy jedno kieruje do drugiego, a dane są takie same wszędzie." },
      { q: "Ile trwa zrobienie strony restauracji?", a: "Prosta strona z menu: kilka dni od dostarczenia zdjęć i menu. Rozbudowana z kilkoma podstronami: 1–2 tygodnie." },
      { q: "Czy zrobisz zamawianie online z płatnością?", a: "Tak, ale to osobny, większy projekt. Przy małym lokalu zwykle wystarcza telefon i formularz, a płatne zamawianie ma sens, gdy zamówień jest naprawdę dużo." },
    ],
    relatedPosts: ["strona-restauracji-checklista", "klienci-z-google-w-swoim-miescie"],
  },
  {
    slug: "budowlanka",
    name: "Budowlanka i remonty",
    forName: "firm budowlanych i remontowych",
    hook: "Realizacje, które sprzedają kolejne zlecenia.",
    metaTitle: "Strony internetowe dla firm remontowych",
    metaDescription:
      "Strona firmy remontowej z galerią realizacji, opisem współpracy i formularzem wyceny. Realizacje: Majster BB, Profesjonalne Remonty. Od 500 zł.",
    h1: { a: "Strona firmy remontowej, która", accent: "pokazuje robotę" },
    intro:
      "Klient szukający ekipy do remontu boi się trzech rzeczy: że wykonawca zniknie, że zrobi fuszerkę i że cena okaże się dwa razy wyższa. Dobra strona rozbraja te obawy, zanim klient w ogóle zadzwoni. A najlepsza reklama to Twoje własne zdjęcia po remoncie.",
    problems: [
      { title: "Realizacje zakopane na Facebooku", text: "Najlepsze zdjęcia leżą w albumach, których nikt nie przegląda. Klient nie widzi, że potrafisz, więc porównuje Cię wyłącznie ceną." },
      { title: "Nikt nie wie, jak wygląda współpraca", text: "Bez opisu etapów od oględzin, przez wycenę, po odbiór klient dopowiada sobie najgorsze. Proces na stronie uspokaja." },
      { title: "Pytania o cenę, które trzeba zadawać przez telefon", text: "Nie musisz podawać cennika. Wystarczy wyjaśnić, od czego zależy cena, i dać formularz, który zbierze potrzebne informacje do wyceny." },
      { title: "Google nie wie, gdzie działasz", text: "Ludzie szukają ekipy „w mojej okolicy”. Bez jasnego obszaru działania i lokalnych treści pokazujesz się komuś, kto mieszka 200 km dalej." },
    ],
    mustHave: [
      { title: "Galeria realizacji z opisem", text: "Zdjęcia przed i po, zakres prac i miejscowość. Konkretne zlecenia przekonują bardziej niż deklaracje." },
      { title: "Opis współpracy krok po kroku", text: "Oględziny, wycena, umowa, termin, odbiór. Klient wie, czego się spodziewać, i mniej się boi." },
      { title: "Formularz wyceny", text: "Kilka pytań: rodzaj prac, metraż, termin. Dostajesz zapytanie, na które możesz od razu odpowiedzieć." },
      { title: "Przycisk telefonu zawsze pod kciukiem", text: "Na telefonie przyklejony przycisk „zadzwoń” (jak w stronie Majster BB) skraca drogę od zainteresowania do rozmowy." },
      { title: "Obszar działania", text: "Lista miejscowości i okolic, w których pracujesz. Pomaga Google i klientom, którzy pytają, czy do nich dojedziesz." },
      { title: "Opinie i referencje", text: "Prawdziwe wypowiedzi klientów z imieniem i miejscowością. Budują zaufanie lepiej niż certyfikaty na ścianie." },
      { title: "Podstrony usług", text: "Osobna strona dla malowania, płytek, gładzi czy instalacji. Każda z nich może pozycjonować się na inną frazę." },
    ],
    searchPhrases: ["remonty mieszkań + miasto", "malowanie + miasto", "ekipa remontowa + miasto", "wykończenia wnętrz + miasto", "firma budowlana + miasto"],
    serviceSlug: "strona-firmowa",
    priceNote:
      "Firma z kilkoma usługami i galerią to zwykle strona firmowa od 1500 zł. Jeśli zaczynasz i potrzebujesz szybko jednej mocnej strony z formularzem wyceny, wystarczy landing page od 500 zł. Rozbudowa o podstrony usług i realizacje można robić etapami.",
    faq: [
      { q: "Czy muszę mieć dużo zdjęć realizacji?", a: "Wystarczy kilka dobrych zleceń z różnych usług. Zdjęcia z telefonu też się nadają, jeśli są ostre i robione przy dziennym świetle. Podpowiem, jak je ustawić, żeby wyglądały dobrze." },
      { q: "Czy mogę podać na stronie ceny?", a: "Możesz podać widełki lub cenę „od”. Wiele firm tego nie robi, ale wtedy warto napisać, od czego cena zależy. To odsiewa klientów szukających tylko najtańszej oferty i oszczędza Ci czas." },
      { q: "Czy mogę sam dodawać nowe realizacje?", a: "Tak, strona firmowa ma panel do edycji w cenie. Dodajesz zdjęcia i opis, strona pokazuje je od razu." },
      { q: "Czy to pomoże mi w Google?", a: "Tak, zwłaszcza w lokalnych frazach, o ile strona jest szybka, ma podstrony usług i uzupełniony Profil Firmy w Google. Efekty rozkładają się na tygodnie, nie dni." },
    ],
    relatedPosts: ["klienci-z-google-w-swoim-miescie", "strona-internetowa-czy-facebook"],
  },
  {
    slug: "motoryzacja",
    name: "Motoryzacja",
    forName: "warsztatów, komisów i wypożyczalni aut",
    hook: "Flota, katalog aut, rezerwacje online.",
    metaTitle: "Strony internetowe dla warsztatów i komisów",
    metaDescription:
      "Strona dla komisu, wypożyczalni lub warsztatu: katalog aut z cenami, rezerwacja online, historia pojazdów. Realizacje: JP-Auto, ZAK Auto. Od 500 zł.",
    h1: { a: "Strona dla komisu, warsztatu i wypożyczalni, która", accent: "pokazuje auta", b: " w najlepszym świetle" },
    intro:
      "W motoryzacji klient najpierw ogląda, potem dzwoni. Szuka konkretnego auta, terminu w warsztacie albo wolnego samochodu na weekend. Jeśli musi pytać o wszystko telefonicznie, część osób po prostu odpuści. Własna strona robi to, czego nie zrobi ogłoszenie na portalu: pokazuje całą ofertę, markę i zasady, na których pracujesz.",
    problems: [
      { title: "Cała oferta na cudzych portalach", text: "Ogłoszenia konkurują z tysiącami innych, a klient nie wie, kim jesteś. Własny katalog buduje markę i zostaje Twój." },
      { title: "Te same pytania w kółko", text: "Czy auto jest dostępne, jaka kaucja, czy da się odebrać wieczorem. Strona z jasnymi zasadami skraca rozmowy i odsiewa niepoważne zapytania." },
      { title: "Brak zaufania do komisu", text: "Klient obawia się ukrytych wad. Historia pojazdu, zdjęcia i opis stanu odpowiadają na to, zanim padnie pytanie." },
      { title: "Warsztat bez widocznych usług i cen", text: "Klient nie wie, czy zajmujesz się jego marką i ile to mniej więcej kosztuje. Bez tej informacji dzwoni do kogoś, kto ją podaje." },
    ],
    mustHave: [
      { title: "Katalog aut lub flota z cenami", text: "Zdjęcia, parametry, cena lub stawka za dobę. W wypożyczalni (jak JP-Auto) klient przegląda flotę i od razu wybiera samochód." },
      { title: "Karta pojazdu", text: "Osobna strona każdego auta: wiele zdjęć, rocznik, przebieg, wyposażenie i historia. W komisie (jak ZAK Auto) to najsilniejszy argument." },
      { title: "Rezerwacja lub zapytanie o auto", text: "Formularz z datą i autem już wybranym, żeby nie trzeba było pytać o to samo przez telefon." },
      { title: "Warunki najmu lub zakupu", text: "Kaucja, limity kilometrów, finansowanie, gwarancja. Spisane jasno, oszczędzają rozmowy i budują zaufanie." },
      { title: "Usługi warsztatu i cennik", text: "Lista usług z cenami „od” i markami, którymi się zajmujesz. Plus prosta rezerwacja terminu." },
      { title: "Dane firmy, mapa i godziny", text: "Adres, dojazd, godziny odbioru i oddania aut. Lokalne SEO działa tylko wtedy, gdy dane są spójne." },
    ],
    searchPhrases: ["wypożyczalnia aut + miasto", "komis samochodowy + miasto", "warsztat + marka auta + miasto", "wynajem auta na dobę + miasto", "auta z Niemiec + miasto"],
    serviceSlug: "strona-firmowa",
    priceNote:
      "Warsztat lub mała wypożyczalnia to strona firmowa od 1500 zł. Katalog z wieloma autami, filtrami i rezerwacją online jest bardziej rozbudowany i wyceniam go po rozmowie o tym, jak często zmienia się oferta i kto będzie ją aktualizował.",
    faq: [
      { q: "Czy mogę sam dodawać i usuwać auta z oferty?", a: "Tak. Przy częstych zmianach (komis, wypożyczalnia) polecam panel, w którym dodajesz auto, zdjęcia i cenę w kilka minut, bez dzwonienia do mnie." },
      { q: "Czy strona zastąpi ogłoszenia na portalach?", a: "Nie musi. Ogłoszenia dają ruch, a Twoja strona buduje markę i klientów, którzy wracają bez prowizji i konkurowania z innymi. Najlepiej, gdy ogłoszenia kierują na Twoją stronę." },
      { q: "Czy zrobisz rezerwację online z kalendarzem dostępności?", a: "Tak. Zakres zależy od tego, jak zarządzasz flotą. Zaczynamy od prostego formularza zapytania, a pełny kalendarz dokładam, jeśli jest potrzebny." },
      { q: "Ile kosztuje strona dla warsztatu?", a: "Prosta strona z usługami, cennikiem i mapą mieści się w cenie od 1500 zł, a ostateczną kwotę poznasz w wycenie w ciągu 24 godzin." },
    ],
    relatedPosts: ["klienci-z-google-w-swoim-miescie", "ile-kosztuje-strona-internetowa"],
  },
  {
    slug: "gabinety",
    name: "Gabinety i zdrowie",
    forName: "gabinetów lekarskich, weterynaryjnych i beauty",
    hook: "Spokój, zaufanie i rejestracja bez dzwonienia.",
    metaTitle: "Strony internetowe dla gabinetów i klinik",
    metaDescription:
      "Strona gabinetu lekarskiego, weterynaryjnego lub beauty: zespół, usługi, cennik, godziny przyjęć i rejestracja. Realizacja: Gabinet Łopaciuk. Od 1500 zł.",
    h1: { a: "Strona gabinetu, która budzi", accent: "zaufanie", b: " zanim pacjent wejdzie" },
    intro:
      "Do gabinetu wybieramy kogoś, komu powierzamy siebie, dziecko albo zwierzaka. Dlatego strona nie może być krzykliwa. Ma być spokojna, uporządkowana i konkretna: kto przyjmuje, w jakich godzinach, czym się zajmuje, ile to kosztuje i jak się umówić.",
    problems: [
      { title: "Pacjent wybiera twarz i spokój", text: "Bez zdjęć zespołu i krótkiego opisu, kim jesteś i jak pracujesz, strona wygląda bezosobowo. Ludzie wolą iść do kogoś, kogo już trochę znają." },
      { title: "Rejestracja blokuje się na telefonie", text: "Rejestracja odbiera telefony zamiast zajmować się osobami w gabinecie. Czytelna informacja i prosta forma umówienia odciążają ją." },
      { title: "Niejasny zakres i cennik", text: "Pacjent nie wie, czy zajmujesz się jego sprawą i ile to mniej więcej kosztuje. Niepewność kończy się wyborem kogoś innego." },
      { title: "Reklama w ochronie zdrowia ma swoje granice", text: "Teksty piszemy rzeczowo, bez obietnic wyleczenia i bez przesady. Zasady dla Twojej specjalizacji warto sprawdzić, a ja dopilnuję tonu strony." },
    ],
    mustHave: [
      { title: "Zespół ze zdjęciami i kwalifikacjami", text: "Imię, specjalizacja i kilka zdań o podejściu do pacjenta. To pierwszy element, który ludzie czytają." },
      { title: "Usługi z cennikiem lub widełkami", text: "Lista zabiegów lub usług z ceną „od”. Przejrzysty cennik (jak w gabinecie Łopaciuk) odsiewa pytania, na które nie ma sensu odpowiadać przez telefon." },
      { title: "Godziny przyjęć i dojazd", text: "Widoczne zaraz po wejściu, z mapą i informacją o dojeździe oraz parkingu." },
      { title: "Prosta rejestracja", text: "Numer telefonu klikany na komórce i opcjonalnie formularz do umówienia terminu. Formularz nie powinien zbierać danych o zdrowiu." },
      { title: "Zdjęcia gabinetu", text: "Pokazują, że miejsce jest czyste, spokojne i nowoczesne. Szczególnie ważne w beauty i weterynarii." },
      { title: "Informacje dla nowych pacjentów", text: "Co zabrać, jak się przygotować i jak przebiega pierwsza wizyta. Mniej stresu, mniej pytań." },
      { title: "Opinie", text: "Z Google i od stałych pacjentów, z ich zgodą. W gabinecie liczy się polecenie." },
    ],
    searchPhrases: ["weterynarz + miasto", "dentysta + miasto", "gabinet kosmetyczny + miasto", "fizjoterapeuta + miasto", "lekarz + specjalizacja + miasto"],
    serviceSlug: "strona-firmowa",
    priceNote:
      "Strona gabinetu z zespołem, usługami, cennikiem i mapą to strona firmowa od 1500 zł. Rejestracja online z kalendarzem jest dodatkiem i wymaga osobnej wyceny, bo zależy od tego, jakiego systemu używa gabinet.",
    faq: [
      { q: "Czy mogę podać na stronie opinie pacjentów?", a: "Opinie z Google możesz pokazywać swobodnie. Wypowiedzi od pacjentów warto publikować wyłącznie za ich zgodą, z pominięciem danych o stanie zdrowia." },
      { q: "Czy strona może mieć rejestrację online?", a: "Tak. Może to być prosty formularz albo integracja z systemem rejestracji, którego używasz. Sprawdzę, co da się połączyć, zanim podam cenę." },
      { q: "Czy muszę mieć zdjęcia zespołu?", a: "Bardzo polecam. Nie muszą być z sesji studyjnej, ale dobre, ostre zdjęcia w gabinecie robią dużą różnicę w odbiorze strony." },
      { q: "Jak szybko strona będzie gotowa?", a: "Typowo 1–2 tygodnie. Szybciej, jeśli od razu masz zdjęcia i opisy usług." },
    ],
    relatedPosts: ["klienci-z-google-w-swoim-miescie", "strona-internetowa-czy-facebook"],
  },
  {
    slug: "hotele",
    name: "Hotele i sale weselne",
    forName: "hoteli, pensjonatów i sal bankietowych",
    hook: "Noclegi, wesela i rezerwacje bez pośredników.",
    metaTitle: "Strony internetowe dla hoteli i sal weselnych",
    metaDescription:
      "Strona hotelu, pensjonatu lub sali weselnej: pokoje, oferta weselna, galeria, zapytanie o termin i rezerwacja bez prowizji. Realizacja: Hotel Sigma. Od 1500 zł.",
    h1: { a: "Strona hotelu i sali weselnej, która", accent: "sprzedaje bez pośredników" },
    intro:
      "Nocleg i wesele sprzedaje się oczami. Para młoda zaczyna od zdjęć sali, a gość szukający noclegu od tego, czy pokój wygląda czysto i czy da się zarezerwować bez przepłacania. Twoja strona jest wirtualnym spacerem po obiekcie i powinna prowadzić do jednego: bezpośredniego kontaktu z Tobą.",
    problems: [
      { title: "Prowizje portali rezerwacyjnych", text: "Pośrednicy pobierają prowizję od rezerwacji. Każdy gość, który zarezerwuje u Ciebie bezpośrednio, to oszczędność, a strona jest do tego najlepszym narzędziem." },
      { title: "Wesela sprzedają się obrazem", text: "Słabe zdjęcia, brak opisu sal i pojemności sprawiają, że para młoda nie dochodzi nawet do zapytania o termin." },
      { title: "Pytania o terminy w kółko", text: "Czy 14 czerwca jest wolny, ile osób zmieści sala, co w cenie. Dobra strona odpowiada na to, zanim ktoś zadzwoni." },
      { title: "Sezonowość i różne grupy gości", text: "Inne treści są potrzebne dla turysty, inne dla pary młodej, a jeszcze inne dla firmy z konferencją. Jedna strona musi je obsłużyć." },
    ],
    mustHave: [
      { title: "Pokoje ze zdjęciami i standardem", text: "Każdy typ pokoju: powierzchnia, wyposażenie, ile osób, cena „od”. Uczciwy opis zmniejsza liczbę rozczarowań." },
      { title: "Sale i oferta weselna", text: "Pojemność, aranżacje, co jest w cenie, zasady dotyczące własnego alkoholu czy cateringu. To pytania, które padają najczęściej." },
      { title: "Galeria wnętrz", text: "Dobre zdjęcia sal, pokoi i restauracji. W hotelu Sigma właśnie one budują klimat całej strony." },
      { title: "Zapytanie o termin i rezerwacja bez prowizji", text: "Formularz z datą, liczbą osób i rodzajem okazji. Przy noclegach opcjonalnie system rezerwacji, którego używasz." },
      { title: "Opinie gości", text: "Z Google i innych portali, ze wskazaniem źródła. Dla pary młodej polecenie ma ogromną wagę." },
      { title: "Restauracja i menu", text: "Jeśli obiekt ma kuchnię, menu i oferta bankietowa to osobny powód, dla którego ludzie wybierają to miejsce." },
      { title: "Mapa, dojazd i numer w nagłówku", text: "Telefon i adres widoczne zawsze, bo większość pytań o wolne terminy zaczyna się od rozmowy." },
    ],
    searchPhrases: ["sala weselna + miasto", "hotel + miasto", "noclegi + miasto", "pensjonat + okolica", "sala bankietowa + miasto"],
    serviceSlug: "strona-firmowa",
    priceNote:
      "Pensjonat albo sala z galerią, ofertą i formularzem zapytania to strona firmowa od 1500 zł. Hotel z wieloma pokojami, wersjami językowymi i połączeniem z systemem rezerwacji jest większym projektem. Wycenę dostajesz w 24 godziny od rozmowy.",
    faq: [
      { q: "Czy strona hotelu może przyjmować rezerwacje online?", a: "Tak. Może to być prosty formularz zapytania albo integracja z systemem rezerwacyjnym, którego używasz. Zakres ustalamy przed wyceną." },
      { q: "Czy muszę mieć profesjonalne zdjęcia?", a: "To najlepsza inwestycja. Dobra sesja wnętrz zwraca się szybciej niż jakakolwiek reklama. Jeśli zdjęć jeszcze nie masz, powiem, co warto sfotografować w pierwszej kolejności." },
      { q: "Czy zrobisz wersję angielską lub niemiecką?", a: "Tak, jeśli masz gości z zagranicy. Wersje językowe to dodatkowy zakres w wycenie, a tłumaczenia wymagają weryfikacji przez osobę, która zna język." },
      { q: "Czy to zastąpi Booking?", a: "Zwykle nie od razu. Portale dają ruch, a strona pozwala pozyskiwać gości bezpośrednio, bez prowizji. Ważne, żeby cena bezpośrednia była dla gościa uczciwa." },
    ],
    relatedPosts: ["klienci-z-google-w-swoim-miescie", "strona-restauracji-checklista"],
  },
  {
    slug: "transport",
    name: "Transport i taxi",
    forName: "firm transportowych i taxi",
    hook: "Numer telefonu i cennik — dokładnie tam, gdzie trzeba.",
    metaTitle: "Strony internetowe dla taxi i transportu",
    metaDescription:
      "Prosta, szybka strona dla taxi i firm transportowych: numer telefonu na górze, cennik kursów, obszar działania i opinie. Realizacja: Taxi Sokółka. Od 500 zł.",
    h1: { a: "Strona taxi i transportu: numer telefonu", accent: "na samej górze" },
    intro:
      "Klient szuka taksówki albo przewoźnika zwykle w pośpiechu, na telefonie, często stojąc na ulicy. Nie ma czasu na animacje. Chce numer, cenę i pewność, że ktoś odbierze. Dlatego strona dla transportu to jeden z tych przypadków, w których prostota wygrywa.",
    problems: [
      { title: "Klient nie wie, ile zapłaci", text: "Brak cennika kursów odstrasza. Nawet orientacyjne stawki i przykłady tras zmniejszają liczbę pytań i zwiększają liczbę telefonów od osób, które się zdecydowały." },
      { title: "Aplikacje i duże firmy przejmują ruch", text: "W wynikach Google wyprzedzają Cię platformy. Lokalna strona z numerem, nazwą miejscowości i wizytówką w Google nadal wygrywa w mniejszych miastach." },
      { title: "Za dużo klików do numeru", text: "Każdy dodatkowy krok, zanim klient zobaczy numer, to ktoś, kto zadzwoni gdzie indziej. Telefon musi być w pierwszym ekranie." },
      { title: "Brak zaufania do nieznanego przewoźnika", text: "Opinie, informacja o licencji i zdjęcia pojazdu pokazują, że to prawdziwa, działająca firma." },
    ],
    mustHave: [
      { title: "Numer telefonu w pierwszym ekranie", text: "Duży, klikalny, zawsze widoczny. W Taxi Sokółka to pierwsze, co widzisz po wejściu na stronę." },
      { title: "Cennik kursów", text: "Stawki za kilometr, ceny typowych tras, opłaty za oczekiwanie. Uczciwe i czytelne." },
      { title: "Obszar działania i godziny", text: "Miejscowości, w których jeździsz, i informacja, czy pracujesz całą dobę." },
      { title: "Rodzaje usług", text: "Przewóz osób, lotniska, przewóz paczek, kursy do większych miast. Każda usługa może pojawiać się w Google osobno." },
      { title: "Opinie klientów", text: "Krótkie, prawdziwe, z miejscowością. W branży zaufania wystarczy kilka dobrych." },
      { title: "Szybkość przede wszystkim", text: "Strona ładuje się natychmiast nawet na słabym zasięgu. Klient na ulicy nie będzie czekał." },
    ],
    searchPhrases: ["taxi + miasto", "taxi + numer telefonu", "przewóz osób + miasto", "taksówka na lotnisko + miasto", "transport + miasto"],
    serviceSlug: "landing-page",
    priceNote:
      "Dla taxi i małego przewoźnika w zupełności wystarcza landing page od 500 zł: telefon, cennik, opinie, mapa i lokalne SEO. Pełna strona firmowa ma sens, jeśli masz kilka różnych usług i chcesz, by każda była widoczna w Google.",
    faq: [
      { q: "Czy do taxi wystarczy jedna strona?", a: "W większości przypadków tak. Jedna szybka strona z numerem, cennikiem i opiniami robi swoje. Podstrony dokładamy, gdy zaczynasz oferować dodatkowe usługi, np. przewozy na lotnisko." },
      { q: "Czy mogę podać na stronie ceny?", a: "Polecam, przynajmniej orientacyjne stawki lub przykłady tras. Klient, który widzi cenę, częściej dzwoni od razu." },
      { q: "Czy pojawię się w Google Maps?", a: "Do tego służy Profil Firmy w Google, który pomagam uzupełnić razem ze stroną. Wizytówka w Mapach jest w tej branży równie ważna jak strona." },
      { q: "Ile czasu zajmie zrobienie strony?", a: "Typowo 3–5 dni od dostarczenia cennika i podstawowych informacji." },
    ],
    relatedPosts: ["klienci-z-google-w-swoim-miescie", "strona-internetowa-czy-facebook"],
  },
  {
    slug: "e-commerce",
    name: "Sklepy internetowe",
    forName: "sklepów internetowych",
    hook: "Własny sklep zamiast prowizji z marketplace.",
    metaTitle: "Strony i sklepy internetowe dla e-commerce",
    metaDescription:
      "Własny sklep internetowy zamiast uzależnienia od marketplace: szybki katalog, BLIK i Przelewy24, InPost, panel zamówień i SEO produktów. Od 3500 zł.",
    h1: { a: "Sklep internetowy, który zarabia dla Ciebie, nie dla", accent: "platformy" },
    intro:
      "Sprzedaż na Allegro czy w mediach społecznościowych daje szybki start, ale każda sprzedaż zostawia część marży platformie, a klient jest klientem platformy, nie Twoim. Własny sklep to inwestycja, która zaczyna się zwracać, gdy zamówienia są regularne, a Ty chcesz budować własną markę i bazę stałych klientów.",
    problems: [
      { title: "Prowizje od każdej sprzedaży", text: "Marketplace pobiera swoją część, a konkurencja jest o jeden klik dalej. Przy małej marży robi się to szybko odczuwalne." },
      { title: "Sklep na szablonie, który tnie sprzedaż", text: "Wolne ładowanie, trudna nawigacja i nieczytelny koszyk. Na telefonie, gdzie odbywa się większość zakupów, objawia się to porzuconymi koszykami." },
      { title: "Uzależnienie od jednej platformy", text: "Zmiana regulaminu, algorytmu lub ceny i Twoja sprzedaż spada. Własny sklep to Twoja baza klientów." },
      { title: "Niewidoczność w Google", text: "Produkty bez opisów i bez przemyślanej struktury kategorii nie mają szans na ruch z wyszukiwarki." },
    ],
    mustHave: [
      { title: "Szybka karta produktu", text: "Dobre zdjęcia, jasna cena, warianty, dostępność i przycisk „dodaj do koszyka” widoczny bez przewijania." },
      { title: "Filtry i wyszukiwarka", text: "Klient z dużym katalogiem musi szybko dotrzeć do tego, czego szuka. W Kino TON katalog dzieli się na kategorie, a filtrowanie skraca drogę do stroju." },
      { title: "Prosty koszyk", text: "Mało kroków, zakup bez zakładania konta, jasny koszt dostawy zanim klient zacznie wpisywać dane." },
      { title: "Płatności i dostawy", text: "BLIK, Przelewy24, karty, InPost i kurierzy. Klient wybiera to, co zna." },
      { title: "Regulamin i prawa konsumenta", text: "Informacje o zwrotach i odstąpieniu od umowy (przepisy dla zakupów online) muszą być jasne i łatwe do znalezienia." },
      { title: "SEO kategorii i produktów", text: "Opisy, adresy, dane strukturalne i szybkość, które pozwalają sklepowi być widocznym w Google." },
      { title: "Panel zamówień", text: "Zarządzanie zamówieniami, stanami magazynowymi i cenami bez znajomości programowania." },
    ],
    searchPhrases: ["nazwa produktu + kup", "kategoria produktów + sklep", "produkt + cena", "produkt + opinie", "sklep z + kategoria"],
    serviceSlug: "sklep-internetowy",
    priceNote:
      "Sklep internetowy zaczyna się od 3500 zł. Na cenę wpływa liczba produktów i wariantów, import danych z innego systemu, integracje z hurtownią lub magazynem, wersje językowe i nietypowe funkcje, jak wypożyczanie czy konfigurator. Wycena w 24 godziny.",
    faq: [
      { q: "Czy opłaca mi się własny sklep, jeśli mam kilka produktów?", a: "Zależy od regularności sprzedaży. Przy kilku produktach i okazjonalnych zamówieniach lepiej sprawdza się landing page z formularzem. Sklep opłaca się, gdy zamówienia przychodzą stale. Piszę o tym na blogu." },
      { q: "Czy mogę przenieść produkty z Allegro?", a: "Zwykle tak, przez import z pliku. Zakres zależy od danych, które masz. Sprawdzę to przed wyceną." },
      { q: "Jakie płatności będą w sklepie?", a: "Standardowo BLIK, Przelewy24 i karty. Opłaty prowizyjne pobiera operator płatności, nie ja." },
      { q: "Czy sklep będzie widoczny w Google?", a: "Zadbam o fundamenty SEO: strukturę, opisy, szybkość i dane produktów. Reszta zależy od konkurencji i pracy nad treściami." },
    ],
    relatedPosts: ["wlasny-sklep-czy-allegro", "ile-kosztuje-strona-internetowa"],
  },
  {
    slug: "energetyka",
    name: "Energetyka i OZE",
    forName: "firm z branży fotowoltaiki i OZE",
    hook: "Od strony firmowej po panele z AI.",
    metaTitle: "Strony internetowe dla firm OZE",
    metaDescription:
      "Strona firmy z branży fotowoltaiki i OZE: oferta, realizacje, raporty, formularz wyceny, a nawet platforma AI. Autor PV Spectra i strony Omniway. Wycena w 24h.",
    h1: { a: "Strona firmy OZE, która", accent: "tłumaczy technikę", b: " po ludzku" },
    intro:
      "Fotowoltaika, pompy ciepła czy termowizja to zakup, który klient robi rzadko i o którym wie niewiele. Zanim zadzwoni, przeczyta kilka stron. Wygrywa ta firma, która wyjaśni wszystko zrozumiale, pokaże realne realizacje i ułatwi pierwszy krok. Znam tę branżę z praktyki, bo zbudowałem dla niej platformę PV Spectra.",
    problems: [
      { title: "Klient nie rozumie oferty", text: "Moc instalacji, magazyn energii, zwrot z inwestycji. Bez prostych wyjaśnień ludzie odkładają decyzję albo wybierają firmę, która mówi jasno." },
      { title: "Długa droga do decyzji", text: "Zakup trwa tygodniami. Strona musi dawać powód, żeby wrócić: kalkulator, poradnik, referencje." },
      { title: "Zaufanie do wykonawcy", text: "To duża kwota i wieloletnia współpraca. Realizacje, certyfikaty i opis procesu pokazują, że firma wie, co robi." },
      { title: "Dwie różne grupy klientów", text: "Inni są klienci indywidualni, a inni firmy czy farmy PV. Strona musi trafić do obu bez chaosu." },
    ],
    mustHave: [
      { title: "Formularz wstępnej wyceny", text: "Kilka pytań (typ obiektu, zużycie, lokalizacja), po których dostajesz konkretne zapytanie, a nie ogólne „proszę o ofertę”." },
      { title: "Realizacje z opisem", text: "Zdjęcia, moc instalacji, miejscowość. Konkretne zlecenia pokazują doświadczenie lepiej niż hasła." },
      { title: "Proces od oględzin do uruchomienia", text: "Spisane etapy, czasy i formalności, żeby klient wiedział, czego się spodziewać." },
      { title: "Przykładowe raporty", text: "Jeśli oferujesz usługi diagnostyczne, jak Omniway w badaniach termowizyjnych, pokaż przykład raportu. To najlepszy dowód jakości." },
      { title: "Obszar działania", text: "Czy działasz lokalnie, czy w całym kraju. Pomaga klientom i Google." },
      { title: "FAQ i poradniki", text: "Odpowiedzi na najczęstsze pytania, z aktualnymi informacjami o programach wsparcia podawanymi ostrożnie, bo przepisy się zmieniają." },
      { title: "Panel klienta lub narzędzia AI", text: "Dla firm z większą ofertą: logowanie, raporty, monitoring. Taki panel zbudowałem w PV Spectra, gdzie moduł AI analizuje zdjęcia z dronów." },
    ],
    searchPhrases: ["fotowoltaika + miasto", "instalacja PV + region", "badanie termowizyjne + miasto", "pompa ciepła + miasto", "serwis paneli fotowoltaicznych"],
    serviceSlug: "strona-firmowa",
    priceNote:
      "Firma instalacyjna lub diagnostyczna z ofertą i realizacjami to strona firmowa od 1500 zł. Kalkulator, panel klienta albo moduły AI to osobny zakres, który wyceniam indywidualnie, po rozmowie o tym, co ma robić.",
    faq: [
      { q: "Czy zrobisz kalkulator opłacalności instalacji?", a: "Tak. Kalkulator zbierający podstawowe dane i dający orientacyjny wynik to jedno z najlepszych narzędzi, bo od razu zamienia ciekawość w zapytanie. Zakres ustalamy po rozmowie." },
      { q: "Czy możesz zbudować coś takiego jak PV Spectra?", a: "To platforma AI dla farm fotowoltaicznych z analizą zdjęć termowizyjnych. Podobne rozwiązania budowałem od podstaw. Każdy projekt wyceniam indywidualnie." },
      { q: "Co z dotacjami i programami wsparcia?", a: "Przepisy zmieniają się często, więc na stronie warto dawać ogólne informacje i odsyłać do źródeł, a konkretne kwoty podawać w ofertach. Pomogę dobrać formę, żeby strona się nie przeterminowała." },
      { q: "Czy strona pomoże w pozyskiwaniu klientów lokalnych?", a: "Tak, o ile ma podstrony usług, realizacje z lokalnymi miejscowościami i uzupełniony Profil Firmy w Google." },
    ],
    relatedPosts: ["klienci-z-google-w-swoim-miescie", "ile-kosztuje-strona-internetowa"],
  },
  {
    slug: "uslugi",
    name: "Usługi lokalne",
    forName: "lokalnych firm usługowych",
    hook: "Fryzjer, księgowa, hydraulik — klient z Google, nie z przypadku.",
    metaTitle: "Strony internetowe dla firm lokalnych",
    metaDescription:
      "Strona dla fryzjera, księgowej, hydraulika i innych firm lokalnych: jasna oferta, numer na wierzchu, opinie i widoczność w Google. Od 500 zł, gotowa w 5 dni.",
    h1: { a: "Strona lokalnej firmy: klient z", accent: "Google", b: ", nie z przypadku" },
    intro:
      "Większość lokalnych firm żyje z poleceń. To świetne, ale ma sufit: polecenie przychodzi, kiedy kogoś o to zapytasz. Tymczasem coraz więcej ludzi najpierw wpisuje w Google „hydraulik” i nazwę miasta. Strona sprawia, że trafiasz do tych, którzy nie mają jeszcze nikogo zaufanego.",
    problems: [
      { title: "Polecenia mają sufit", text: "Poleca Ci się tylko ten, kto Cię zna. Nowi klienci z miasta nie wiedzą, że istniejesz, dopóki Cię nie znajdą w wyszukiwarce." },
      { title: "Facebook nie zawsze wystarcza", text: "Profil bywa niewidoczny dla osób bez konta i słabo wypada w Google. Strona jest Twoja i zawsze pod ręką." },
      { title: "Konkurencja w Mapach Google", text: "Wizytówki firm z lepszymi opiniami i pełnym opisem wyprzedzają inne w wynikach lokalnych. Bez uzupełnionego profilu przegrywasz bez walki." },
      { title: "Nie wiadomo, co napisać", text: "Wielu właścicieli odkłada stronę, bo nie wie, o czym pisać. Dlatego sam układam teksty na podstawie rozmowy." },
    ],
    mustHave: [
      { title: "Jasna oferta w pierwszym zdaniu", text: "Kim jesteś, co robisz i dla kogo, bez ogólników. Klient decyduje w kilka sekund." },
      { title: "Numer i przycisk kontaktu", text: "Klikalny numer w nagłówku i na dole. Na telefonie przyklejony przycisk „zadzwoń”." },
      { title: "Opinie klientów", text: "Kilka prawdziwych opinii z imieniem i miejscowością. Dla lokalnej firmy to najlepsza reklama." },
      { title: "Obszar działania", text: "Miasta i okolice, w których pracujesz, żeby Google i klient wiedzieli, gdzie Cię szukać." },
      { title: "Cennik lub widełki", text: "Choćby „od”. Oszczędza telefony od osób, które szukają czegoś innego, i przyciąga tych, którzy są zdecydowani." },
      { title: "Profil Firmy w Google", text: "Spójny ze stroną: te same dane, godziny i kategorie. Razem tworzą Twoją widoczność lokalną." },
      { title: "Kilka zdań o Tobie", text: "Zdjęcie, imię i krótka historia. Ludzie wolą zatrudnić kogoś, kogo widzieli." },
    ],
    searchPhrases: ["fryzjer + miasto", "księgowa + miasto", "hydraulik + miasto", "elektryk + miasto", "usługa + miasto + telefon"],
    serviceSlug: "landing-page",
    priceNote:
      "Jedna dobra strona z ofertą, opiniami i numerem to landing page od 500 zł. Jeśli masz kilka usług i chcesz, żeby każda z nich była osobno widoczna w Google, strona firmowa od 1500 zł. Zaczynamy od tego, co potrzebujesz teraz, a rozbudowa jest możliwa później.",
    faq: [
      { q: "Czy mi się to opłaca, skoro mam polecenia?", a: "Polecenia są świetne, ale strona dopełnia je: osoba, której Cię polecono, i tak sprawdzi Cię w internecie. Ponadto dociera do klientów, którzy nikogo nie pytali." },
      { q: "Czy mam coś napisać sam?", a: "Nie musisz. Opowiadasz mi o swojej firmie, a ja układam teksty. Ty zatwierdzasz i poprawiasz." },
      { q: "Co to jest Profil Firmy w Google i czy jest darmowy?", a: "To wizytówka w Mapach i wynikach Google. Założenie jest bezpłatne. Pomagam ją uzupełnić tak, by pasowała do strony." },
      { q: "Czy strona zaszkodzi, jeśli mam mało zdjęć?", a: "Nie. Zacznij od kilku dobrych zdjęć swoich prac lub siebie przy pracy. Dokładamy kolejne, gdy będą." },
    ],
    relatedPosts: ["strona-internetowa-czy-facebook", "klienci-z-google-w-swoim-miescie"],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);

export const industryNamesEn: Record<IndustrySlug, string> = {
  restauracje: "Restaurants and food",
  budowlanka: "Construction and renovation",
  motoryzacja: "Automotive",
  gabinety: "Clinics and health",
  hotele: "Hotels and wedding venues",
  transport: "Transport and taxi",
  "e-commerce": "Online stores",
  energetyka: "Energy and renewables",
  uslugi: "Local services",
};

export const industryName = (slug: string, locale: Locale) =>
  locale === "en" ? (industryNamesEn[slug as IndustrySlug] ?? slug) : (getIndustry(slug)?.name ?? slug);
