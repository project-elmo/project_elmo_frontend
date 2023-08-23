import Label from '@/components/Label';
import Slider from '@/components/Slider';

interface Props {
  id: string;
  label: string;
  info?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number[]) => void;
}

export default function SliderWithLabel({
  id,
  label,
  info,
  value,
  min,
  max,
  step,
  onValueChange,
}: Props) {
  return (
    <div className="w-full">
      <Label id={id} label={label} info={info} />
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={onValueChange}
      />
    </div>
  );
}
