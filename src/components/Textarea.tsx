import { useEffect, useRef } from 'react';

interface Props {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  id,
  value,
  placeholder,
  disabled,
  autoFocus = false,
  className,
  onChange,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (!ref.current) return;
    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  };

  useEffect(() => {
    handleResizeHeight();
  }, [value]);

  return (
    <textarea
      ref={ref}
      id={id}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      rows={1}
      onChange={onChange}
      autoFocus={autoFocus}
      className={`input ${className}`}
    />
  );
}
