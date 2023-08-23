import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

interface Props {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function Switch({ id, checked, onCheckedChange }: Props) {
  return (
    <SwitchRoot
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="radix-state-checked:border-primary relative inline-flex items-center h-6 w-10 cursor-pointer rounded-full border-2 border-line transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75"
    >
      <SwitchThumb className="radix-state-checked:bg-primary radix-state-checked:translate-x-4 radix-state-unchecked:translate-x-0 pointer-events-none inline-block h-5 w-5 border-2 border-white transform rounded-full bg-line shadow-lg ring-0 transition duration-200 ease-in-out" />
    </SwitchRoot>
  );
}

const SwitchRoot = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
    children: React.ReactNode;
    id: string;
    className?: string;
  }
>((props, forwardedRef) => (
  <SwitchPrimitive.Root {...props} ref={forwardedRef} />
));

const SwitchThumb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Thumb> & {
    className?: string;
  }
>((props, forwardedRef) => (
  <SwitchPrimitive.Thumb {...props} ref={forwardedRef} />
));
