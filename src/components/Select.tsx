import * as SelectPrimitive from '@radix-ui/react-select';
import {
  MdOutlineCheck,
  MdOutlineExpandLess,
  MdOutlineExpandMore,
} from 'react-icons/md';

interface Props {
  items: string[];
  value?: string;
  placeholder?: string;
  onValueChange: (value: string) => void;
}

export default function Select({
  items,
  value,
  placeholder,
  onValueChange,
}: Props) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className="input flex justify-between items-center data-[placeholder]:text-gray-400">
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <MdOutlineExpandMore className="text-lg" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content className="bg-white p-2 border rounded-md shadow shadow-line/30 z-20">
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center">
          <MdOutlineExpandLess />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport>
          <SelectPrimitive.Group>
            {items.map((item) => (
              <SelectPrimitive.Item
                key={item}
                value={item}
                className="relative flex items-center px-8 py-2 rounded-md text-sm focus:bg-secondary cursor-pointer focus:outline-none"
              >
                <SelectPrimitive.ItemText>{item}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <MdOutlineCheck />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center">
          <MdOutlineExpandMore />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
}
