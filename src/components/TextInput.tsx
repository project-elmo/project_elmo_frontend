interface Props {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  id,
  value,
  placeholder,
  disabled,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      id={id}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      className="w-full p-3 border-2 border-line rounded-md placeholder:text-line"
    />
  );
}
