import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

interface Props {
  items: string[];
  value: string;
  onValueChange: (value: string) => void;
}

export default function RadioGroup({ items, value, onValueChange }: Props) {
  return (
    <RadioGroupPrimitive.Root value={value} onValueChange={onValueChange}>
      <div className="flex gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-1.5">
            <RadioGroupPrimitive.Item
              id={item}
              value={item}
              className="relative w-5 h-5 rounded-full border-2 border-line bg-white radix-state-checked:border-primary text-primary"
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
    </RadioGroupPrimitive.Root>
  );
}
