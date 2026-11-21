import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CustomVisualSlot({
  src,
  alt = "",
  sizes = "100vw",
  quality = 75,
  priority = false,
  className = "",
  imgClassName = "object-cover",
  children,
}: {
  src?: string;
  alt?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  children?: ReactNode;
}) {
  if (!src && children == null) return null;

  return (
    <div
      data-custom-visual-slot
      className={cn("relative overflow-hidden bg-canvas-subtle", className)}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          className={imgClassName}
        />
      )}
      {children}
    </div>
  );
}
