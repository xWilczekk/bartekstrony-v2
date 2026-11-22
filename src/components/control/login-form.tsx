"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/control/actions";
import { Button } from "@/components/ui/button";

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="mt-8 grid gap-4">
      <label htmlFor="password" className="label-mono text-mute">
        Hasło
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        disabled={!configured}
        aria-invalid={state.error ? true : undefined}
        aria-describedby={state.error ? "login-error" : undefined}
        className="h-14 rounded-[var(--radius)] border border-line bg-paper-2/60 px-4 text-lg focus:border-ink focus:outline-none aria-[invalid=true]:border-signal"
      />
      {state.error && (
        <p id="login-error" role="alert" className="text-sm font-medium before:mr-2 before:text-signal before:content-['●']">
          {state.error}
        </p>
      )}
      <Button type="submit" variant="ink" size="lg" arrow disabled={pending || !configured} className="mt-2">
        {pending ? "Sprawdzam…" : "Zaloguj"}
      </Button>
    </form>
  );
}
