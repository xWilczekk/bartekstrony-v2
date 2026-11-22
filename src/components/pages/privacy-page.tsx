import type { ReactNode } from "react";
import { JsonLd } from "@/components/ui/json-ld";
import { CookieSettingsButton } from "@/components/site/cookie-settings-button";
import { Accent } from "@/components/ui/section-head";
import { site } from "@/content/site";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { breadcrumbs, pageMeta } from "@/lib/seo";

const UPDATED = { pl: "30 października 2026", en: "30 October 2026" };

export const privacyMeta = {
  pl: pageMeta({
    title: "Polityka prywatności",
    description:
      "Kto przetwarza Twoje dane na bartekstrony.pl, po co i jak długo. Bez reklam i sprzedawania danych, statystyki tylko za Twoją zgodą.",
    path: "/polityka-prywatnosci",
  }),
  en: pageMeta({
    title: "Privacy policy",
    description:
      "Who processes your data on bartekstrony.pl, why and for how long. No ads, no selling of data, statistics only with your consent.",
    path: "/en/privacy-policy",
  }),
};

const P = ({ children }: { children: ReactNode }) => <p className="max-w-[68ch] leading-relaxed text-pretty text-ink/80">{children}</p>;

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="max-w-[68ch] space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-ink/80">
          <span aria-hidden className="mt-[0.75em] h-px w-3 shrink-0 bg-signal" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Purpose({ title, data, basis, children }: { title: string; data: ReactNode; basis: ReactNode; children?: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border hairline p-5 md:p-6">
      <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
      {children && <div className="mt-2 max-w-[68ch] leading-relaxed text-ink/80">{children}</div>}
      <dl className="mt-4 grid gap-x-6 gap-y-1 border-t hairline pt-4 text-[0.95rem] sm:grid-cols-[9rem_1fr] sm:gap-y-3">
        {data}
        {basis}
      </dl>
    </div>
  );
}

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <>
    <dt className="label-mono pt-0.5 text-mute">{label}</dt>
    <dd className="leading-relaxed text-ink/80">{children}</dd>
  </>
);

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-ink underline decoration-signal underline-offset-4 hover:text-signal" rel="noopener">
    {children}
  </a>
);

