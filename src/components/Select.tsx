import React from 'react';
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
      <SelectTrigger className="input flex justify-between items-center data-[placeholder]:text-gray-400">
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <MdOutlineExpandMore className="text-lg" />
        </SelectPrimitive.Icon>
      </SelectTrigger>
      <SelectContent className="bg-white p-2 border rounded-md shadow shadow-line/30 z-20">
        <SelectScrollUpButton className="flex items-center justify-center">
          <MdOutlineExpandLess />
        </SelectScrollUpButton>
        <SelectViewport>
          <SelectPrimitive.Group>
            {items.map((item) => (
              <SelectItem
                key={item}
                value={item}
                className="relative flex items-center px-8 py-2 rounded-md text-sm focus:bg-secondary cursor-pointer focus:outline-none"
              >
                <SelectPrimitive.ItemText>{item}</SelectPrimitive.ItemText>
                <SelectItemIndicator className="absolute left-2 inline-flex items-center">
                  <MdOutlineCheck />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectPrimitive.Group>
        </SelectViewport>
        <SelectScrollDownButton className="flex items-center justify-center">
          <MdOutlineExpandMore />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPrimitive.Root>
  );
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    children: React.ReactNode;
    className?: string;
  }
>((props, forwardedRef) => (
  <SelectPrimitive.Trigger {...props} ref={forwardedRef} />
));

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    children: React.ReactNode;
    className?: string;
  }
>((props, forwardedRef) => (
  <SelectPrimitive.Content {...props} ref={forwardedRef} />
));

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & {
    children: React.ReactNode;
    className?: string;
  }
>((props, forwardedRef) => (
  <SelectPrimitive.ScrollUpButton {...props} ref={forwardedRef} />
));

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & {
    children: React.ReactNode;
    className?: string;
  }
>((props, forwardedRef) => (
  <SelectPrimitive.ScrollDownButton {...props} ref={forwardedRef} />
));

const SelectViewport = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport> & {
    children: React.ReactNode;
  }
>((props, forwardedRef) => (
  <SelectPrimitive.Viewport {...props} ref={forwardedRef} />
));

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    children: React.ReactNode;
    className?: string;
  }
>((props, forwardedRef) => (
  <SelectPrimitive.Item {...props} ref={forwardedRef} />
));

const SelectItemIndicator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator> & {
    children: React.ReactNode;
    className?: string;
  }
>((props, forwardedRef) => (
  <SelectPrimitive.ItemIndicator {...props} ref={forwardedRef} />
));
