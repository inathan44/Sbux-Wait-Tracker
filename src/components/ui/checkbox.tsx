import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckboxProps = {
  icon?: React.ReactNode;
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, icon, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative h-48 w-56 shrink-0 rounded-md border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-4 data-[state=checked]:border-green-700 data-[state=checked]:text-black",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex h-full items-start justify-end")}
    >
      <Check className="mr-2 mt-2 h-6 w-6 rounded-full bg-green-800 p-[3px] font-bold text-white" />
    </CheckboxPrimitive.Indicator>
    <div className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2">
      {icon}
    </div>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
