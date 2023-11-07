import * as SwitchPrimitive from '@radix-ui/react-switch';

interface Props {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function Switch({
  id,
  checked,
  disabled = false,
  onCheckedChange,
}: Props) {
  return (
    <SwitchPrimitive.Root
      id={id}
      checked={checked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      className="radix-state-checked:border-primary relative inline-flex items-center h-6 w-10 rounded-full border-2 border-line bg-white transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-primary radix-disabled:cursor-not-allowed"
    >
      <SwitchPrimitive.Thumb className="radix-state-checked:bg-primary radix-state-checked:translate-x-4 radix-state-unchecked:translate-x-0 pointer-events-none inline-block h-5 w-5 border-2 border-white transform rounded-full bg-line ring-0 transition duration-200 ease-in-out radix-disabled:cursor-not-allowed" />
    </SwitchPrimitive.Root>
  );
}
