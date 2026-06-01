import type { LucideIcon } from 'lucide-react';

interface AppIconProps {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/** Единый стиль иконок: thin stroke, без декора */
export function AppIcon({
  icon: Icon,
  size = 16,
  strokeWidth = 1.5,
  className,
}: AppIconProps) {
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    />
  );
}
