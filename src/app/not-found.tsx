import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl mb-4">Page Not Found</h1>
      <p className="text-text-secondary mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-sm tracking-widest uppercase border-b border-accent pb-1"
      >
        Return Home
      </Link>
    </div>
  );
}
