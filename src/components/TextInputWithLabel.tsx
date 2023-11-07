import TextInput from '@/components/TextInput';
import Label from '@/components/Label';

interface Props {
  id: string;
  label: string;
  info?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInputWithLabel({
  id,
  label,
  info,
  value,
  placeholder,
  disabled,
  className,
  inputRef,
  onChange,
}: Props) {
  return (
    <div className="w-full">
      <Label id={id} label={label} info={info} />
      <TextInput
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        inputRef={inputRef}
        onChange={onChange}
      />
    </div>
  );
}
