import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

const LabelRef = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Label> & {
    children: React.ReactNode;
    htmlFor: string;
    className?: string;
  }
>((props, forwardedRef) => (
  <LabelPrimitive.Label {...props} ref={forwardedRef} />
));

interface LabelProps {
  id: string;
  label: string;
  className?: string;
}

export default function Label({ id, label, className }: LabelProps) {
  return (
    <LabelRef htmlFor={id} className={className}>
      {label}
    </LabelRef>
  );
}
