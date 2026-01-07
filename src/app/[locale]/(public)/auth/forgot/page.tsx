// Forgot password: mock reset flow.
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Card } from "@/ui/components/Card";
import { Input } from "@/ui/forms/Input";
import { Button } from "@/ui/components/Button";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function ForgotPage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <Section>
      <Container className="max-w-2xl text-white">
        <Card className="glass-panel space-y-4">
          <h1 className="text-2xl font-semibold">{dictionary.auth.loginSubtitle}</h1>
          <p className="text-sm text-[var(--navy-100)]">
            Enter your email to receive a reset link. This demo uses a mock flow.
          </p>
          <label className="space-y-2 text-sm font-semibold">
            <span className="text-[var(--navy-100)]">{dictionary.auth.emailLabel}</span>
            <Input type="email" placeholder={dictionary.auth.emailLabel} />
          </label>
          <Button type="submit">{dictionary.auth.submitLogin}</Button>
        </Card>
      </Container>
    </Section>
  );
}
