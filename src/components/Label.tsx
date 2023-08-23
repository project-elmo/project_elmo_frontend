import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import Tooltip from '@/components/Tooltip';

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
  id?: string;
  label: string;
  info?: string;
  className?: string;
  isSide?: boolean;
}

export default function Label({
  id,
  label,
  info,
  className,
  isSide = false,
}: LabelProps) {
  return (
    <div className={`flex items-center gap-1 ${!isSide && 'mb-2'}`}>
      <LabelRef
        htmlFor={id || ''}
        className={`text-sm ${!isSide && 'font-semibold'} ${className}`}
      >
        {label}
      </LabelRef>
      {info && <Tooltip info={info} />}
    </div>
  );
}
