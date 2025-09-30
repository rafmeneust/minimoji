// src/components/auth/login-form.jsx
import { useState } from "react";
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function GoogleIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.611 20.083h-1.611v-.083H24v8h11.303A13.996 13.996 0 0 1 10 24a14 14 0 0 1 14-14c3.579 0 6.847 1.356 9.353 3.575l5.657-5.657C34.912 4.058 29.702 2 24 2 11.85 2 2 11.85 2 24s9.85 22 22 22 22-9.85 22-22c0-1.315-.137-2.601-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817A13.996 13.996 0 0 1 24 10c3.579 0 6.847 1.356 9.353 3.575l5.657-5.657C34.912 4.058 29.702 2 24 2 14.49 2 6.359 7.738 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 46c5.557 0 10.63-2.132 14.438-5.61l-6.667-5.637A13.958 13.958 0 0 1 24 38c-6.004 0-11.079-3.86-12.897-9.231l-6.571 5.061C7.455 40.117 15.048 46 24 46z"/>
      <path fill="#1976D2" d="M43.611 20.083H24v8h11.303A14.01 14.01 0 0 1 24 38c-5.004 0-9.579-2.804-11.897-6.969l-6.571 5.061C8.955 40.117 15.048 46 24 46c12.15 0 22-9.85 22-22 0-1.315-.137-2.601-.389-3.917z"/>
    </svg>
  );
}

export default function LoginForm({ onSubmitEmail, onGoogle, onReset, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [mode, setMode] = useState("login");

  const mapError = (code, fallback) => {
    const MSG = {
      "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
      "auth/invalid-email": "Adresse e-mail invalide.",
      "auth/user-disabled": "Compte désactivé.",
      "auth/too-many-requests": "Trop d’essais. Réessaie plus tard.",
      "auth/email-already-in-use": "Un compte existe déjà avec cet e-mail.",
      "auth/weak-password": "Mot de passe trop faible (6+ caractères).",
      "ui/missing-email": "Saisis ton e-mail.",
    };
    return MSG[code] || fallback || "Une erreur est survenue.";
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setInfo("");
    const handler = mode === "signup" ? onSignup : onSubmitEmail;
    if (!handler) return setError("Action indisponible. Réessaie plus tard.");
    try {
      setPending(true);
      await handler(email, password);
    } catch (e) {
      setError(mapError(e?.code, e?.message));
    } finally {
      setPending(false);
    }
  }

  async function handleForgot() {
    setError(""); setInfo("");
    if (!onReset) return;
    try {
      setPending(true);
      await onReset(email);
      setInfo("Si un compte existe pour cet e-mail, un lien de réinitialisation a été envoyé.");
    } catch (e) {
      setError(mapError(e?.code, e?.message));
    } finally {
      setPending(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <Card
      className={[
        "w-full transition",
        isSignup ? "ring-1 ring-accent/40 bg-accent/5" : "ring-1 ring-muted/40 bg-background",
      ].join(" ")}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              {isSignup ? "Créer un compte" : "Connexion"}
            </CardTitle>
            <CardDescription className="text-sm">
              {isSignup
                ? "Créez votre accès à l’espace Minimoji."
                : "Accédez à votre espace Minimoji"}
            </CardDescription>
          </div>

          <div className="inline-flex rounded-full bg-muted/50 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              aria-pressed={!isSignup}
              className={[
                "px-3 py-1 text-xs rounded-full transition whitespace-nowrap",
                !isSignup
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
              disabled={pending}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              aria-pressed={isSignup}
              className={[
                "px-3 py-1 text-xs rounded-full transition whitespace-nowrap",
                isSignup
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
              disabled={pending}
            >
              Créer
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Button
          type="button"
          onClick={() => onGoogle?.()}
          disabled={pending}
          className="w-full h-10 gap-2 bg-white text-gray-900 border hover:bg-white/90 shadow-sm"
        >
          <GoogleIcon />
          <span className="font-medium whitespace-nowrap">Continuer avec Google</span>
        </Button>

        <div className="relative my-1">
          <Separator />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-background px-2 text-xs text-muted-foreground">
            ou e-mail
          </span>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignup ? "6 caractères minimum" : undefined}
            />
          </div>

          <div aria-live="polite" className="space-y-1 min-h-[1.25rem]">
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            {info && <p className="text-sm text-green-600">{info}</p>}
          </div>

          <Button
            type="submit"
            className="w-full whitespace-nowrap"
            disabled={pending}
            aria-disabled={pending}
            aria-busy={pending}
          >
            {pending
              ? (isSignup ? "Création…" : "Connexion…")
              : (isSignup ? "Créer mon compte" : "Se connecter")}
          </Button>

          {!isSignup && (
            <div className="text-center text-sm">
              <button
                type="button"
                className="underline underline-offset-4"
                onClick={handleForgot}
                disabled={pending}
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          En continuant, vous acceptez nos conditions d’utilisation.
        </span>
        <button
          type="button"
          className="underline underline-offset-4 whitespace-nowrap"
          onClick={() => { setError(""); setInfo(""); setMode(isSignup ? "login" : "signup"); }}
          disabled={pending}
        >
          {isSignup ? "J’ai déjà un compte" : "Créer un compte"}
        </button>
      </CardFooter>
    </Card>
  );
}
