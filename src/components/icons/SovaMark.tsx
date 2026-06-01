import clsx from 'clsx';

interface SovaMarkProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * Геометрический знак «Сова»: щит (защита) + стилизованная голова (наблюдение).
 * Монохромный, без градиентов — для header и официального UI.
 */
export function SovaMark({ size = 32, className, title }: SovaMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('shrink-0', className)}
      role={title ? 'img' : 'presentation'}
      aria-hidden={!title}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M16 3.5 25.5 7.25V15.5c0 5.2-4.8 9.8-9.5 12.5C11.3 25.3 6.5 20.7 6.5 15.5V7.25L16 3.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 9.5 10 6.5M20.5 9.5 22 6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="12.25" cy="14.25" r="1.85" fill="currentColor" />
      <circle cx="19.75" cy="14.25" r="1.85" fill="currentColor" />
      <path d="M16 16.75 14.1 19.1h3.8L16 16.75Z" fill="currentColor" />
      <path
        d="M16 20.5v3.25"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}
