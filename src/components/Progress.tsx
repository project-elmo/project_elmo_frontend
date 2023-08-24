import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

interface Props {
  value: number;
}

export default function Progress({ value }: Props) {
  return (
    <ProgressRoot
      value={value}
      className="flex-1 h-3 w-full overflow-hidden rounded-full bg-white"
    >
      <ProgressIndicator
        style={{ width: `${value}%` }}
        className="h-full bg-primary duration-300 ease-in-out"
      />
    </ProgressRoot>
  );
}

const ProgressRoot = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    children: React.ReactNode;
    className?: string;
  }
>((props, forwardedRef) => (
  <ProgressPrimitive.Root {...props} ref={forwardedRef} />
));

const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator> & {
    style?: React.CSSProperties;
    className?: string;
  }
>((props, forwardedRef) => (
  <ProgressPrimitive.Indicator {...props} ref={forwardedRef} />
));
