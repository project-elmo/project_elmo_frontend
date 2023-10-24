interface Props {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  id,
  value,
  placeholder,
  disabled,
  className,
  inputRef,
  onChange,
}: Props) {
  return (
    <input
      id={id}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      className={`input ${className}`}
      ref={inputRef}
      onChange={onChange}
    />
  );
}
