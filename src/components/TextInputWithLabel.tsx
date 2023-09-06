import * as React from 'react';
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
        onChange={onChange}
      />
    </div>
  );
}
