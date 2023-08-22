interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  listStyle?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  type = 'button',
  listStyle = false,
  onClick,
}: Props) {
  return (
    <div className="text-center">
      <button
        className={listStyle ? 'list-btn' : 'btn'}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
