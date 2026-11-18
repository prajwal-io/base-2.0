import type { ReactNode } from "react";

export function CustomVisualSlot({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      data-custom-visual-slot
      className={`overflow-hidden bg-canvas-subtle ${className}`}
    >
      {children}
    </div>
  );
}