function StorageTable({ head, rows }: { head: [string, string, string]; rows: [ReactNode, ReactNode, ReactNode][] }) {
  return (
    <div className="max-w-[68ch] overflow-hidden rounded-[var(--radius)] border hairline text-[0.95rem]">
      <div className="label-mono hidden grid-cols-[10rem_1fr_7rem] gap-4 bg-paper-2 px-4 py-2.5 text-mute sm:grid">
        {head.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>
      {rows.map(([name, what, time], i) => (
        <div key={i} className="grid gap-x-4 gap-y-1 border-t hairline px-4 py-3 first:border-t-0 sm:grid-cols-[10rem_1fr_7rem] sm:first:border-t">
          <span className="font-mono text-[0.85rem] text-ink">{name}</span>
          <span className="leading-relaxed text-ink/80">{what}</span>
          <span className="text-ink/60 sm:text-ink/80">{time}</span>
        </div>
      ))}
    </div>
  );
}

const settingsClass =
  "inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-ink px-5 text-[0.95rem] font-medium text-paper transition-colors duration-300 hover:bg-signal hover:text-ink";

type Section = { id: string; title: string; body: ReactNode };

function copy(locale: "pl" | "en") {
  const mail = <A href={`mailto:${site.email}`}>{site.email}</A>;
  const en = locale === "en";
  const L = en
    ? { data: "Data", basis: "Legal basis" }
    : { data: "Dane", basis: "Podstawa prawna" };

  if (en) {
    return {
      home: "Home",
      crumb: "Privacy policy",
      eyebrow: "(Privacy)",
      h1: (
        <>
          Your data, in <Accent>plain words</Accent>.
        </>
      ),
      lead: "Who processes your data, why and for how long — without legal jargon wherever possible.",
      updated: `Last updated: ${UPDATED.en}`,
      shortTitle: "In short",
      short: [
        "Statistics cookies (Google Analytics) switch on only if you agree.",
        "I never sell your data or use it for ads.",
        "What you send through a form is used only to reply and prepare a quote.",
        "You can ask me to delete your data at any time.",
      ],
      toc: "Contents",
      sections: [
        {
          id: "administrator",
          title: "Who is responsible for your data",
          body: (
            <>
              <P>
                The controller of your personal data is me, {site.legalName}, running an unregistered small-scale business
                (działalność nierejestrowana) under the name {site.name}.
              </P>
              <List items={[<>E-mail: {mail}</>, <>Phone: {site.phone}</>]} />
              <P>I have not appointed a data protection officer — I’m not required to. Write to me directly about anything concerning your data.</P>
            </>
          ),
        },
        {
          id: "purposes",
          title: "What data I process and why",
          body: (
            <div className="grid gap-4">
              <Purpose
                title="Enquiries through the website"
                data={<Row label={L.data}>Name, e-mail and/or phone, company name, current website address, your message, and whatever you attach from the calculator, preview or audit (e.g. the chosen service, industry, town, audit score).</Row>}
                basis={<Row label={L.basis}>Art. 6(1)(b) GDPR — steps taken at your request before entering into a contract — and art. 6(1)(a) GDPR — the consent you tick in the form.</Row>}
              >
                To reply to you and prepare a quote. Enquiries are stored in a database at Vercel (Vercel Blob), visible only to me.
              </Purpose>
              <Purpose
                title="Direct phone and e-mail contact"
                data={<Row label={L.data}>Whatever you give me: name, number, e-mail address, the content of the conversation.</Row>}
                basis={<Row label={L.basis}>Art. 6(1)(b) GDPR, and art. 6(1)(f) GDPR — my legitimate interest in replying to you.</Row>}
              />
              <Purpose
                title="Carrying out a project and settling payments"
                data={<Row label={L.data}>The data needed for the agreement and the bill.</Row>}
                basis={<Row label={L.basis}>Art. 6(1)(b) GDPR (the contract) and art. 6(1)(c) GDPR (tax law obligations, e.g. keeping records).</Row>}
              />
              <Purpose
                title="Visit statistics (Google Analytics)"
                data={<Row label={L.data}>Pages viewed, how you got to the site (e.g. from Google), device and browser type, approximate location (country, city), an identifier from a cookie, and clicks on the phone number or e-mail and sending the form (never its content). Google Analytics 4 doesn’t store IP addresses. Advertising features and Google Signals are turned off.</Row>}
                basis={<Row label={L.basis}>Art. 6(1)(a) GDPR — your consent, and art. 399 of the Polish Electronic Communications Law (storing cookies with consent). You can withdraw it any time: “Cookie settings” in the footer.</Row>}
              >
                Only if you click “Accept” on the receipt banner. It shows me which pages work and which need fixing.
              </Purpose>
              <Purpose
                title="Security and running the site"
                data={<Row label={L.data}>Technical server logs kept by the hosting provider: IP address, date, browser.</Row>}
                basis={<Row label={L.basis}>Art. 6(1)(f) GDPR — keeping the site secure and working.</Row>}
              />
              <Purpose
                title="Website preview and free audit"
                data={<Row label={L.data}>The business name, industry and town in the preview, and the address of the site you test.</Row>}
                basis={<Row label={L.basis}>Not stored by me — they live only in the link in your browser until you send an enquiry yourself.</Row>}
              />
            </div>
          ),
        },
        {
          id: "recipients",
          title: "Who else sees the data",
          body: (
            <>
              <P>Only the providers I need to run the site, processing data on my behalf:</P>
              <List
                items={[
                  <>
                    <strong className="font-medium text-ink">Vercel Inc.</strong> — hosting of the site and storage of enquiries (Vercel Blob).
                  </>,
                  <>
                    <strong className="font-medium text-ink">Google Ireland Limited</strong> (with Google LLC) — Google Analytics statistics,
                    only with your consent (<A href="https://business.safety.google/privacy/">how Google uses data from sites</A>).
                  </>,
                  <>
                    <strong className="font-medium text-ink">Google LLC</strong> — only when you use the free audit: your browser sends the
                    address of the tested site to Google PageSpeed Insights, so Google also sees your IP address (
                    <A href="https://policies.google.com/privacy">Google’s privacy policy</A>).
                  </>,
                  <>My e-mail provider — when you write to me or I reply by e-mail.</>,
                ]}
              />
              <P>I don’t sell data and don’t pass it on for advertising.</P>
            </>
          ),
        },
        {
          id: "transfers",
          title: "Transfers outside the EEA",
          body: (
            <P>
              Vercel and Google are US companies (Google Analytics for Europe is provided by Google Ireland), so data may be processed in the USA. This happens on the basis of the EU–US
              Data Privacy Framework (where the provider is certified under it) or the European Commission’s standard contractual
              clauses. You can ask me for a copy of these safeguards.
            </P>
          ),
        },
        {
          id: "retention",
          title: "How long I keep data",
          body: (
            <List
              items={[
                "Enquiries that didn’t lead to a project — up to 12 months after our last contact, so I can pick up the conversation if you come back.",
                "Projects — for the duration of our cooperation, then until claims become time-barred.",
                "Billing documents — 5 years from the end of the tax year, as tax law requires.",
                "Google Analytics — detailed visit data for 2 months, after that only aggregated numbers remain. The _ga cookies expire after 2 years, or sooner if you withdraw consent or clear your browser.",
                "Your cookie choice — 12 months, then I ask again.",
                "If you withdraw consent or object, I delete the data unless another legal basis requires me to keep it.",
              ]}
            />
          ),
        },
        {
          id: "rights",
          title: "Your rights",
          body: (
            <>
              <P>You have the right to:</P>
              <List
                items={[
                  "access your data and get a copy of it,",
                  "have it corrected,",
                  "have it deleted,",
                  "restrict its processing,",
                  "data portability,",
                  "object to processing based on legitimate interest,",
                  "withdraw consent at any time (this doesn’t affect what was done before the withdrawal).",
                ]}
              />
              <P>
                Just write to {mail} — I’ll reply within a month at the latest. You can also lodge a complaint with the Polish
                supervisory authority: President of the Personal Data Protection Office (UODO), ul. Stawki 2, 00-193 Warsaw,{" "}
                <A href="https://uodo.gov.pl">uodo.gov.pl</A>.
              </P>
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies and browser storage",
          body: (
            <>
              <P>
                Cookies are small files your browser keeps for a website. This site uses them only for statistics — and only if
                you agree. No advertising cookies, nothing that follows you around other sites.
              </P>
              <StorageTable
                head={["Name", "What for", "How long"]}
                rows={[
                  ["_ga", "Google Analytics: tells one visitor from another. Only with consent.", "2 years"],
                  ["_ga_<ID>", "Google Analytics: keeps track of the current visit. Only with consent.", "2 years"],
                  ["bs-consent", "Your choice on the cookie banner (browser storage).", "12 months"],
                  ["bs-lang", "The language you chose (browser storage).", "until cleared"],
                  ["audit result", "The free audit result, so a refresh doesn’t restart the test (browser storage).", "30 minutes"],
                ]}
              />
              <P>Browser storage never leaves your device. You can also block or delete cookies in your browser settings.</P>
              <CookieSettingsButton className={settingsClass}>Change cookie settings</CookieSettingsButton>
            </>
          ),
        },
        {
          id: "other",
          title: "Voluntariness and automated decisions",
          body: (
            <P>
              Giving your data is voluntary, but without contact details I can’t reply to you. I don’t make automated decisions
              about you and don’t profile you.
            </P>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: (
            <P>
              I update this policy when the tools I use or the way I process data change. The current version is always here, with
              the date of the last update at the top.
            </P>
          ),
        },
      ] satisfies Section[],
      questions: "A question about your data?",
      questionsText: "Write to me — I’ll reply within 24 hours on working days.",
    };
  }

  return {
    home: "Strona główna",
    crumb: "Polityka prywatności",
    eyebrow: "(Prywatność)",
    h1: (
      <>
        Twoje dane, <Accent>po ludzku</Accent>.
      </>
    ),
    lead: "Kto przetwarza Twoje dane, po co i jak długo — bez prawniczego żargonu tam, gdzie się da.",
    updated: `Ostatnia aktualizacja: ${UPDATED.pl}`,
    shortTitle: "W skrócie",
    short: [
      "Ciasteczka statystyczne (Google Analytics) włączam tylko, jeśli się zgodzisz.",
      "Nie sprzedaję Twoich danych i nie używam ich do reklam.",
      "To, co wyślesz przez formularz, służy tylko do odpowiedzi i wyceny.",
      "W każdej chwili możesz poprosić o usunięcie swoich danych.",
    ],
    toc: "Spis treści",
    sections: [
      {
        id: "administrator",
        title: "Kto odpowiada za Twoje dane",
        body: (
          <>
            <P>
              Administratorem Twoich danych osobowych jestem ja, {site.legalName}, prowadzący działalność nierejestrowaną pod nazwą{" "}
              {site.name}.
            </P>
            <List items={[<>E-mail: {mail}</>, <>Telefon: {site.phone}</>]} />
            <P>
              Nie wyznaczyłem inspektora ochrony danych — nie mam takiego obowiązku. We wszystkich sprawach dotyczących danych pisz
              bezpośrednio do mnie.
            </P>
          </>
        ),
      },
      {
        id: "cele",
        title: "Jakie dane przetwarzam i po co",
        body: (
          <div className="grid gap-4">
            <Purpose
              title="Zapytania przez stronę"
              data={<Row label={L.data}>Imię, e-mail i/lub telefon, nazwa firmy, adres obecnej strony, treść wiadomości oraz to, co sam dołączasz z kalkulatora, podglądu lub audytu (np. wybrana usługa, branża, miasto, wynik audytu).</Row>}
              basis={<Row label={L.basis}>Art. 6 ust. 1 lit. b RODO — działania na Twoje żądanie przed zawarciem umowy — oraz art. 6 ust. 1 lit. a RODO — zgoda, którą zaznaczasz w formularzu.</Row>}
            >
              Żeby Ci odpowiedzieć i przygotować wycenę. Zapytania są przechowywane w bazie danych w Vercel (Vercel Blob) i widzę je
              tylko ja.
            </Purpose>
            <Purpose
              title="Bezpośredni kontakt telefoniczny i mailowy"
              data={<Row label={L.data}>To, co mi podasz: imię, numer, adres e-mail, treść rozmowy.</Row>}
              basis={<Row label={L.basis}>Art. 6 ust. 1 lit. b RODO oraz art. 6 ust. 1 lit. f RODO — mój prawnie uzasadniony interes, czyli odpowiedź na Twoją wiadomość.</Row>}
            />
            <Purpose
              title="Realizacja zlecenia i rozliczenia"
              data={<Row label={L.data}>Dane potrzebne do umowy i rachunku.</Row>}
              basis={<Row label={L.basis}>Art. 6 ust. 1 lit. b RODO (umowa) i art. 6 ust. 1 lit. c RODO (obowiązki z przepisów podatkowych, np. prowadzenie ewidencji).</Row>}
            />
            <Purpose
              title="Statystyki odwiedzin (Google Analytics)"
              data={<Row label={L.data}>Oglądane podstrony, skąd trafiasz na stronę (np. z Google), typ urządzenia i przeglądarki, przybliżona lokalizacja (kraj, miasto), identyfikator z pliku cookie oraz kliknięcia w telefon i e-mail czy wysłanie formularza (bez jego treści). Google Analytics 4 nie zapisuje adresu IP. Funkcje reklamowe i Google Signals są wyłączone.</Row>}
              basis={<Row label={L.basis}>Art. 6 ust. 1 lit. a RODO — Twoja zgoda, oraz art. 399 ustawy Prawo komunikacji elektronicznej (zapisywanie plików cookies za zgodą). Zgodę cofniesz w każdej chwili: „Ustawienia cookies” w stopce.</Row>}
            >
              Tylko jeśli klikniesz „Akceptuję” na pasku z paragonem. Dzięki temu wiem, które podstrony działają, a które trzeba
              poprawić.
            </Purpose>
            <Purpose
              title="Bezpieczeństwo i działanie strony"
              data={<Row label={L.data}>Techniczne logi serwera prowadzone przez firmę hostingową: adres IP, data, przeglądarka.</Row>}
              basis={<Row label={L.basis}>Art. 6 ust. 1 lit. f RODO — dbanie o bezpieczeństwo i działanie strony.</Row>}
            />
            <Purpose
              title="Podgląd strony i darmowy audyt"
              data={<Row label={L.data}>Nazwa firmy, branża i miasto w podglądzie oraz adres sprawdzanej strony.</Row>}
              basis={<Row label={L.basis}>Nie zapisuję ich — są tylko w linku w Twojej przeglądarce, dopóki sam nie wyślesz zapytania.</Row>}
            />
          </div>
        ),
      },
      {
        id: "odbiorcy",
        title: "Kto jeszcze widzi dane",
        body: (
          <>
            <P>Tylko dostawcy, bez których strona nie działa. Przetwarzają dane na moje zlecenie:</P>
            <List
              items={[
                <>
                  <strong className="font-medium text-ink">Vercel Inc.</strong> — hosting strony i przechowywanie zapytań (Vercel Blob).
                </>,
                <>
                  <strong className="font-medium text-ink">Google Ireland Limited</strong> (wraz z Google LLC) — statystyki Google
                  Analytics, tylko za Twoją zgodą (<A href="https://business.safety.google/privacy/?hl=pl">jak Google korzysta z danych ze stron</A>).
                </>,
                <>
                  <strong className="font-medium text-ink">Google LLC</strong> — tylko gdy korzystasz z darmowego audytu: Twoja przeglądarka
                  wysyła adres sprawdzanej strony do Google PageSpeed Insights, więc Google widzi też Twój adres IP (
                  <A href="https://policies.google.com/privacy?hl=pl">polityka prywatności Google</A>).
                </>,
                <>Dostawca mojej poczty e-mail — gdy do mnie piszesz albo odpisuję mailem.</>,
              ]}
            />
            <P>Nie sprzedaję danych i nie przekazuję ich w celach reklamowych.</P>
          </>
        ),
      },
      {
        id: "transfer",
        title: "Przekazywanie danych poza EOG",
        body: (
          <P>
            Vercel i Google to firmy z USA (Google Analytics w Europie dostarcza Google Ireland), więc dane mogą być przetwarzane w
            Stanach Zjednoczonych. Dzieje się to na podstawie
            programu EU–US Data Privacy Framework (jeśli dostawca jest w nim certyfikowany) albo standardowych klauzul umownych
            zatwierdzonych przez Komisję Europejską. Możesz poprosić mnie o kopię tych zabezpieczeń.
          </P>
        ),
      },
      {
        id: "okres",
        title: "Jak długo przechowuję dane",
        body: (
          <List
            items={[
              "Zapytania, z których nie wyszło zlecenie — do 12 miesięcy od ostatniego kontaktu, żebym mógł wrócić do rozmowy, jeśli się odezwiesz.",
              "Zlecenia — przez czas współpracy, a potem do przedawnienia roszczeń.",
              "Dokumenty rozliczeniowe — 5 lat od końca roku podatkowego, tak jak wymagają przepisy.",
              "Google Analytics — szczegółowe dane o wizytach przez 2 miesiące, potem zostają tylko zbiorcze liczby. Pliki _ga wygasają po 2 latach albo wcześniej, gdy cofniesz zgodę lub wyczyścisz przeglądarkę.",
              "Twoja decyzja w sprawie cookies — 12 miesięcy, potem zapytam ponownie.",
              "Jeśli cofniesz zgodę albo wniesiesz sprzeciw, usuwam dane, chyba że inna podstawa prawna wymaga ich przechowania.",
            ]}
          />
        ),
      },
      {
        id: "prawa",
        title: "Twoje prawa",
        body: (
          <>
            <P>Masz prawo do:</P>
            <List
              items={[
                "dostępu do swoich danych i otrzymania ich kopii,",
                "ich sprostowania,",
                "ich usunięcia,",
                "ograniczenia przetwarzania,",
                "przenoszenia danych,",
                "sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,",
                "cofnięcia zgody w dowolnym momencie (nie wpływa to na to, co zrobiłem przed jej cofnięciem).",
              ]}
            />
            <P>
              Wystarczy napisać na {mail} — odpowiem najpóźniej w ciągu miesiąca. Możesz też złożyć skargę do Prezesa Urzędu Ochrony
              Danych Osobowych, ul. Stawki 2, 00-193 Warszawa, <A href="https://uodo.gov.pl">uodo.gov.pl</A>.
            </P>
          </>
        ),
      },
      {
        id: "cookies",
        title: "Ciasteczka i pamięć przeglądarki",
        body: (
          <>
            <P>
              Ciasteczka (cookies) to małe pliki, które przeglądarka zapisuje dla strony. Ta strona używa ich tylko do statystyk —
              i tylko wtedy, gdy się na to zgodzisz. Nie ma tu ciasteczek reklamowych ani takich, które śledzą Cię na innych stronach.
            </P>
            <StorageTable
              head={["Nazwa", "Po co", "Jak długo"]}
              rows={[
                ["_ga", "Google Analytics: odróżnia jednego odwiedzającego od drugiego. Tylko za zgodą.", "2 lata"],
                ["_ga_<ID>", "Google Analytics: zapamiętuje bieżącą wizytę. Tylko za zgodą.", "2 lata"],
                ["bs-consent", "Twoja decyzja z paska cookies (pamięć przeglądarki).", "12 miesięcy"],
                ["bs-lang", "Wybrany język strony (pamięć przeglądarki).", "do usunięcia"],
                ["wynik audytu", "Wynik darmowego audytu, żeby odświeżenie nie uruchamiało testu od nowa (pamięć przeglądarki).", "30 minut"],
              ]}
            />
            <P>Pamięć przeglądarki nie opuszcza Twojego urządzenia. Cookies możesz też zablokować lub usunąć w ustawieniach przeglądarki.</P>
            <CookieSettingsButton className={settingsClass}>Zmień ustawienia cookies</CookieSettingsButton>
          </>
        ),
      },
      {
        id: "inne",
        title: "Dobrowolność i decyzje automatyczne",
        body: (
          <P>
            Podanie danych jest dobrowolne, ale bez danych kontaktowych nie mogę Ci odpowiedzieć. Nie podejmuję wobec Ciebie
            decyzji w sposób zautomatyzowany i nie profiluję Cię.
          </P>
        ),
      },
      {
        id: "zmiany",
        title: "Zmiany polityki",
        body: (
          <P>
            Aktualizuję tę politykę, gdy zmieniają się narzędzia, z których korzystam, albo sposób przetwarzania danych. Aktualna
            wersja jest zawsze tutaj, z datą ostatniej zmiany na górze.
          </P>
        ),
      },
    ] satisfies Section[],
    questions: "Masz pytanie o swoje dane?",
    questionsText: "Napisz do mnie — odpowiem w ciągu 24 godzin w dni robocze.",
  };
}

export function PrivacyPage() {
  const locale = getLocale();
  const c = copy(locale);
  const href = (h: string) => localizeHref(h, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: c.home, path: href("/") },
          { name: c.crumb, path: href("/polityka-prywatnosci") },
        ])}
      />

      <section className="container-x pt-[calc(var(--header-h)+3rem)] pb-12 md:pb-16">
        <p className="label-mono text-mute">
          <span className="text-signal">{c.eyebrow}</span> {c.crumb}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[length:var(--text-giant)] font-semibold text-balance">{c.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-mute">{c.lead}</p>
        <p className="label-mono mt-6 text-mute">{c.updated}</p>

        <div className="mt-12 rounded-[var(--radius)] bg-paper-2 p-6 md:mt-16 md:p-8">
          <p className="label-mono text-mute">{c.shortTitle}</p>
          <ul className="mt-5 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {c.short.map((s) => (
              <li key={s} className="flex gap-3 leading-snug">
                <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center bg-[var(--highlight,var(--signal))] text-ink">
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2.5 6.2l2.3 2.3 4.7-5" />
                  </svg>
                </span>
                <span className="font-medium">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x grid gap-12 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-4">
          <nav aria-label={c.toc} className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <p className="label-mono text-mute">{c.toc}</p>
            <ol className="mt-4 border-t hairline">
              {c.sections.map((s, i) => (
                <li key={s.id} className="border-b hairline">
                  <a href={`#${s.id}`} className="flex gap-3 py-3 text-[0.95rem] leading-snug transition-colors duration-300 hover:text-signal">
                    <span className="label-mono pt-0.5 text-mute">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="grid gap-14 lg:col-span-8">
          {c.sections.map((s, i) => (
            <article key={s.id} id={s.id} className="scroll-mt-[calc(var(--header-h)+24px)] border-t hairline pt-6">
              <p className="label-mono text-signal">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-semibold tracking-tight text-balance">
                {s.title}
              </h2>
              <div className="mt-6 grid gap-4">{s.body}</div>
            </article>
          ))}

          <div className="theme-ink rounded-[var(--radius)] p-6 md:p-10">
            <p className="font-display text-[length:var(--text-big)] leading-tight font-semibold text-balance">{c.questions}</p>
            <p className="mt-3 text-mute">{c.questionsText}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex font-display text-[clamp(1.4rem,3vw,2rem)] font-medium underline decoration-signal decoration-2 underline-offset-[0.18em] hover:text-signal"
            >
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
