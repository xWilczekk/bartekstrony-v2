import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif, Manrope } from "next/font/google";

const geist = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  display: "swap",
  preload: false,
});
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin", "latin-ext"], display: "swap" });

export const fontVariables = `${geist.variable} ${geistMono.variable} ${bricolage.variable} ${instrument.variable} ${manrope.variable}`;
