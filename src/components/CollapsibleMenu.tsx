import { Link } from 'react-router-dom';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { MdOutlineExpandMore } from 'react-icons/md';
import { MenuItem } from '@/types';

interface Props {
  trigger: MenuItem;
  contents?: MenuItem[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CollapsibleMenu({
  trigger,
  contents,
  isOpen = false,
  onOpenChange,
}: Props) {
  return (
    <CollapsiblePrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <CollapsiblePrimitive.Trigger
        className={`group flex gap-4 w-full select-none items-center justify-between p-3 hover:bg-slate-200 focus:outline-none ${
          trigger.selected && 'font-bold bg-slate-200'
        }`}
      >
        <div className="flex-1 text-left">
          <Link to={trigger.to}>
            <div className="cursor-pointer ">{trigger.name}</div>
          </Link>
        </div>
        <MdOutlineExpandMore className="transform duration-300 ease-in-out group-radix-state-open:rotate-180" />
      </CollapsiblePrimitive.Trigger>
      <div className="flex flex-col">
        {contents?.map((content) => (
          <CollapsiblePrimitive.Content key={`${content.name}-${content.to}`}>
            <Link
              to={content.to}
              className={`group flex select-none items-center justify-between text-sm mt-1.5 p-2 pl-8 hover:bg-white ${
                content.selected && 'bg-white'
              }`}
            >
              {content.name}
            </Link>
          </CollapsiblePrimitive.Content>
        ))}
      </div>
    </CollapsiblePrimitive.Root>
  );
}
