import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader, Section } from "@/components/page-shell";
import { NEWS } from "@/lib/news-data";

export const Route = createFileRoute("/news/$slug")({
  head: ({ params }) => {
    const item = NEWS.find((n) => n.slug === params.slug);
    return {
      meta: [
        { title: `${item?.title ?? "Новина"} — Зурбаган` },
        { name: "description", content: item?.excerpt ?? "Новини компанії Зурбаган" },
      ],
    };
  },
  loader: ({ params }) => {
    const item = NEWS.find((n) => n.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  notFoundComponent: () => (
    <Section>
      <h1 className="text-2xl font-bold">Новину не знайдено</h1>
      <Link to="/" className="mt-4 inline-flex items-center gap-2 text-brand">
        <ArrowLeft className="h-4 w-4" /> На головну
      </Link>
    </Section>
  ),
  errorComponent: ({ error }) => (
    <Section>
      <p>{error.message}</p>
    </Section>
  ),
  component: NewsDetail,
});

function NewsDetail() {
  const { item } = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow={item.date} title={item.title} description={item.excerpt} />
      <Section>
        <article className="prose prose-neutral max-w-3xl">
          {item.body.map((p, i) => (
            <p key={i} className="mt-4 text-base leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
        </article>
        <Link to="/" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
          <ArrowLeft className="h-4 w-4" /> Усі новини
        </Link>
      </Section>
    </>
  );
}
