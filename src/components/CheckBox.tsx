import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { MdOutlineCheck } from 'react-icons/md';

const CheckBoxIndicator = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator> & {
    children: React.ReactNode;
  }
>((props, forwardedRef) => (
  <CheckboxPrimitive.Indicator {...props} ref={forwardedRef} />
));

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function CheckBox({
  id,
  checked = false,
  onCheckedChange,
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="flex h-5 w-5 items-center justify-center border border-primary"
    >
      <CheckBoxIndicator>
        <MdOutlineCheck className="text-primary" />
      </CheckBoxIndicator>
    </CheckboxPrimitive.Root>
  );
}
