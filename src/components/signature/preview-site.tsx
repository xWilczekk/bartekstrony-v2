"use client";

import "./preview.css";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  BRAND_PALETTE,
  LOCATIVE,
  SAMPLE_PHONE,
  resolveKit,
  sampleAddress,
  type Ctx,
  type Group,
  type Hero,
  type Item,
  type Kit,
  type Palette,
  type Section,
  type Txt,
  type Widget,
} from "@/content/preview-kits";
import { displayName, normalize, resolveVariant, slugDomain, type PreviewState, type VibeSlug } from "./preview-model";
import { HeroArt, MapArt, ThumbArt } from "./preview-art";
import { TypeText } from "./type-text";

export type PreviewMode = "frame" | "page";

type PvCtx = {
  c: Ctx;
  kit: Kit;
  vibe: VibeSlug;
  mode: PreviewMode;
  cart: number;
  bump: number;
};

const Pv = createContext<PvCtx | null>(null);
const usePv = () => {
  const v = useContext(Pv);
  if (!v) throw new Error("PreviewSite context missing");
  return v;
};

const YEAR = new Date().getFullYear();

const nb = (s: string) => s.replace(/(?<=^|[\s(„])([aiouwzAIOUWZ])\s+/g, "$1 ");

const tx = (v: Txt | undefined, c: Ctx) => (v === undefined ? "" : nb(typeof v === "function" ? v(c) : v));

function rich(s: string): ReactNode {
  const parts = s.split("*");
  if (parts.length < 3) return s;
  return parts.map((p, i) => (i % 2 ? <em key={i} className="pv-em">{p}</em> : p));
}

export function locative(city: string) {
  const key = normalize(city).trim().replace(/\s+/g, " ");
  return key ? (LOCATIVE[key] ?? "") : "";
}

function initials(name: string) {
  const words = name
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/[\s-]+/)
    .filter((w) => w.length > 1 || /\p{N}/u.test(w));
  const letters = (words.length ? words : [name]).slice(0, 2).map((w) => w[0] ?? "");
  return letters.join("").toUpperCase() || "•";
}

const accentLast = (s: string): ReactNode => {
  const i = s.trimEnd().lastIndexOf(" ");
  if (i <= 0) return s;
  return (
    <>
      {s.slice(0, i + 1)}
      <em className="pv-em">{s.slice(i + 1)}</em>
    </>
  );
};

const lenBucket = (s: string) => (s.length <= 12 ? "s" : s.length <= 20 ? "m" : s.length <= 32 ? "l" : "xl");

function paletteVars(p: Palette): CSSProperties {
  return {
    "--pv-bg": p.bg,
    "--pv-surface": p.surface,
    "--pv-ink": p.ink,
    "--pv-muted": p.muted,
    "--pv-accent": p.accent,
    "--pv-on-accent": p.onAccent,
    "--pv-accent-ink": p.accentInk,
    "--pv-line": p.line,
    "--pv-deep": p.deep,
    "--pv-on-deep": p.onDeep,
    "--pv-foot": p.foot,
    "--pv-on-foot": p.onFoot,
  } as CSSProperties;
}

const idx = (i: number) => ({ "--i": i }) as CSSProperties;
const jdx = (j: number) => ({ "--j": j }) as CSSProperties;

const T = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={className ? `pv-t ${className}` : "pv-t"}>{children}</span>
);

function H({ level, className, children }: { level: 1 | 2 | 3; className: string; children: ReactNode }) {
  const { mode } = usePv();
  if (mode === "page") {
    const Tag = level === 1 ? "h1" : level === 2 ? "h2" : "h3";
    return <Tag className={className}>{children}</Tag>;
  }
  return <div className={className}>{children}</div>;
}

