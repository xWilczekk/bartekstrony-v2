export const QUOTE_HREF = "/wycena";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ariaCurrent(pathname: string, href: string) {
  if (pathname === href) return "page" as const;
  return isActive(pathname, href) ? ("true" as const) : undefined;
}
