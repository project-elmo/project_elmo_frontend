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
      <SliderPrimitive.Root
        defaultValue={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={onValueChange}
        className="relative flex w-full touch-none items-center"
      >
        <SliderPrimitive.Track className="relative h-0.5 w-full bg-line cursor-pointer" />
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-white border shadow shadow-line cursor-pointer focus:outline-none">
          <span className="block h-5 w-5 text-center translate-y-6">
            {value}
          </span>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
      <span>{max}</span>
    </div>
  );
}
