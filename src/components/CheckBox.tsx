import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { MdOutlineCheck } from 'react-icons/md';

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function CheckBox({
  id,
  checked = false,
  onCheckedChange,
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="flex h-5 w-5 items-center justify-center border border-primary"
    >
      <CheckboxPrimitive.Indicator>
        <MdOutlineCheck className="text-primary" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
