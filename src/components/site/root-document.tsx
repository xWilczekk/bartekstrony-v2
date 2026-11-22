import type { ReactNode } from "react";
import { fontVariables } from "@/app/fonts";
import type { Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/client";
import { rootGraph } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { FunLayer } from "@/components/fun/fun-layer";
import { Analytics } from "./analytics";
import { LanguageSuggest } from "./language-suggest";
import { Providers } from "./providers";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import "@/app/globals.css";

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={fontVariables}>
      <body className="min-h-dvh">
        <span data-theme-v2="" data-palette="lime" hidden />
        <JsonLd data={rootGraph(locale)} />
        <LocaleProvider locale={locale}>
          <Providers>
            <SiteHeader />
            <main id="main" className="overflow-x-clip">
              {children}
            </main>
            <SiteFooter />
            <LanguageSuggest />
            <Analytics />
            <FunLayer />
          </Providers>
        </LocaleProvider>
      </body>
    </html>
  );
}
