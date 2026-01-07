import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { AuthPanel } from "@/ui/components/AuthPanel";
import { Card } from "@/ui/components/Card";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function LoginPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] text-white">
        <AuthPanel
          mode="login"
          locale={params.locale}
          copy={{
            title: dictionary.auth.loginTitle,
            subtitle: dictionary.auth.loginSubtitle,
            emailLabel: dictionary.auth.emailLabel,
            passwordLabel: dictionary.auth.passwordLabel,
            submitLabel: dictionary.auth.submitLogin,
            statusMissingConfig: dictionary.auth.statusMissingConfig,
            statusCheckEmail: dictionary.auth.statusCheckEmail,
            statusLoginSuccess: dictionary.auth.statusLoginSuccess,
          }}
        />
        <Card className="glass-panel space-y-4">
          <h2 className="text-xl font-semibold text-white">{dictionary.auth.loginAsideTitle}</h2>
          <p className="text-sm text-[var(--navy-100)]">{dictionary.auth.loginAsideBody}</p>
          <Link
            href={`/${params.locale}/auth/register`}
            className="text-sm font-semibold text-white underline-offset-4 hover:underline"
          >
            {dictionary.auth.submitRegister}
          </Link>
        </Card>
      </Container>
    </Section>
  );
}
