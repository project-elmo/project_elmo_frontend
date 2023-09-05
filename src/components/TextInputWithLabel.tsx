import * as React from 'react';
import TextInput from '@/components/TextInput';
import Label from '@/components/Label';

interface Props {
  id: string;
  label: string;
  info?: string;
  value?: string | number;
  type?: 'text' | 'number';
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
  type = 'text',
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
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        onChange={onChange}
      />
    </div>
  );
}
