"use client";

import { useState } from "react";
import { Button } from "@/ui/components/Button";
import { Input } from "@/ui/forms/Input";
import { Textarea } from "@/ui/forms/Textarea";

type RequestFormCopy = {
  fields: {
    name: string;
    email: string;
    company: string;
    cargo: string;
    message: string;
  };
  submit: string;
  successMessage: string;
  errorMessage: string;
};

type RequestFormProps = {
  locale: string;
  copy: RequestFormCopy;
};

export function RequestForm({ locale, copy }: RequestFormProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    cargo: "",
    message: "",
  });

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");

    const response = await fetch("/api/crm/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        locale,
        source: "request_form",
        path: window.location.pathname,
        referrer: document.referrer || undefined,
      }),
    }).catch(() => null);

    if (response && response.ok) {
      setStatus("success");
      setForm({
        name: "",
        email: "",
        company: "",
        cargo: "",
        message: "",
      });
    } else {
      setStatus("error");
    }

    setLoading(false);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold">
          <span className="text-[var(--navy-100)]">{copy.fields.name}</span>
          <Input
            id="request-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            autoComplete="name"
            placeholder={copy.fields.name}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          <span className="text-[var(--navy-100)]">{copy.fields.email}</span>
          <Input
            id="request-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            autoComplete="email"
            placeholder={copy.fields.email}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          <span className="text-[var(--navy-100)]">{copy.fields.company}</span>
          <Input
            id="request-company"
            name="company"
            type="text"
            value={form.company}
            onChange={(event) => handleChange("company", event.target.value)}
            autoComplete="organization"
            placeholder={copy.fields.company}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          <span className="text-[var(--navy-100)]">{copy.fields.cargo}</span>
          <Input
            id="request-cargo"
            name="cargo"
            type="text"
            value={form.cargo}
            onChange={(event) => handleChange("cargo", event.target.value)}
            placeholder={copy.fields.cargo}
          />
        </label>
      </div>
      <label className="space-y-2 text-sm font-semibold">
        <span className="text-[var(--navy-100)]">{copy.fields.message}</span>
        <Textarea
          rows={5}
          name="message"
          value={form.message}
          onChange={(event) => handleChange("message", event.target.value)}
          placeholder={copy.fields.message}
        />
      </label>
      <Button type="submit" disabled={loading}>
        {loading ? "..." : copy.submit}
      </Button>
      {status === "success" ? (
        <p role="status" className="text-sm text-[var(--accent-500)]">
          {copy.successMessage}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="status" className="text-sm text-[var(--navy-100)]">
          {copy.errorMessage}
        </p>
      ) : null}
    </form>
  );
}
