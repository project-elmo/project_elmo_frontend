import * as ProgressPrimitive from '@radix-ui/react-progress';

interface Props {
  value: number;
}

export default function Progress({ value }: Props) {
  return (
    <ProgressPrimitive.Root
      value={value}
      className="flex-1 h-3 w-full overflow-hidden rounded-full bg-white"
    >
      <ProgressPrimitive.Indicator
        style={{ width: `${value}%` }}
        className="h-full bg-primary duration-300 ease-in-out"
      />
    </ProgressPrimitive.Root>
  );
}
