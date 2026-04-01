import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspect?: "video" | "square" | "portrait" | "wide";
};

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[21/9]",
};

export function MarketingImage({ src, alt, className = "", priority, sizes, aspect = "video" }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-slate-100 shadow-sm ring-1 ring-slate-200/80 ${aspectClass[aspect]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"}
        className="object-cover"
      />
    </div>
  );
}
