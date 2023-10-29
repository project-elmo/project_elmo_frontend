import Label from '@/components/Label';
import Select from '@/components/Select';

interface Props {
  label: string;
  info?: string;
  items: string[];
  value?: string;
  placeholder?: string;
  onValueChange: (value: string) => void;
}

export default function SelectWithLabel({
  label,
  info,
  items,
  value,
  placeholder,
  onValueChange,
}: Props) {
  return (
    <div className="w-full">
      <Label label={label} info={info} />
      <Select
        items={items}
        value={value}
        placeholder={placeholder}
        onValueChange={onValueChange}
      />
    </div>
  );
}
