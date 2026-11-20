import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CustomVisualSlot({
  src,
  alt = "",
  sizes = "100vw",
  className = "",
  children,
}: {
  src?: string;
  alt?: string;
  sizes?: string;
  className?: string;
  children?: ReactNode;
}) {
  if (!src && children == null) return null;

  return (
    <div
      data-custom-visual-slot
      className={cn("relative overflow-hidden bg-canvas-subtle", className)}
    >
      {src && <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />}
      {children}
    </div>
  );
}
