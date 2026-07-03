interface VideoEmbedProps {
  url: string;
  title?: string;
}

export function VideoEmbed({ url, title = "Film" }: VideoEmbedProps) {
  return (
    <div className="relative w-full aspect-video bg-black overflow-hidden">
      <iframe
        src={url}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}
