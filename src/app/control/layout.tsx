import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/app/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: { default: "Panel", template: "%s · Panel bartekstrony" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export const viewport: Viewport = { themeColor: "#fafaf7", colorScheme: "light" };

export default function ControlLayout({ children }: LayoutProps<"/control">) {
  return (
    <html lang="pl" className={fontVariables}>
      <body className="min-h-dvh bg-paper text-ink">
        <span data-theme-v2="" data-palette="lime" hidden />
        {children}
      </body>
    </html>
  );
}
