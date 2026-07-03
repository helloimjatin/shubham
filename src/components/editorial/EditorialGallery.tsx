import Image from "next/image";
import type { MockProjectImage } from "@/data/mock";

interface EditorialGalleryProps {
  images: MockProjectImage[];
}

export function EditorialGallery({ images }: EditorialGalleryProps) {
  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-1 md:space-y-2">
      {sorted.map((image) => (
        <figure key={image.id} className="relative w-full">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
            <Image
              src={image.url}
              alt={image.alt ?? ""}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
