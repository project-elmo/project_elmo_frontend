import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { MdOutlineExpandMore } from 'react-icons/md';
import { RadioGroupIndicator } from '@/components/RadioGroup';
import { AccordionItem } from '@/types';

interface Props {
  value: string;
  items: AccordionItem[];
  onValueChange: (value: string) => void;
}

export default function RadioAccordion({ items, value, onValueChange }: Props) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className="w-full flex flex-col gap-4"
    >
      {items.map(({ id, header, content }) => (
        <AccordionPrimitive.Item key={id} value={id}>
          <AccordionPrimitive.Header asChild>
            <div className="flex items-center gap-2 group radix-state-open:rounded-t radix-state-closed:rounded bg-white px-4 py-3 border-2 border-line cursor-pointer">
              <RadioGroupPrimitive.Root
                value={value}
                onValueChange={onValueChange}
                className="flex items-center"
              >
                <RadioGroupPrimitive.Item
                  id={id}
                  value={id}
                  className="relative w-5 h-5 rounded-full border-2 border-line radix-state-checked:border-primary"
                >
                  <RadioGroupIndicator className="flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  </RadioGroupIndicator>
                </RadioGroupPrimitive.Item>
              </RadioGroupPrimitive.Root>
              <AccordionPrimitive.Trigger asChild>
                <div className="flex justify-between w-full">
                  <span className="text-sm font-semibold">{header}</span>
                  <MdOutlineExpandMore className="h-5 w-5 ease-in-out group-radix-state-open:rotate-180 group-radix-state-open:duration-300" />
                </div>
              </AccordionPrimitive.Trigger>
            </div>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="px-4 py-3 rounded-b bg-white border-2 border-t-0 border-line">
            <div className="text-sm">{content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
