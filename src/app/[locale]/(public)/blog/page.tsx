import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Badge } from "@/ui/components/Badge";
import { Card } from "@/ui/components/Card";
import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section";

type PageProps = {
  params: { locale: Locale };
};

export default async function BlogPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <Section>
      <Container className="space-y-8">
        <div className="space-y-3">
          <Badge>{dictionary.nav.blog}</Badge>
          <h1 className="text-3xl font-semibold text-[var(--ink-900)]">
            {dictionary.blog.title}
          </h1>
          <p className="text-[var(--ink-500)]">{dictionary.blog.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {dictionary.blog.posts.map((post) => (
            <Card key={post.title} className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
                {post.tag}
              </span>
              <h2 className="text-lg font-semibold text-[var(--ink-900)]">
                {post.title}
              </h2>
              <p className="text-sm text-[var(--ink-500)]">{post.excerpt}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
