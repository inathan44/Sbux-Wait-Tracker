import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

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
      'peer shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-black w-56 h-48 relative data-[state=checked]:border-green-800 data-[state=checked]:border-4',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex justify-end items-start h-full')}
    >
      <Check className='h-6 w-6 bg-green-800 text-white p-[3px] font-bold rounded-full mt-2 mr-2' />
    </CheckboxPrimitive.Indicator>
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36'>
      {icon}
    </div>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
