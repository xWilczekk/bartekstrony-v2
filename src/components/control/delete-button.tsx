"use client";

export function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm("Usunąć to zapytanie na zawsze? Tego nie da się cofnąć.")) e.preventDefault();
      }}
      className="label-mono inline-flex h-10 items-center rounded-full border border-current/25 px-4 text-mute transition-colors hover:border-ink hover:text-ink"
    >
      Usuń zapytanie
    </button>
  );
}
