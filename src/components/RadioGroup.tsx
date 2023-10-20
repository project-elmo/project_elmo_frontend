import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

interface Props {
  items: string[];
  value: string;
  onValueChange: (value: string) => void;
}

export default function RadioGroup({ items, value, onValueChange }: Props) {
  return (
    <RadioGroupRoot value={value} onValueChange={onValueChange}>
      <div className="flex gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-1.5">
            <RadioGroupPrimitive.Item
              id={item}
              value={item}
              className="relative w-5 h-5 rounded-full border-2 border-line radix-state-checked:border-primary text-primary"
            >
              <RadioGroupIndicator className="flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              </RadioGroupIndicator>
            </RadioGroupPrimitive.Item>
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
    </RadioGroupRoot>
  );
}

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    children: React.ReactNode;
  }
>((props, forwardedRef) => (
  <RadioGroupPrimitive.Root {...props} ref={forwardedRef} />
));

export const RadioGroupIndicator = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator> & {
    children: React.ReactNode;
    className?: string;
  }
>((props, forwardedRef) => (
  <RadioGroupPrimitive.Indicator {...props} ref={forwardedRef} />
));
