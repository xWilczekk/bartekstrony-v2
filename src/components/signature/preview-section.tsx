import "./signature.css";
import { Accent } from "@/components/ui/section-head";
import { getLocale } from "@/i18n/server";
import { Generator } from "./generator";

export function PreviewSection({ index }: { index?: string }) {
  const en = getLocale() === "en";
  return (
    <section aria-labelledby="podglad-title" className="bg-paper py-20 md:py-28">
      <div className="container-x">
        <Generator
          intro={
            <header className="border-t hairline pt-5">
              <p className="label-mono flex gap-3 text-mute">
                {index && <span className="text-signal">({index})</span>}
                <span>{en ? "Your website" : "Twoja strona"}</span>
              </p>
              <h2
                id="podglad-title"
                className="mt-6 font-display text-[clamp(2.2rem,3.9vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
              >
                {en ? (
                  <>
                    See your website <Accent>before you pay</Accent>.
                  </>
                ) : (
                  <>
                    Zobacz swoją stronę, <Accent>zanim zapłacisz</Accent>.
                  </>
                )}
              </h2>
              <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-pretty text-mute sm:text-[1.05rem]">
                {en ? (
                  <>
                    Type your business name and pick an industry, and the preview assembles before your eyes. Free, no
                    account needed. Like it? Send it to me with one click and ask for a quote.
                  </>
                ) : (
                  <>
                    Wpisz nazwę firmy i&nbsp;wybierz branżę, a&nbsp;podgląd złoży się na Twoich oczach. Za darmo, bez
                    zakładania konta. Spodoba się? Jednym kliknięciem wyślesz mi go z&nbsp;prośbą o&nbsp;wycenę.
                  </>
                )}
              </p>
            </header>
          }
        />
      </div>
    </section>
  );
}