const Mock = ({ children, ghost, small, icon }: { children: ReactNode; ghost?: boolean; small?: boolean; icon?: ReactNode }) => (
  <span className={`pv-btn pv-b${ghost ? " pv-btn--ghost" : ""}${small ? " pv-btn--sm" : ""}`}>
    {icon}
    <span className="pv-btn-label">{children}</span>
  </span>
);

function Ctl({ className, onClick, children, label }: { className: string; onClick: () => void; children: ReactNode; label?: string }) {
  const { mode } = usePv();
  return (
    <button type="button" className={className} onClick={onClick} tabIndex={mode === "page" ? undefined : -1} aria-label={label}>
      {children}
    </button>
  );
}

function GoTo({ id, className, children }: { id: string; className: string; children: ReactNode }) {
  const { mode } = usePv();
  if (mode === "page") {
    return (
      <a href={`#pv-${id}`} data-goto={id} className={className}>
        {children}
      </a>
    );
  }
  return (
    <span data-goto={id} className={className}>
      {children}
    </span>
  );
}

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="pv-ico" aria-hidden="true">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" fill="currentColor" />
  </svg>
);
const CartIcon = () => (
  <svg viewBox="0 0 24 24" className="pv-ico" aria-hidden="true">
    <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.2 4l.6 3h14.4l-1.9 7.6a2 2 0 0 1-1.9 1.4H8.6a2 2 0 0 1-2-1.6L4.4 2H2V0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const Stars = () => <span className="pv-stars" aria-label="5 na 5">★★★★★</span>;

function Head({ s, center }: { s: Pick<Section, "eyebrow" | "title" | "lead">; center?: boolean }) {
  const { c } = usePv();
  return (
    <header className={`pv-head${center ? " pv-head--center" : ""}`}>
      {s.eyebrow && (
        <p className="pv-eyebrow">
          <T>{tx(s.eyebrow, c)}</T>
        </p>
      )}
      <H level={2} className="pv-h2 pv-display">
        <T>{rich(tx(s.title, c))}</T>
      </H>
      {s.lead && (
        <p className="pv-lead">
          <T>{tx(s.lead, c)}</T>
        </p>
      )}
    </header>
  );
}

function Nav() {
  const { c, kit, cart, bump } = usePv();
  const links = kit.sections.filter((s) => s.nav).slice(0, 4);
  const cta = tx(kit.navCta, c);
  return (
    <header className="pv-nav" style={idx(0)}>
      <div className="pv-wrap pv-nav-in">
        <GoTo id="top" className="pv-logo">
          <span className="pv-monogram pv-b">{initials(c.name)}</span>
          <span className="pv-logo-txt">
            <T className="pv-logo-name">
              <TypeText text={c.name} />
            </T>
            <T className="pv-logo-cat">{kit.category}</T>
          </span>
        </GoTo>
        <nav className="pv-links" aria-label="Menu podglądu">
          {links.map((s) => (
            <GoTo key={s.id} id={s.id} className="pv-link">
              <T>{s.nav}</T>
            </GoTo>
          ))}
        </nav>
        <span className="pv-nav-cta">
          {kit.navIcon === "cart" ? (
            <span className="pv-btn pv-btn--sm pv-btn--ghost pv-b pv-cart">
              <CartIcon />
              <span className="pv-btn-label">{cta}</span>
              <span key={bump} className="pv-cart-count">
                {cart}
              </span>
            </span>
          ) : (
            <Mock small icon={kit.navIcon === "phone" ? <PhoneIcon /> : undefined}>
              {cta}
            </Mock>
          )}
        </span>
        <span className="pv-burger" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
    </header>
  );
}

function HeroWidget({ w }: { w: Widget }) {
  const { c } = usePv();
  switch (w.kind) {
    case "facts":
      return (
        <dl className="pv-facts">
          {w.items.map(([k, v]) => (
            <div key={k} className="pv-fact">
              <dt>
                <T>{k}</T>
              </dt>
              <dd>
                <T>{tx(v, c)}</T>
              </dd>
            </div>
          ))}
        </dl>
      );
    case "search":
    case "booking":
      return (
        <div className="pv-search pv-b">
          {w.fields.map(([k, v]) => (
            <div key={k} className="pv-field">
              <span className="pv-field-k">
                <T>{k}</T>
              </span>
              <span className="pv-field-v">
                <T>{typeof v === "string" ? v : tx(v, c)}</T>
              </span>
            </div>
          ))}
          <Mock>{w.button}</Mock>
        </div>
      );
    case "slots":
      return (
        <div className="pv-slots">
          <p className="pv-slots-label">
            <T>{w.label}</T>
          </p>
          <div className="pv-slot-row">
            {w.slots.map((s, i) => (
              <span key={s} className={`pv-slot pv-b${i === 0 ? " is-on" : ""}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      );
    case "badges":
      return (
        <ul className="pv-badges">
          {w.items.map((b) => (
            <li key={b}>
              <T>{b}</T>
            </li>
          ))}
        </ul>
      );
    case "phone":
      return (
        <div className="pv-phone">
          <span className="pv-phone-k">
            <T>Zadzwoń — odbieramy całą dobę</T>
          </span>
          <span className="pv-phone-v pv-display">
            <T>{SAMPLE_PHONE}</T>
          </span>
        </div>
      );
    case "calc":
      return <Calc compact />;
  }
}

function HeroSection({ hero }: { hero: Hero }) {
  const { c, kit } = usePv();
  const named = !hero.title;
  const eyebrow = tx(hero.eyebrow, c);
  return (
    <section className={`pv-hero pv-hero--${hero.layout}`} data-sec="top" id="pv-top" style={idx(1)}>
      <div className="pv-wrap pv-hero-in">
        <div className="pv-hero-copy">
          <p className="pv-eyebrow">
            {named ? (
              <T>{eyebrow}</T>
            ) : (
              <T>
                <strong className="pv-eyebrow-name">
                  <TypeText text={c.name} />
                </strong>
                <span> · {eyebrow}</span>
              </T>
            )}
          </p>
          <H level={1} className="pv-hero-title pv-display">
            {named ? (
              <T>
                <span data-len={lenBucket(c.name)} className="pv-name">
                  <TypeText text={nb(c.name)} render={accentLast} />
                </span>
              </T>
            ) : (
              <T>{rich(tx(hero.title, c))}</T>
            )}
          </H>
          <p className="pv-lead pv-hero-lead">
            <T>{tx(hero.lead, c)}</T>
          </p>
          <div className="pv-actions">
            <Mock>{hero.primary}</Mock>
            {hero.secondary && <Mock ghost>{hero.secondary}</Mock>}
          </div>
          {hero.widget && hero.layout !== "center" && <HeroWidget w={hero.widget} />}
        </div>
        <div className="pv-hero-art pv-art">
          <div className="pv-ph" aria-hidden="true" />
          <HeroArt kind={kit.art} wide={hero.layout === "center"} />
          {hero.badge && (
            <div className="pv-badge pv-b">
              <span className="pv-badge-k">{hero.badge[0]}</span>
              <span className="pv-badge-v">{hero.badge[1]}</span>
            </div>
          )}
        </div>
        {hero.widget && hero.layout === "center" && (
          <div className="pv-hero-widget">
            <HeroWidget w={hero.widget} />
          </div>
        )}
      </div>
    </section>
  );
}

function MenuSection({ s }: { s: Extract<Section, { kind: "menu" }> }) {
  const { c } = usePv();
  const [tab, setTab] = useState(0);
  const group: Group = s.groups[Math.min(tab, s.groups.length - 1)];
  return (
    <>
      <Head s={s} center />
      <div className="pv-tabs" role="presentation">
        {s.groups.map((g, i) => (
          <Ctl key={g.name} className={`pv-tab pv-b${i === tab ? " is-on" : ""}`} onClick={() => setTab(i)}>
            {g.name}
          </Ctl>
        ))}
      </div>
      <ul key={tab} className={`pv-menu-list${tab ? " is-switched" : ""}`}>
        {group.items.map((it, j) => (
          <li key={j} className="pv-menu-item" style={jdx(j)}>
            <span className="pv-menu-row">
              <T className="pv-menu-name">{tx(it.name, c)}</T>
              <span className="pv-leader" aria-hidden="true" />
              <T className="pv-price">{tx(it.price, c)}</T>
            </span>
            {it.note && <T className="pv-menu-note">{tx(it.note, c)}</T>}
          </li>
        ))}
      </ul>
      {s.note && (
        <p className="pv-note">
          <T>{tx(s.note, c)}</T>
        </p>
      )}
    </>
  );
}

function PriceList({ s }: { s: Extract<Section, { kind: "pricelist" }> }) {
  const { c } = usePv();
  return (
    <>
      <Head s={s} />
      <div className="pv-pricelist">
        {s.groups.map((g, gi) => (
          <div key={g.name} className="pv-pl-group" style={jdx(gi)}>
            <p className="pv-pl-name">
              <T>{g.name}</T>
            </p>
            <ul>
              {g.items.map((it, j) => (
                <li key={j} className="pv-menu-row">
                  <T className="pv-menu-name">{tx(it.name, c)}</T>
                  <span className="pv-leader" aria-hidden="true" />
                  <T className="pv-price">{tx(it.price, c)}</T>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {s.note && (
        <p className="pv-note">
          <T>{tx(s.note, c)}</T>
        </p>
      )}
    </>
  );
}

function Cards({ s }: { s: Extract<Section, { kind: "cards" }> }) {
  const { c } = usePv();
  return (
    <>
      <Head s={s} />
      <ul className="pv-cards">
        {s.items.map((it, j) => (
          <li key={j} className="pv-card pv-b" style={jdx(j)}>
            <span className="pv-card-no">
              <T>{String(j + 1).padStart(2, "0")}</T>
            </span>
            <H level={3} className="pv-h3">
              <T>{tx(it.name, c)}</T>
            </H>
            {it.note && (
              <p className="pv-card-note">
                <T>{tx(it.note, c)}</T>
              </p>
            )}
            {it.price && <T className="pv-card-price">{tx(it.price, c)}</T>}
          </li>
        ))}
      </ul>
    </>
  );
}

function GalleryItem({ it, style, j }: { it: Item; style: Extract<Section, { kind: "gallery" }>["style"]; j: number }) {
  const { c, mode } = usePv();
  const [added, setAdded] = useState(false);
  return (
    <li className={`pv-gi pv-gi--${style}`} style={jdx(j)}>
      <div className="pv-gi-img pv-art">
        <div className="pv-ph" aria-hidden="true" />
        {it.thumb && <ThumbArt thumb={it.thumb} />}
        {it.badge && <span className="pv-gi-badge pv-b">{it.badge}</span>}
      </div>
      <div className="pv-gi-body">
        <H level={3} className="pv-h3">
          <T>{tx(it.name, c)}</T>
        </H>
        {it.note && (
          <p className="pv-gi-note">
            <T>{tx(it.note, c)}</T>
          </p>
        )}
        {it.meta && it.meta.length > 0 && (
          <ul className="pv-meta">
            {it.meta.map((m, k) => (
              <li key={k}>
                <T>{tx(m, c)}</T>
              </li>
            ))}
          </ul>
        )}
        {(it.price || style === "products") && (
          <div className="pv-gi-foot">
            {it.price && (
              <span className="pv-gi-price">
                <T>{tx(it.price, c)}</T>
                {it.old && <s className="pv-old">{it.old}</s>}
              </span>
            )}
            {style === "products" ? (
              <Ctl
                className={`pv-add pv-b${added ? " is-added" : ""}`}
                onClick={() => setAdded(true)}
                label={mode === "page" ? `Dodaj do koszyka: ${tx(it.name, c)}` : undefined}
              >
                <span data-cart="" className="pv-add-in">
                  {added ? "W koszyku ✓" : "Do koszyka"}
                </span>
              </Ctl>
            ) : style === "fleet" || style === "rooms" ? (
              <span className="pv-gi-more">
                <T>{style === "rooms" ? "Rezerwuj →" : "Szczegóły →"}</T>
              </span>
            ) : null}
          </div>
        )}
      </div>
    </li>
  );
}

function Gallery({ s }: { s: Extract<Section, { kind: "gallery" }> }) {
  const { c } = usePv();
  const [chip, setChip] = useState(0);
  return (
    <>
      <Head s={s} />
      {s.chips && (
        <div className="pv-chips" role="presentation">
          {s.chips.map((ch, i) => (
            <Ctl key={ch} className={`pv-chip pv-b${i === chip ? " is-on" : ""}`} onClick={() => setChip(i)}>
              {ch}
            </Ctl>
          ))}
        </div>
      )}
      <ul className={`pv-gallery pv-gallery--${s.style}`}>
        {s.items.map((it, j) => (
          <GalleryItem key={j} it={it} style={s.style} j={j} />
        ))}
      </ul>
      {s.note && (
        <p className="pv-note">
          <T>{tx(s.note, c)}</T>
        </p>
      )}
    </>
  );
}

function Routes({ s }: { s: Extract<Section, { kind: "routes" }> }) {
  const { c } = usePv();
  return (
    <>
      <Head s={s} center />
      <ul className="pv-routes">
        {s.items.map((it, j) => (
          <li key={j} className="pv-route" style={jdx(j)}>
            <span className="pv-route-name">
              <T>{tx(it.name, c)}</T>
              {it.note && <T className="pv-route-note">{tx(it.note, c)}</T>}
            </span>
            <T className="pv-route-price pv-b">{tx(it.price, c)}</T>
          </li>
        ))}
      </ul>
      {s.note && (
        <p className="pv-note pv-note--center">
          <T>{tx(s.note, c)}</T>
        </p>
      )}
    </>
  );
}

function Steps({ s }: { s: Extract<Section, { kind: "steps" }> }) {
  return (
    <>
      <Head s={s} />
      <ol className="pv-steps" data-n={s.items.length}>
        {s.items.map((it, j) => (
          <li key={j} className="pv-step" style={jdx(j)}>
            <span className="pv-step-no pv-b">{j + 1}</span>
            <H level={3} className="pv-h3">
              <T>{it.name}</T>
            </H>
            <p className="pv-step-note">
              <T>{it.note}</T>
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}

function FormSection({ s }: { s: Extract<Section, { kind: "form" }> }) {
  const { c } = usePv();
  return (
    <div className="pv-form-grid">
      <div>
        <Head s={s} />
        {s.aside && (
          <ul className="pv-ticks">
            {s.aside.map((a, k) => (
              <li key={k}>
                <T>{tx(a, c)}</T>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={`pv-form pv-b pv-form--${s.style}`}>
        {s.fields.map(([k, v]) => (
          <div key={k} className="pv-input">
            <span className="pv-input-k">
              <T>{k}</T>
            </span>
            <span className="pv-input-v pv-b">
              <T>{tx(v, c)}</T>
            </span>
          </div>
        ))}
        <Mock>{s.button}</Mock>
      </div>
    </div>
  );
}

function Features({ s }: { s: Extract<Section, { kind: "features" }> }) {
  return (
    <>
      <Head s={s} />
      <ul className="pv-features" data-n={s.items.length}>
        {s.items.map((it, j) => (
          <li key={j} className="pv-feature" style={jdx(j)}>
            <span className="pv-feature-mark pv-b" aria-hidden="true" />
            <H level={3} className="pv-h3">
              <T>{it.name}</T>
            </H>
            {it.note && (
              <p className="pv-feature-note">
                <T>{it.note}</T>
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

const fmt = (n: number, digits = 0) =>
  new Intl.NumberFormat("pl-PL", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n);

function Calc({ compact }: { compact?: boolean }) {
  const { mode } = usePv();
  const [bill, setBill] = useState(350);
  const kwh = (bill * 12) / 1.1;
  const kwp = Math.max(2, Math.round((kwh / 1000) * 1.2 * 10) / 10);
  const save = Math.round((bill * 12 * 0.75) / 50) * 50;
  return (
    <div className={`pv-calc pv-b${compact ? " pv-calc--compact" : ""}`}>
      <label className="pv-calc-row">
        <span className="pv-calc-k">
          <T>Twój rachunek za prąd</T>
        </span>
        <span className="pv-calc-v">
          <T>{fmt(bill)} zł / mies.</T>
        </span>
        <input
          className="pv-range"
          type="range"
          min={100}
          max={1000}
          step={10}
          value={bill}
          tabIndex={mode === "page" ? undefined : -1}
          onChange={(e) => setBill(Number(e.target.value))}
          aria-label="Miesięczny rachunek za prąd w złotych"
          style={{ "--p": `${((bill - 100) / 900) * 100}%` } as CSSProperties}
        />
      </label>
      <div className="pv-calc-out">
        <div>
          <span className="pv-calc-k">
            <T>Sugerowana moc</T>
          </span>
          <span className="pv-calc-big pv-display">
            <T>{fmt(kwp, 1)} kWp</T>
          </span>
        </div>
        <div>
          <span className="pv-calc-k">
            <T>Oszczędność rocznie</T>
          </span>
          <span className="pv-calc-big pv-display pv-accent-ink">
            <T>ok. {fmt(save)} zł</T>
          </span>
        </div>
      </div>
      {!compact && (
        <p className="pv-calc-note">
          <T>Szacunek orientacyjny. Dokładne wyliczenie po bezpłatnym audycie.</T>
        </p>
      )}
    </div>
  );
}

function Faq({ s }: { s: Extract<Section, { kind: "faq" }> }) {
  const { mode } = usePv();
  return (
    <div className="pv-faq-grid">
      <Head s={s} />
      <div className="pv-faq">
        {s.items.map((q, j) => (
          <details key={j} className="pv-qa" style={jdx(j)} open={j === 0}>
            <summary tabIndex={mode === "page" ? undefined : -1}>
              <T>{q.q}</T>
              <span className="pv-qa-plus" aria-hidden="true" />
            </summary>
            <p>{q.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function Reviews({ s }: { s: Extract<Section, { kind: "reviews" }> }) {
  return (
    <>
      <Head s={s} center />
      <ul className="pv-reviews">
        {s.items.map((q, j) => (
          <li key={j} className="pv-review pv-b" style={jdx(j)}>
            <Stars />
            <blockquote>
              <T>„{q}”</T>
            </blockquote>
            <span className="pv-review-by">
              <T>Przykładowa opinia</T>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Hours({ s }: { s: Extract<Section, { kind: "hours" }> }) {
  const { c } = usePv();
  return (
    <div className="pv-hours-grid">
      <div>
        <Head s={s} />
        {s.aside && (
          <p className="pv-note">
            <T>{tx(s.aside, c)}</T>
          </p>
        )}
      </div>
      <dl className="pv-hours">
        {s.rows.map(([d, h], j) => (
          <div key={d} className="pv-hours-row" style={jdx(j)}>
            <dt>
              <T>{d}</T>
            </dt>
            <dd>
              <T>{h}</T>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Contact({ s }: { s: Extract<Section, { kind: "contact" }> }) {
  const { c, kit } = usePv();
  const rows: [string, string][] = [
    ["Adres", sampleAddress(c)],
    ["Telefon", SAMPLE_PHONE],
    ["E-mail", `kontakt@${c.domain}`],
    ["Godziny", kit.hours],
  ];
  return (
    <div className="pv-contact-grid">
      <div>
        <Head s={s} />
        <dl className="pv-contact">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>
                <T>{k}</T>
              </dt>
              <dd>
                <T>{k === "E-mail" ? <TypeText text={v} /> : v}</T>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="pv-map pv-art">
        <div className="pv-ph" aria-hidden="true" />
        <MapArt label={c.name} />
      </div>
    </div>
  );
}

function Band({ s }: { s: Extract<Section, { kind: "band" }> }) {
  const { c } = usePv();
  if (s.style === "usp") {
    return (
      <ul className="pv-usp">
        {(s.items ?? []).map((u, j) => (
          <li key={u} style={jdx(j)}>
            <T>{u}</T>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className={`pv-band pv-band--${s.style}`}>
      <div className="pv-band-copy">
        {s.eyebrow && (
          <p className="pv-eyebrow">
            <T>{s.eyebrow}</T>
          </p>
        )}
        <H level={2} className="pv-h2 pv-display">
          <T>{rich(tx(s.title, c))}</T>
        </H>
        {s.lead && (
          <p className="pv-lead">
            <T>{tx(s.lead, c)}</T>
          </p>
        )}
      </div>
      <div className="pv-band-action">
        {s.style === "newsletter" && (
          <span className="pv-input-v pv-b pv-email">
            <T>Twój e-mail</T>
          </span>
        )}
        {s.style === "phone" ? (
          <span className="pv-band-phone pv-display">
            <T>{tx(s.button, c)}</T>
          </span>
        ) : (
          s.button && <Mock>{tx(s.button, c)}</Mock>
        )}
      </div>
    </div>
  );
}

function SectionView({ s, i }: { s: Section; i: number }) {
  const band = s.kind === "band";
  const body = (() => {
    switch (s.kind) {
      case "menu": return <MenuSection s={s} />;
      case "pricelist": return <PriceList s={s} />;
      case "cards": return <Cards s={s} />;
      case "gallery": return <Gallery s={s} />;
      case "routes": return <Routes s={s} />;
      case "steps": return <Steps s={s} />;
      case "form": return <FormSection s={s} />;
      case "features": return <Features s={s} />;
      case "calc": return (
        <div className="pv-calc-grid">
          <Head s={s} />
          <Calc />
        </div>
      );
      case "faq": return <Faq s={s} />;
      case "reviews": return <Reviews s={s} />;
      case "hours": return <Hours s={s} />;
      case "contact": return <Contact s={s} />;
      case "band": return <Band s={s} />;
    }
  })();
  return (
    <section
      id={`pv-${s.id}`}
      data-sec={s.id}
      data-label={s.nav ?? s.eyebrow ?? ""}
      className={`pv-sec pv-sec--${s.kind}${band ? ` pv-sec--band-${s.style}` : ""}${!band && i % 2 === 0 ? " pv-sec--alt" : ""}`}
      style={idx(i)}
    >
      <div className="pv-wrap">{body}</div>
    </section>
  );
}

function CtaBand({ i }: { i: number }) {
  const { c, kit } = usePv();
  return (
    <section className="pv-sec pv-cta" data-sec="cta" data-label="Kontakt" style={idx(i)}>
      <div className="pv-wrap pv-cta-in">
        <H level={2} className="pv-h2 pv-display pv-cta-title">
          <T>{rich(tx(kit.cta.title, c))}</T>
        </H>
        <div className="pv-cta-side">
          <p className="pv-lead">
            <T>{tx(kit.cta.lead, c)}</T>
          </p>
          <Mock icon={/^Zadzwo/.test(tx(kit.cta.button, c)) ? <PhoneIcon /> : undefined}>{tx(kit.cta.button, c)}</Mock>
        </div>
      </div>
    </section>
  );
}

function Footer({ i }: { i: number }) {
  const { c, kit } = usePv();
  return (
    <footer className="pv-foot" style={idx(i)}>
      <div className="pv-wrap">
        <div className="pv-foot-top">
          <div className="pv-foot-brand">
            <span className="pv-monogram pv-b">{initials(c.name)}</span>
            <div>
              <p className="pv-foot-name">
                <T>
                  <TypeText text={c.name} />
                </T>
              </p>
              <p className="pv-foot-cat">
                <T>
                  {kit.category}
                  {c.city ? ` · ${c.city}` : ""}
                </T>
              </p>
            </div>
          </div>
          <dl className="pv-foot-cols">
            <div>
              <dt>
                <T>Kontakt</T>
              </dt>
              <dd>
                <T>{SAMPLE_PHONE}</T>
              </dd>
              <dd>
                <T>kontakt@{c.domain}</T>
              </dd>
            </div>
            <div>
              <dt>
                <T>Godziny</T>
              </dt>
              <dd>
                <T>{kit.hours}</T>
              </dd>
            </div>
          </dl>
        </div>
        <div className="pv-foot-bottom">
          <span>
            © {YEAR} {c.name}
          </span>
          <span>Projekt i wykonanie: bartekstrony.pl</span>
        </div>
      </div>
    </footer>
  );
}

export type PreviewSiteProps = {
  state: PreviewState;
  mode: PreviewMode;
  onGoto?: (id: string) => void;
  onTheme?: (theme: { bg: string; ink: string }) => void;
  brand?: boolean;
  className?: string;
};

export function PreviewSite({ state, mode, onGoto, onTheme, brand, className }: PreviewSiteProps) {
  const name = displayName(state);
  const variant = resolveVariant(state.industry, name);
  const kit = resolveKit(state.industry, variant);
  const city = state.city.trim();
  const c: Ctx = { name, city, inCity: locative(city), domain: slugDomain(name) };
  const palette = brand ? BRAND_PALETTE : kit.palettes[state.vibe];
  useEffect(() => {
    onTheme?.({ bg: palette.bg, ink: palette.ink });
  }, [onTheme, palette.bg, palette.ink]);
  const [cart, setCart] = useState(0);
  const [bump, setBump] = useState(0);

  const build = `${state.industry}:${variant ?? "base"}:${state.vibe}`;
  const n = kit.sections.length;

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-cart]")) {
      setCart((v) => v + 1);
      setBump((v) => v + 1);
      return;
    }
    const go = target.closest<HTMLElement>("[data-goto]");
    if (go?.dataset.goto && onGoto) {
      e.preventDefault();
      onGoto(go.dataset.goto);
    }
  };

  return (
    <Pv.Provider value={{ c, kit, vibe: state.vibe, mode, cart, bump }}>
      <div
        className={`pv${className ? ` ${className}` : ""}`}
        data-vibe={state.vibe}
        data-mode={mode}
        data-mark={palette.mark ? "" : undefined}
        style={paletteVars(palette)}
        onClick={onClick}
      >
        <div key={build} className="pv-build">
          {kit.announce && (
            <p className="pv-announce" style={idx(0)}>
              <T>{tx(kit.announce, c)}</T>
            </p>
          )}
          <Nav />
          <HeroSection hero={kit.hero} />
          {kit.sections.map((s, i) => (
            <SectionView key={s.id} s={s} i={i + 2} />
          ))}
          <CtaBand i={n + 2} />
          <Footer i={n + 3} />
        </div>
        {mode === "page" && (
          <div className="pv-callbar">
            <span className="pv-btn pv-b">
              <PhoneIcon />
              <span className="pv-btn-label">Zadzwoń</span>
            </span>
            <span className="pv-btn pv-btn--ghost pv-b">
              <span className="pv-btn-label">{kit.hero.primary}</span>
            </span>
          </div>
        )}
      </div>
    </Pv.Provider>
  );
}

export default PreviewSite;
