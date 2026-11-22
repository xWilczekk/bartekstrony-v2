import { Wordmark } from "@/components/site/wordmark";
import { controlConfigured } from "@/lib/control-auth";
import { LoginForm } from "./login-form";

export function LoginScreen() {
  const configured = controlConfigured();
  return (
    <div className="grid min-h-dvh place-items-center bg-paper-2 px-4">
      <div className="w-full max-w-sm rounded-[calc(var(--radius)+6px)] border hairline bg-paper p-7 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.35)] sm:p-9">
        <Wordmark />
        <p className="label-mono mt-2 text-mute">Panel · zapytania i statystyki</p>
        {!configured && (
          <p className="mt-6 rounded-[var(--radius)] bg-paper-2 p-4 text-sm leading-relaxed">
            Ustaw zmienną <code className="font-mono">CONTROL_PASSWORD</code> (min. 8 znaków) — lokalnie w{" "}
            <code className="font-mono">.env.local</code>, na produkcji w ustawieniach Vercela.
          </p>
        )}
        <LoginForm configured={configured} />
      </div>
    </div>
  );
}
