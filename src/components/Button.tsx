interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  className?: string;
  listStyle?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  type = 'button',
  className = '',
  listStyle = false,
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      className={`${
        listStyle ? 'list-btn' : 'btn'
      } disabled:bg-neutral-400 ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
