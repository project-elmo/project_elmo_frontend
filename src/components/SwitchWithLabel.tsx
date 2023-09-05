import Label from '@/components/Label';
import Switch from '@/components/Switch';

interface Props {
  id: string;
  label: string;
  info?: string;
  checked: boolean;
  disabled?: boolean;
  className?: string;
  onCheckedChange: (checked: boolean) => void;
}

export default function SwitchWithLabel({
  id,
  label,
  info,
  checked,
  disabled = false,
  className,
  onCheckedChange,
}: Props) {
  return (
    <div className="flex gap-3">
      <Label id={id} label={label} info={info} isSide className={className} />
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
