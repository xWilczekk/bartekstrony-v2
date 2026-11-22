import type { IndustrySlug } from "./projects";

export type City = {
  slug: string;
  name: string;
  inName: string;
  region: string;
  connection: string;

  metaTitle: string;
  metaDescription: string;
  h1: { a: string; accent: string; b?: string };
  intro: string;
  market: { title: string; text: string }[];
  meeting: { mode: "local" | "remote"; title: string; text: string };
  localSeo: { title: string; text: string }[];
  focusIndustries: IndustrySlug[];
  faq: { q: string; a: string }[];
};

export const cities: City[] = [
  {
    slug: "bialystok",
    name: "Białystok",
    inName: "w Białymstoku",
    region: "podlaskie",
    connection: "Klient z Białegostoku: Kino TON.",
    metaTitle: "Strony internetowe w Białymstoku",
    metaDescription:
      "Strony internetowe, sklepy i SEO lokalne dla firm z Białegostoku. Realizacja: Kino TON. Spotkanie na miejscu lub zdalnie. Wycena w 24h, od 500 zł.",
    h1: { a: "Strony internetowe", accent: "w Białymstoku", b: ", które przynoszą klientów" },
    intro:
      "Białystok to największe miasto regionu i jedno z największych skupisk firm usługowych na Podlasiu. Konkurencja jest tu większa niż w małych miejscowościach, więc dobra strona i zadbana wizytówka w Google robią realną różnicę. Pracuję z firmami z Białegostoku, między innymi z wypożyczalnią strojów Kino TON, i znam lokalny rynek z praktyki.",
    market: [
      { title: "Większy rynek, więcej konkurencji", text: "W dużym mieście na tę samą frazę, np. „wypożyczalnia aut Białystok”, pracuje kilka firm. O wyniku decyduje poziom strony, spójność danych i opinie." },
      { title: "Klienci porównują", text: "Białostoczanin przed decyzją sprawdza kilka firm: strony, opinie, ceny. Strona musi szybko odpowiadać na pytania, a nie zmuszać do szukania." },
      { title: "Frazy z dzielnicą i okolicą", text: "Część ludzi szuka usługi „blisko mnie” albo z nazwą osiedla. Warto uwzględnić dzielnice i pobliskie miejscowości, do których dojeżdżasz." },
    ],
    meeting: {
      mode: "local",
      title: "Spotkanie na miejscu",
      text: "Pracuję na Podlasiu, więc jeśli wolisz porozmawiać twarzą w twarz, dojadę do Białegostoku. Do zrobienia strony spotkanie nie jest jednak konieczne. Wszystko załatwimy telefonem i mailem, a wersję roboczą oglądasz na bieżąco.",
    },
    localSeo: [
      { title: "Profil Firmy w Google", text: "Uzupełnij wszystkie dane: kategorie, godziny, usługi, zdjęcia. W Białymstoku walka o wyniki w Mapach jest najtrudniejsza, więc pełny profil to minimum." },
      { title: "Spójne dane NAP", text: "Nazwa, adres i telefon identyczne na stronie, w Google i w katalogach. Rozbieżności osłabiają widoczność lokalną." },
      { title: "Podstrony usług z nazwą miasta", text: "Zamiast jednej ogólnej strony: osobne opisy usług z lokalnym kontekstem. Każda może wchodzić na inną frazę." },
      { title: "Opinie, które zbierasz regularnie", text: "Nowe opinie co jakiś czas działają lepiej niż jednorazowy zryw. Poproś zadowolonych klientów od razu po wykonaniu usługi." },
    ],
    focusIndustries: ["motoryzacja", "uslugi", "gabinety", "restauracje"],
    faq: [
      { q: "Czy możemy się spotkać osobiście w Białymstoku?", a: "Tak, jeśli tak wolisz. Pracuję z Podlasia i mogę dojechać na spotkanie. Większość klientów załatwia jednak wszystko telefonem i mailem, bo to szybsze." },
      { q: "Ile kosztuje strona dla firmy z Białegostoku?", a: "Ceny są takie same dla całej Polski: landing page od 500 zł, strona firmowa od 1500 zł, sklep od 3500 zł. Wycenę dostajesz w 24 godziny." },
      { q: "Czy pomożesz w pozycjonowaniu na frazy z Białymstokiem?", a: "Tak. Tworzę strukturę i treści pod frazy lokalne, a także porządkuję Profil Firmy w Google. Efekty zależą od branży i konkurencji, a nie obiecuję miejsc w wynikach." },
      { q: "Mam stronę, ale nikt na nią nie wchodzi. Co zrobić?", a: "Zacznij od darmowego audytu na stronie. Pokaże, czy problemem jest szybkość, treść czy widoczność, i od czego warto zacząć." },
    ],
  },
  {
    slug: "sokolka",
    name: "Sokółka",
    inName: "w Sokółce",
    region: "podlaskie",
    connection: "Klienci z Sokółki: Hotel Sigma, Taxi Sokółka, JP-Auto, ZAK Auto.",
    metaTitle: "Strony internetowe w Sokółce",
    metaDescription:
      "Strony internetowe dla firm z Sokółki i okolic. Realizacje: Hotel Sigma, Taxi Sokółka, JP-Auto. Spotkanie na miejscu, wycena w 24h, od 500 zł.",
    h1: { a: "Strony internetowe", accent: "w Sokółce", b: " — od lokalnego twórcy" },
    intro:
      "Sokółka to miasto, które znam z codziennego życia, a nie z mapy. Zrobiłem tu strony między innymi dla Hotelu Sigma i Taxi Sokółka. W mniejszym mieście dobra strona daje większą przewagę niż w dużym: wiele firm wciąż nie ma jej wcale albo ma taką, która nie wspiera sprzedaży.",
    market: [
      { title: "Mała konkurencja o frazy", text: "W mniejszym mieście na frazy lokalne walczy mniej firm. Poukładana strona i pełny Profil Firmy w Google wystarczą, by znaleźć się wysoko." },
      { title: "Polecenia i internet idą w parze", text: "W Sokółce wiele zleceń zaczyna się od polecenia. Ale polecona osoba i tak sprawdza firmę w Google, więc strona decyduje, czy zadzwoni." },
      { title: "Goście spoza miasta", text: "Do Sokółki przyjeżdżają turyści i pielgrzymi. Firmy z noclegami, gastronomią i transportem żyją więc także z osób spoza miasta, które o lokalnych firmach dowiadują się z internetu." },
    ],
    meeting: {
      mode: "local",
      title: "Spotkanie na miejscu",
      text: "Pracuję w okolicy, więc spotkanie w Sokółce jest zwykle bez problemu. Jeśli wolisz porozmawiać przy kawie, ustalmy termin. Do zrobienia strony i tak wystarczą telefon i wiadomości.",
    },
    localSeo: [
      { title: "Wizytówka w Mapach Google", text: "Dla taxi, hotelu czy gabinetu to często pierwsze, co widzi klient. Uzupełnij kategorie, godziny i zdjęcia, a numer telefonu niech będzie klikalny." },
      { title: "Frazy z okolicą", text: "Oprócz nazwy miasta uwzględnij pobliskie miejscowości, do których dojeżdżasz lub skąd przyjeżdżają klienci." },
      { title: "Prosta, szybka strona", text: "Wielu klientów korzysta z telefonu, czasem przy słabym zasięgu. Lekka strona ładuje się od razu, tak jak w Taxi Sokółka." },
    ],
    focusIndustries: ["hotele", "transport", "uslugi", "restauracje"],
    faq: [
      { q: "Czy zrobisz stronę dla firmy z małej miejscowości?", a: "Tak, to dla mnie naturalne. Strona w mniejszym mieście daje dużą przewagę, bo konkurencji w wyszukiwarce jest mniej." },
      { q: "Czy mogę zobaczyć realizacje z Sokółki?", a: "Tak, to Hotel Sigma i Taxi Sokółka. Obie strony znajdziesz w realizacjach, a właścicieli możesz zapytać o współpracę." },
      { q: "Ile kosztuje strona dla taxi lub małej firmy?", a: "Prosty landing page zaczyna się od 500 zł. Pełna strona firmowa od 1500 zł. Dokładną cenę poznasz w wycenie." },
      { q: "Czy muszę przyjeżdżać do Ciebie?", a: "Nie. Wszystko załatwiamy zdalnie, a jeśli chcesz się spotkać, mogę przyjechać do Sokółki." },
    ],
  },
  {
    slug: "wyszkow",
    name: "Wyszków",
    inName: "w Wyszkowie",
    region: "mazowieckie",
    connection: "Klient z Wyszkowa: Kącik Smaku.",
    metaTitle: "Strony internetowe w Wyszkowie",
    metaDescription:
      "Strony internetowe dla firm z Wyszkowa i okolic. Realizacja: Kącik Smaku. Praca zdalna, wycena w 24h, od 500 zł.",
    h1: { a: "Strony internetowe", accent: "w Wyszkowie", b: " — zdalnie i konkretnie" },
    intro:
      "Wyszków leży nad Bugiem, na Mazowszu, poza moim lokalnym zasięgiem, a mimo to mam tu klienta: Kącik Smaku, lokal z kebabem i fast-foodem. To dobry przykład tego, że do zrobienia strony nie trzeba mieszkać po sąsiedzku. Wystarczy rozmowa, materiały i konkretny plan.",
    market: [
      { title: "Lokalny rynek blisko dużego miasta", text: "Wyszków leży niedaleko Warszawy, ale mieszkańcy szukają usług we własnym mieście. Firmy lokalne konkurują w wynikach z innymi z powiatu, a nie ze stolicą." },
      { title: "Gastronomia i usługi", text: "Dla lokali, takich jak Kącik Smaku, najważniejsze są menu, godziny i dojazd. Klient decyduje szybko i najczęściej z telefonu." },
      { title: "Facebook i Google razem", text: "Wiele lokalnych firm ma aktywny profil na Facebooku. Strona nie zastępuje go, ale daje to, czego profil nie da: widoczność w Google i stały adres." },
    ],
    meeting: {
      mode: "remote",
      title: "Współpraca zdalna",
      text: "Pracuję zdalnie: rozmowa telefoniczna lub wideo, materiały przez e-mail lub komunikator, a wersję roboczą strony oglądasz w przeglądarce. Nie musisz nigdzie jechać ani czekać na spotkanie.",
    },
    localSeo: [
      { title: "Frazy z nazwą miasta i powiatu", text: "Uwzględnij Wyszków i okoliczne miejscowości, z których przyjeżdżają klienci." },
      { title: "Menu i godziny jako tekst", text: "W gastronomii kluczowa jest aktualność. Godziny, dowóz i ceny jako tekst, nie obrazek, są widoczne dla Google i ludzi." },
      { title: "Profil Firmy w Google", text: "Dodaj zdjęcia, menu i godziny, odpowiadaj na opinie. W mniejszym mieście to najszybszy sposób, by wyprzedzić konkurencję." },
    ],
    focusIndustries: ["restauracje", "uslugi", "budowlanka"],
    faq: [
      { q: "Czy współpraca zdalna jest wygodna?", a: "Dla większości firm tak. Rozmawiamy telefonicznie lub przez wideo, a strona powstaje na podglądzie online. Pracowałem tak z klientami spoza Podlasia." },
      { q: "Czy zrobisz stronę dla lokalu gastronomicznego?", a: "Tak. Zrobiłem takie strony m.in. dla Kącika Smaku, Kebab Nazar i Restauracji Zacisze. Zobacz realizacje." },
      { q: "Ile kosztuje strona dla firmy z Wyszkowa?", a: "Ceny są takie same w całej Polsce: od 500 zł za landing page, od 1500 zł za stronę firmową." },
    ],
  },
  {
    slug: "warszawa",
    name: "Warszawa",
    inName: "w Warszawie",
    region: "mazowieckie",
    connection: "Współpraca zdalna z firmami z Warszawy.",
    metaTitle: "Strony internetowe dla firm z Warszawy",
    metaDescription:
      "Strony internetowe, sklepy i SEO dla firm z Warszawy, zdalnie i bez narzutu agencji. Wycena w 24h, od 500 zł. Realizacje i cennik.",
    h1: { a: "Strony internetowe", accent: "w Warszawie", b: " bez narzutu agencji" },
    intro:
      "Warszawa to najbardziej konkurencyjny rynek w kraju. Na prawie każdą frazę pracuje tu kilka agencji i wiele firm, więc strona musi wyróżniać się dopracowaniem i szybkością. Pracuję z firmami z Warszawy zdalnie: bez biura, bez dopłat za reprezentację, ale z tą samą dbałością o szczegóły.",
    market: [
      { title: "Największa konkurencja", text: "Ogólne frazy typu „fryzjer Warszawa” są bardzo trudne. Lepiej celować w konkretne usługi i dzielnice, gdzie szanse są realne." },
      { title: "Klient oczekuje poziomu", text: "Warszawiak przegląda wiele ofert. Wolna lub niedopracowana strona od razu go zniechęca, a wygląd wpływa na zaufanie." },
      { title: "Dzielnice jako osobne rynki", text: "Mokotów, Praga czy Ursynów to osobne wyszukiwania. Firma, która jasno mówi, gdzie działa, wygrywa z tą, która pisze ogólnie." },
    ],
    meeting: {
      mode: "remote",
      title: "Współpraca zdalna",
      text: "Pracuję zdalnie z firmami z całej Polski: rozmowa telefoniczna lub wideo, podgląd strony online i poprawki na bieżąco. Dzięki temu nie płacisz za biuro ani spotkania, a efekt jest ten sam.",
    },
    localSeo: [
      { title: "Węższe frazy zamiast ogólnych", text: "Zamiast „remonty Warszawa” lepiej celować w „remonty łazienek Mokotów”. Jest mniej konkurencji, a klient bardziej zdecydowany." },
      { title: "Obszar działania zamiast jednego adresu", text: "Jeśli dojeżdżasz do klienta, wypisz dzielnice i miejscowości, w których pracujesz. Google łatwiej Cię dopasuje do zapytania." },
      { title: "Opinie i wizytówka", text: "W dużym mieście o miejscach w Mapach decydują opinie i aktywność. Systematycznie zbieraj nowe i odpowiadaj na wszystkie." },
    ],
    focusIndustries: ["uslugi", "e-commerce", "energetyka", "gabinety"],
    faq: [
      { q: "Czy współpracujesz z firmami spoza Podlasia?", a: "Tak, większość projektów robię zdalnie. Pracuję z firmami z całej Polski, a spotkania odbywamy online." },
      { q: "Czym się różnisz od agencji w Warszawie?", a: "Pracujesz bezpośrednio ze mną, bez pośredników i narzutu. Ja projektuję, piszę i buduję. Mniejsze zespoły i ceny bez agencyjnych marż to moja przewaga, a nie obietnica „lepszego” w każdym przypadku." },
      { q: "Czy pomożesz w pozycjonowaniu w tak konkurencyjnym mieście?", a: "Pomogę dobrać frazy, na które masz realną szansę, i uporządkować stronę oraz wizytówkę. Nie obiecuję miejsc w wynikach, ale rzetelną robotę, którą pokażę w raporcie." },
      { q: "Ile to kosztuje?", a: "Ceny są takie same dla całej Polski: od 500 zł za landing page, od 1500 zł za stronę firmową, od 3500 zł za sklep." },
    ],
  },
  {
    slug: "suwalki",
    name: "Suwałki",
    inName: "w Suwałkach",
    region: "podlaskie",
    connection: "Region Podlasia — możliwe spotkanie na miejscu.",
    metaTitle: "Strony internetowe w Suwałkach",
    metaDescription:
      "Strony internetowe i sklepy dla firm z Suwałk i Suwalszczyzny. Podlasie to mój region, spotkanie możliwe na miejscu. Wycena w 24h, od 500 zł.",
    h1: { a: "Strony internetowe", accent: "w Suwałkach", b: " i na Suwalszczyźnie" },
    intro:
      "Suwałki to północ Podlasia, miasto, z którego blisko do jezior i Wigierskiego Parku Narodowego. Nie będę Ci wmawiał, że mam tu dziesiątki wdrożeń. Mam za to dobrą znajomość regionu, jego rynku i tego, jak działają małe firmy na Podlasiu. A to w pracy nad lokalną stroną ma duże znaczenie.",
    market: [
      { title: "Miasto i turystyka w jednym", text: "Suwałki żyją z lokalnych usług, handlu i ruchu turystycznego. Firmy z noclegami, gastronomią czy usługami dla turystów mają dwie grupy klientów i potrzebują strony, która obsłuży obie." },
      { title: "Mniejsze miasto, mniejsza konkurencja", text: "Na lokalne frazy walczy tu mniej firm niż w dużych ośrodkach. Dobra strona i pełny profil w Google szybciej dają widoczność." },
      { title: "Sezonowość", text: "Dla branż związanych z turystyką ruch zmienia się w ciągu roku. Strona powinna działać także poza sezonem, np. na wesela, wydarzenia i klientów lokalnych." },
    ],
    meeting: {
      mode: "local",
      title: "Spotkanie na miejscu, jeśli chcesz",
      text: "Suwałki leżą w moim regionie, więc spotkanie jest możliwe po wcześniejszym umówieniu. Większość pracy i tak odbywa się telefonicznie i mailowo, a wersję roboczą strony oglądasz w przeglądarce.",
    },
    localSeo: [
      { title: "Frazy z Suwałkami i okolicą", text: "Dopisz miejscowości w okolicy, do których dojeżdżasz. Dla turysty ważna może być też nazwa regionu." },
      { title: "Profil Firmy z godzinami sezonowymi", text: "Jeśli pracujesz sezonowo, ustaw godziny świąteczne i sezonowe. Nic tak nie irytuje klienta jak zamknięte drzwi mimo informacji, że jest otwarte." },
      { title: "Zdjęcia, które pokazują miejsce", text: "Dla firm turystycznych i gastronomicznych zdjęcia lokalu i okolicy decydują o wyborze." },
    ],
    focusIndustries: ["hotele", "restauracje", "uslugi", "transport"],
    faq: [
      { q: "Czy zrobisz stronę dla firmy z Suwałk?", a: "Tak. Pracuję z firmami z całej Polski, w tym z Podlasia. Suwałki to mój region, więc znam realia." },
      { q: "Czy możemy się spotkać na miejscu?", a: "Tak, po umówieniu terminu. Większość spraw załatwiamy jednak zdalnie, co jest szybsze dla obu stron." },
      { q: "Czy mogę zobaczyć realizacje z regionu?", a: "Tak. W realizacjach znajdziesz projekty z Białegostoku i Sokółki, które pokazują, jak wyglądają strony dla lokalnych firm Podlasia." },
    ],
  },
  {
    slug: "augustow",
    name: "Augustów",
    inName: "w Augustowie",
    region: "podlaskie",
    connection: "Region Podlasia — hotele, pensjonaty, turystyka.",
    metaTitle: "Strony internetowe w Augustowie",
    metaDescription:
      "Strony internetowe dla hoteli, pensjonatów, gastronomii i usług w Augustowie. Rezerwacje bez prowizji, SEO lokalne. Wycena w 24h, od 500 zł.",
    h1: { a: "Strony internetowe", accent: "w Augustowie", b: " dla hoteli i usług turystycznych" },
    intro:
      "Augustów to jedno z najbardziej turystycznych miast Podlasia: jeziora, Kanał Augustowski i Puszcza Augustowska. Sezon przynosi tu ogromny ruch, a o to, kto go dostanie, decydują wyniki w Google i dobra strona. Jeśli prowadzisz pensjonat, hotel, restaurację albo wypożyczalnię sprzętu, Twoja strona pracuje najciężej właśnie latem.",
    market: [
      { title: "Sezon decyduje o roku", text: "Najwięcej rezerwacji przychodzi, zanim sezon w ogóle się zacznie. Strona musi być gotowa na wiosnę, kiedy ludzie planują urlop." },
      { title: "Portale zabierają prowizję", text: "Większość obiektów jest na portalach rezerwacyjnych. Własna strona z rezerwacją bez prowizji pozwala zatrzymać część marży i budować stałych gości." },
      { title: "Goście z całej Polski", text: "Turyści szukają noclegów i atrakcji z domu, zwykle na telefonie, więc strona musi być szybka, czytelna i pokazywać zdjęcia obiektu i okolicy." },
    ],
    meeting: {
      mode: "local",
      title: "Spotkanie na miejscu lub zdalnie",
      text: "Augustów to mój region, więc możemy spotkać się na miejscu, np. przed sezonem. Jeśli wolisz, wszystko załatwimy zdalnie. W obu przypadkach strona powstaje tak samo, z podglądem online na każdym etapie.",
    },
    localSeo: [
      { title: "Frazy turystyczne", text: "Goście wpisują „noclegi Augustów”, „pensjonat nad jeziorem” czy „pokoje blisko Kanału”. Opisz obiekt tak, jak go ludzie szukają." },
      { title: "Przygotuj się przed sezonem", text: "Zmiany w Google potrzebują czasu. Zrób przegląd strony i wizytówki wiosną, zanim ruszy główny ruch." },
      { title: "Zdjęcia i opinie", text: "W turystyce wybór często zależy od zdjęć i opinii. Dbaj o aktualne zdjęcia i odpowiadaj gościom w wizytówce." },
      { title: "Rezerwacja bez prowizji", text: "Pokaż gościowi, że rezerwacja bezpośrednia jest dla niego korzystna: lepsza cena, elastyczność albo drobny dodatek." },
    ],
    focusIndustries: ["hotele", "restauracje", "uslugi", "transport"],
    faq: [
      { q: "Czy zrobisz stronę dla pensjonatu lub hotelu w Augustowie?", a: "Tak. Hotel Sigma w Sokółce to jedna z moich realizacji. Strona obiektu noclegowego to dla mnie dobrze znany temat: pokoje, galeria, zapytanie o termin i rezerwacja bez prowizji." },
      { q: "Czy strona zastąpi portale rezerwacyjne?", a: "Zwykle nie od razu. Portale dają ruch, a własna strona pozwala pozyskiwać gości bez prowizji. Najlepsze efekty daje połączenie obu." },
      { q: "Kiedy najlepiej zrobić stronę przed sezonem?", a: "Im wcześniej, tym lepiej. Google potrzebuje czasu, a turyści planują urlop wiosną, więc stronę dobrze mieć gotową kilka tygodni przed głównym ruchem." },
      { q: "Czy możesz zrobić wersję w innym języku?", a: "Tak, jeśli masz gości z zagranicy. Tłumaczenia powinna sprawdzić osoba, która zna język, a ja dopasowuję strukturę strony." },
    ],
  },
];

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
