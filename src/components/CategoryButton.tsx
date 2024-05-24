import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  // FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

type CategoryButtonProps = {
  form: UseFormReturn<
    {
      food?: boolean | undefined;
      mobile?: boolean | undefined;
      drinks?: boolean | undefined;
      stack?: boolean | undefined;
      foodItems?: number | undefined;
      drinkItems?: number | undefined;
      mobileItems?: number | undefined;
    },
    unknown,
    undefined
  >;
  icon: React.ReactNode;
  categoryError: boolean;
  name:
    | 'food'
    | 'mobile'
    | 'drinks'
    | 'stack'
    | 'foodItems'
    | 'drinkItems'
    | 'mobileItems';
};

import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

const CategoryButton = ({
  form,
  icon,
  categoryError,
  name,
}: CategoryButtonProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md p-4'>
          <FormControl>
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
              icon={icon}
              className={cn({
                'border-red-500 border-2': categoryError,
              })}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CategoryButton;
