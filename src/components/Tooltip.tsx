import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { MdOutlineInfo } from 'react-icons/md';

interface TooltipProps {
  info: string;
}

export default function Tooltip({ info }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipTrigger asChild>
          <button disabled>
            <MdOutlineInfo className="text-neutral-400" />
          </button>
        </TooltipTrigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className="max-w-sm inline-flex items-center border shadow shadow-line/30 rounded-md bg-white px-4 py-2.5 text-xs whitespace-pre-line"
        >
          <p>{info}</p>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> & {
    children: React.ReactNode;
    asChild?: boolean;
  }
>((props, forwardedRef) => (
  <TooltipPrimitive.Trigger {...props} ref={forwardedRef} />
));
