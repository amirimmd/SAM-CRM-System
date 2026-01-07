"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { Input } from "@/ui/forms/Input";

type AuthCopy = {
  title: string;
  subtitle: string;
  emailLabel: string;
  passwordLabel: string;
  submitLabel: string;
  statusMissingConfig: string;
  statusCheckEmail: string;
  statusLoginSuccess: string;
};

type AuthPanelProps = {
  mode: "login" | "register";
  locale: string;
  copy: AuthCopy;
};

export function AuthPanel({ mode, locale, copy }: AuthPanelProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setStatus(copy.statusMissingConfig);
      return;
    }

    setLoading(true);
    setStatus(null);

    const action =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });
    const { error } = await action;

    if (error) {
      setStatus(error.message);
      setLoading(false);
      return;
    }

    if (mode === "login") {
      setStatus(copy.statusLoginSuccess);
      router.push(`/${locale}/dashboard`);
    } else {
      setStatus(copy.statusCheckEmail);
    }

    setLoading(false);
  }

  return (
    <Card className="glass-panel space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-white">
          {copy.title}
        </h1>
        <p className="text-sm text-[var(--navy-100)]">{copy.subtitle}</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="space-y-2 text-sm font-semibold">
          <span className="text-[var(--navy-100)]">{copy.emailLabel}</span>
          <Input
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder={copy.emailLabel}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          <span className="text-[var(--navy-100)]">{copy.passwordLabel}</span>
          <Input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder={copy.passwordLabel}
          />
        </label>
        <Button type="submit" disabled={loading}>
          {loading ? "..." : copy.submitLabel}
        </Button>
      </form>
      {status ? (
        <p role="status" className="text-sm text-[var(--navy-100)]">
          {status}
        </p>
      ) : null}
    </Card>
  );
}
