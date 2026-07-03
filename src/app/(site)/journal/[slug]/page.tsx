import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { formatDate } from "@/lib/utils";
import { getJournalBySlug, getJournalPosts, getSiteSettingsData } from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: getCanonicalUrl(`/journal/${slug}`) },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getJournalBySlug(slug),
    getSiteSettingsData(),
  ]);
  if (!post) notFound();

  return (
    <article>
      <div className="section-padding pt-8">
        <div className="flex justify-center mb-10">
          <BrandLogo studioName={settings.studioName} size="lg" />
        </div>
        <header className="narrow-container text-center">
          {post.publishedAt && (
            <p className="text-xs text-text-secondary mb-3">
              {formatDate(post.publishedAt)}
            </p>
          )}
          <h1 className="story-title">{post.title}.</h1>
          <p className="prose-editorial">{post.excerpt}</p>
        </header>
      </div>

      <div className="relative w-full aspect-[16/10]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <section className="narrow-container section-padding">
        <div
          className="prose-editorial"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>
    </article>
  );
}
