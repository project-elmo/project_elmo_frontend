import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { MdOutlineInfo } from 'react-icons/md';
import TextInput from '@/components/TextInput';

interface Props {
  id?: string;
  label: string;
  info?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInputWithLabel({
  id,
  label,
  info,
  value,
  placeholder,
  disabled,
  onChange,
}: Props) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center gap-1">
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
        </label>
        {info && <Tooltip info={info} />}
      </div>
      <TextInput
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

const TooltipTrigger = React.forwardRef<HTMLButtonElement>(
  (props, forwardedRef) => (
    <button disabled {...props} ref={forwardedRef}>
      <MdOutlineInfo className="text-neutral-400" />
    </button>
  )
);

interface TooltipProps {
  info: string;
}

const Tooltip = ({ info }: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <TooltipTrigger />
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className="inline-flex items-center border shadow shadow-line/30 rounded-md bg-white px-4 py-2.5 text-xs"
        >
          <p>{info}</p>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
