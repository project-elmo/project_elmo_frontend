interface Props {
  id?: string;
  value?: string | number;
  type?: 'text' | 'number';
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  id,
  value,
  type = 'text',
  placeholder,
  disabled,
  className,
  onChange,
}: Props) {
  return (
    <input
      id={id}
      value={value}
      type={type}
      min={0}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      className={`input ${className}`}
    />
  );
}
