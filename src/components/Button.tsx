interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  className?: string;
  listStyle?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  type = 'button',
  className,
  listStyle = false,
  onClick,
}: Props) {
  return (
    <button
      className={`${listStyle ? 'list-btn' : 'btn'} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
