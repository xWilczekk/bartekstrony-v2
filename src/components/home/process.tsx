import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { contactHref } from "@/lib/utils";
import { ProcessRail } from "./process-rail";

const steps = [
  {
    n: "01",
    title: "Rozmowa",
    time: "15 minut",
    place: "telefon lub online",
    lead: "Zaczynamy od krótkiej rozmowy, bez prezentacji i bez żargonu.",
    you: "Opowiadasz, czym się zajmujesz, kim są Twoi klienci i co ma robić strona.",
    me: "Słucham, dopytuję i od razu mówię uczciwie, czy to ma sens i ile mniej więcej kosztuje.",
  },
  {
    n: "02",
    title: "Wycena w 24h",
    time: "do 24 godzin",
    place: "mail lub telefon",
    lead: "Jedna kwota, termin i lista tego, co dostajesz.",
    you: "Czytasz, pytasz o wszystko i decydujesz. Bez zobowiązań, bez nacisku.",
    me: "Przygotowuję wycenę na piśmie: cena, termin, zakres. Nic nie zmieni się bez Twojej zgody.",
  },
  {
    n: "03",
    title: "Projekt",
    time: "kilka dni",
    place: "widzisz go przed kodem",
    lead: "Najpierw zobaczysz, jak strona będzie wyglądać. Dopiero potem ją piszę.",
    you: "Oceniasz wygląd i teksty, zgłaszasz poprawki. Wysyłasz logo i zdjęcia, jeśli je masz.",
    me: "Projektuję układ, piszę lub redaguję teksty, dobieram zdjęcia. Poprawiam, aż będziesz zadowolony.",
  },
  {
    n: "04",
    title: "Wdrożenie",
    time: `landing ${getService("landing-page")?.timeline}, sklep ${getService("sklep-internetowy")?.timeline}`,
    place: "łącznie z projektem",
    lead: "Strona wychodzi na żywo, razem z domeną, hostingiem i Google.",
    you: "Akceptujesz projekt i zakładasz konto domeny i hostingu (pomogę krok po kroku).",
    me: "Koduję, podpinam domenę, konfiguruję Search Console i Mapy Google, testuję na telefonach.",
  },
  {
    n: "05",
    title: "30 dni wsparcia",
    time: "30 dni",
    place: "w cenie",
    lead: "Po starcie nie znikam. Strona ma działać, a nie tylko wisieć.",
    you: "Korzystasz ze strony i dajesz znać, gdyby coś przestało działać. Uczysz się edytować treści, jeśli chcesz.",
    me: "Naprawiam usterki, odpowiadam na pytania, pokazuję panel i sprawdzam, czy telefon dzwoni.",
  },
] as const;

export function Process({ index }: { index?: string }) {
  return (
    <section id="proces" className="container-x py-24 md:py-32">
      <SectionHead
        index={index}
        eyebrow="Jak pracuję"
        title={
          <>
            Pięć kroków. <Accent>Zero</Accent> niespodzianek.
          </>
        }
        lead="Wiesz, co będzie dalej, co jest po Twojej stronie i ile to potrwa. Nie musisz znać się na stronach."
      />

      <div className="mt-12 md:mt-20">
        <ProcessRail>
          <ol>
            {steps.map((s) => (
              <li key={s.n} className="relative pl-9 md:pl-14">
                <span
                  aria-hidden
                  className="absolute top-[2.15rem] left-0 size-[11px] rounded-full border-2 border-signal bg-paper md:top-[3.35rem]"
                />
                <Reveal y={16} className="grid gap-x-8 gap-y-6 border-t hairline py-8 md:grid-cols-12 md:py-12">
                  <div className="md:col-span-3">
                    <p className="font-display text-[clamp(3rem,6vw,5.5rem)] font-semibold text-ink/90 tabular-nums">
                      {s.n}
                    </p>
                    <p className="label-mono mt-3 text-ink">{s.time}</p>
                    <p className="label-mono mt-1 text-mute">{s.place}</p>
                  </div>

                  <div className="md:col-span-4">
                    <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold">{s.title}</h3>
                    <p className="mt-3 max-w-sm text-pretty text-mute">{s.lead}</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 md:col-span-5">
                    <div className="border-t hairline pt-3">
                      <p className="label-mono text-signal">Ty</p>
                      <p className="mt-2 text-pretty leading-relaxed">{s.you}</p>
                    </div>
                    <div className="border-t hairline pt-3">
                      <p className="label-mono text-mute">Ja, Bartek</p>
                      <p className="mt-2 text-pretty leading-relaxed">{s.me}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </ProcessRail>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t hairline pt-8">
        <ButtonLink href={contactHref({ zrodlo: "proces" })} variant="signal" size="lg" arrow>
          Umów 15 minut rozmowy
        </ButtonLink>
        <a
          href={site.phoneHref}
          className="label-mono inline-flex min-h-11 items-center text-mute underline-offset-4 hover:text-ink hover:underline"
        >
          lub zadzwoń: {site.phone}
        </a>
      </div>
    </section>
  );
}
