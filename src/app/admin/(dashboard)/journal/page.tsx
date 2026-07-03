import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export default async function AdminJournalPage() {
  await requireAdmin();

  let posts: {
    id: string;
    title: string;
    published: boolean;
    publishedAt: Date | null;
  }[] = [];

  try {
    posts = await prisma.journalPost.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        published: true,
        publishedAt: true,
      },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl">Journal</h1>
        <Link
          href="/admin/journal/new"
          className="bg-text-primary text-white px-6 py-3 text-sm tracking-widest uppercase"
        >
          New Post
        </Link>
      </div>

      <ul className="border border-border divide-y divide-border">
        {posts.map((post) => (
          <li key={post.id} className="px-4 py-3 flex justify-between items-center">
            <Link
              href={`/admin/journal/${post.id}`}
              className="hover:text-accent"
            >
              {post.title}
            </Link>
            <span className="text-xs text-text-secondary">
              {post.published ? "Published" : "Draft"}
              {post.publishedAt && ` · ${formatDate(post.publishedAt)}`}
            </span>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="px-4 py-6 text-text-secondary text-sm">
            No journal posts yet.
          </li>
        )}
      </ul>
    </div>
  );
}
