import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { MdOutlineInfo } from 'react-icons/md';
import TextInput from '@/components/TextInput';
import Label from '@/components/Label';

interface Props {
  id: string;
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
        <Label id={id} label={label} className="text-sm font-semibold" />
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

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> & {
    children: React.ReactNode;
    asChild?: boolean;
  }
>((props, forwardedRef) => (
  <TooltipPrimitive.Trigger {...props} ref={forwardedRef} />
));

interface TooltipProps {
  info: string;
}

const Tooltip = ({ info }: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipTrigger asChild>
          <button disabled>
            <MdOutlineInfo className="text-neutral-400" />
          </button>
        </TooltipTrigger>
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
