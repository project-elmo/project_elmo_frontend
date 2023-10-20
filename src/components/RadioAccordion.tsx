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
    <RadioGroupPrimitive.Root value={value}>
      <AccordionPrimitive.Root
        type="single"
        collapsible
        onValueChange={onValueChange}
        className="w-full flex flex-col gap-4"
      >
        {items.map(({ header, content }) => (
          <AccordionPrimitive.Item key={header} value={header}>
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="group radix-state-open:rounded-t radix-state-closed:rounded flex w-full justify-between bg-white px-4 py-3 border-2 border-line">
                <div className="flex gap-2">
                  <RadioGroupPrimitive.Item
                    id={header}
                    value={header}
                    className="relative w-5 h-5 rounded-full border-2 border-line radix-state-checked:border-primary"
                  >
                    <RadioGroupIndicator className="flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    </RadioGroupIndicator>
                  </RadioGroupPrimitive.Item>
                  <span className="text-sm">{header}</span>
                </div>
                <MdOutlineExpandMore className="h-5 w-5 ease-in-out group-radix-state-open:rotate-180 group-radix-state-open:duration-300" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="px-4 py-3 rounded-b bg-white border-2 border-t-0 border-line">
              <div className="text-sm">{content}</div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </RadioGroupPrimitive.Root>
  );
}
