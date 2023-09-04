import * as ToastPrimitive from '@radix-ui/react-toast';

interface Props {
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Toast({
  title,
  description,
  open,
  onOpenChange,
}: Props) {
  return (
    <ToastPrimitive.Provider duration={3000}>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        className={`z-50 fixed top-28 right-4 w-full max-w-sm shadow-lg rounded-lg bg-white border border-line focus:outline-none focus-visible:ring focus-visible:ring-primary`}
      >
        <div className="flex text-sm">
          <div className="flex-1 flex flex-col justify-center pl-5 py-4">
            <ToastPrimitive.Title className="font-semibold">
              {title}
            </ToastPrimitive.Title>
            {description && (
              <ToastPrimitive.Description className="mt-1">
                {description}
              </ToastPrimitive.Description>
            )}
          </div>
          <div className="flex items-center px-3 py-2">
            <ToastPrimitive.Close className="w-full border border-transparent rounded-lg px-3 py-2 flex items-center justify-center hover:bg-secondary focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-primary">
              Dismiss
            </ToastPrimitive.Close>
          </div>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}
