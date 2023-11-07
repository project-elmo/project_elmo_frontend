import * as LabelPrimitive from '@radix-ui/react-label';
import Tooltip from '@/components/Tooltip';

interface LabelProps {
  id?: string;
  label: string;
  info?: string;
  className?: string;
  isSide?: boolean;
}

export default function Label({
  id,
  label,
  info,
  className,
  isSide = false,
}: LabelProps) {
  return (
    <div className={`flex items-center gap-1 ${!isSide && 'mb-2'}`}>
      <LabelPrimitive.Label
        htmlFor={id || ''}
        className={`text-sm ${!isSide && 'font-semibold'} ${className}`}
      >
        {label}
      </LabelPrimitive.Label>
      {info && <Tooltip info={info} />}
    </div>
  );
}
