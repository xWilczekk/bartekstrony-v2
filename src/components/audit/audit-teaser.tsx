import { Accent, SectionHead } from "@/components/ui/section-head";
import { getLocale } from "@/i18n/server";
import { TeaserExample } from "./teaser-example";
import { SpeedCompare } from "@/components/fun/extras";
import { TeaserForm } from "./teaser-form";

const COPY = {
  pl: {
    eyebrow: "Darmowy audyt",
    title: (
      <>
        Ile klientów traci Twoja <Accent>obecna</Accent> strona?
      </>
    ),
    lead: "Masz już stronę, ale telefon nie dzwoni? Wklej adres. Po ok. 30 sekundach zobaczysz, jak ładuje się na telefonie, co widzi Google i co poprawić w pierwszej kolejności.",
    points: ["Wynik po polsku, bez żargonu", "Top 5 problemów do naprawy", "Bez rejestracji i bez maila"],
  },
  en: {
    eyebrow: "Free audit",
    title: (
      <>
        How many customers is your <Accent>current</Accent> site losing?
      </>
    ),
    lead: "Already have a website, but the phone doesn’t ring? Paste the address. In about 30 seconds you’ll see how it loads on a phone, what Google sees and what to fix first.",
    points: ["Results in plain English, no jargon", "Top 5 problems to fix", "No sign-up, no e-mail"],
  },
};

export function AuditTeaser({ index }: { index?: string }) {
  const c = COPY[getLocale()];
  return (
    <section id="audyt" className="theme-ink py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          index={index}
          eyebrow={c.eyebrow}
          title={c.title}
          lead={c.lead}
        />

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <TeaserForm />
            <ul className="label-mono mt-10 grid gap-3 text-mute">
              {c.points.map((p, i) => (
                <li key={p} className="flex gap-3">
                  <span className="text-signal">0{i + 1}</span> {p}
                </li>
              ))}
            </ul>
            <SpeedCompare className="mt-8" />
          </div>

          <div className="md:col-span-7">
            <TeaserExample />
          </div>
        </div>
      </div>
    </section>
  );
}
