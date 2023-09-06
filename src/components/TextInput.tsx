interface Props {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  id,
  value,
  placeholder,
  disabled,
  className,
  onChange,
}: Props) {
  return (
    <input
      id={id}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      className={`input ${className}`}
    />
  );
}
