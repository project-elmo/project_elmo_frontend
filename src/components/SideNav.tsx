interface Props {
  side: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export default function SideNav({ side, className, children }: Props) {
  return (
    <nav
      className={`w-80 p-1.5 bg-secondary ${
        side === 'left' ? 'border-r-2' : 'border-l-2'
      } border-line ${className}`}
    >
      {children}
    </nav>
  );
}
