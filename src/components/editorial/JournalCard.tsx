import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { MockJournalPost } from "@/data/mock";

interface JournalCardProps {
  post: MockJournalPost;
}

export function JournalCard({ post }: JournalCardProps) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <article>
        <div className="relative aspect-[16/10] overflow-hidden mb-6">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="narrow-container text-center">
          {post.publishedAt && (
            <p className="text-xs text-text-secondary mb-2">
              {formatDate(post.publishedAt)}
            </p>
          )}
          <h3 className="font-display text-xl md:text-2xl text-text-primary group-hover:opacity-70 transition-opacity">
            {post.title}
          </h3>
          <p className="mt-3 text-text-secondary leading-relaxed">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
