import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

interface Props {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number[]) => void;
}

export default function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
}: Props) {
  return (
    <div className="flex justify-between items-center gap-1.5 pb-8 text-sm">
      <span>{min}</span>
      <SliderRoot
        defaultValue={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={onValueChange}
        className="relative flex w-full touch-none items-center"
      >
        <SliderTrack className="relative h-0.5 w-full bg-line cursor-pointer" />
        <SliderThumb className="block h-5 w-5 rounded-full bg-white border shadow shadow-line cursor-pointer focus:outline-none">
          <span className="block h-5 w-5 text-center translate-y-6">
            {value}
          </span>
        </SliderThumb>
      </SliderRoot>
      <span>{max}</span>
    </div>
  );
}

const SliderRoot = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    children: React.ReactNode;
    className?: string;
  }
>((props, forwardedRef) => (
  <SliderPrimitive.Root {...props} ref={forwardedRef} />
));

const SliderTrack = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track> & {
    className?: string;
  }
>((props, forwardedRef) => (
  <SliderPrimitive.Track {...props} ref={forwardedRef} />
));

const SliderThumb = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> & {
    children: React.ReactNode;
    className?: string;
  }
>((props, forwardedRef) => (
  <SliderPrimitive.Thumb {...props} ref={forwardedRef} />
));
