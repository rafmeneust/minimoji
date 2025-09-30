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

function GoogleIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.7 3.8-5.5 3.8-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.2.8 3.9 1.4l2.7-2.6C16.9 2.2 14.7 1.3 12 1.3 6.9 1.3 2.7 5.5 2.7 10.7S6.9 20 12 20c6.9 0 9.6-4.8 9.6-7.3 0-.5 0-.9-.1-1.2H12z"/>
    </svg>
  );
}

export default function LoginForm({ onSubmitEmail, onGoogle, onReset, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [mode, setMode] = useState("login"); // "login" | "signup"

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
      // navigation gérée dans Login.jsx
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

  return (
    <Card
      className={[
        "w-full transition",
        mode === "signup" ? "ring-1 ring-violet-200/70" : "ring-1 ring-gray-200/60",
      ].join(" ")}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{mode === "signup" ? "Créer un compte" : "Connexion"}</CardTitle>
            <CardDescription>
              {mode === "signup"
                ? "Créez votre accès à l’espace Minimoji."
                : "Accédez à votre espace Minimoji"}
            </CardDescription>
          </div>

          {/* Toggle de mode plus visible */}
          <div className="inline-flex rounded-full border p-1 bg-muted/40">
            <button
              type="button"
              onClick={() => setMode("login")}
              aria-pressed={mode === "login"}
              className={[
                "px-3 py-1 text-xs rounded-full transition",
                mode === "login" ? "bg-background shadow-sm" : "opacity-70 hover:opacity-100",
              ].join(" ")}
              disabled={pending}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              aria-pressed={mode === "signup"}
              className={[
                "px-3 py-1 text-xs rounded-full transition",
                mode === "signup" ? "bg-background shadow-sm" : "opacity-70 hover:opacity-100",
              ].join(" ")}
              disabled={pending}
            >
              Créer
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        {/* 1) Connexion rapide Google en tête */}
        <Button
          type="button"
          onClick={() => onGoogle?.()}
          disabled={pending}
          className="w-full h-10 gap-2 bg-white text-gray-900 border hover:bg-gray-50 shadow-sm"
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

        {/* 2) Formulaire e-mail */}
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
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "signup" ? "6 caractères minimum" : undefined}
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-600">{error}</p>
          ) : null}
          {info ? (
            <p className="text-sm text-green-600">{info}</p>
          ) : null}

          <Button
            type="submit"
            className="w-full whitespace-nowrap"
            disabled={pending}
            aria-disabled={pending}
            aria-busy={pending}
          >
            {pending
              ? (mode === "signup" ? "Création…" : "Connexion…")
              : (mode === "signup" ? "Créer mon compte" : "Se connecter")}
          </Button>

          {mode === "login" && (
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
          onClick={() => { setError(""); setInfo(""); setMode(mode === "login" ? "signup" : "login"); }}
          disabled={pending}
        >
          {mode === "login" ? "Créer un compte" : "J’ai déjà un compte"}
        </button>
      </CardFooter>
    </Card>
  );
}
