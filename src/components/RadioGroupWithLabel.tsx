import Label from '@/components/Label';
import RadioGroup from '@/components/RadioGroup';

interface Props {
  label: string;
  info?: string;
  items: string[];
  value: string;
  onValueChange: (value: string) => void;
}

export default function RadioGroupWithLabel({
  label,
  info,
  items,
  value,
  onValueChange,
}: Props) {
  return (
    <div className="w-full">
      <Label label={label} info={info} />
      <RadioGroup items={items} value={value} onValueChange={onValueChange} />
    </div>
  );
}
