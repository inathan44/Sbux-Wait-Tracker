import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  // FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

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
  name: "food" | "mobile" | "drinks";
};

import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

const CategoryButton = ({
  form,
  icon,
  categoryError,
  name,
}: CategoryButtonProps) => {
  const isDisabled = (name: "food" | "drinks" | "mobile") => {
    if (
      form.getValues("mobile") === false &&
      form.getValues("drinks") === false &&
      form.getValues("food") === false
    ) {
      return false;
    }
    if (name === "mobile") {
      return form.getValues("food") || form.getValues("drinks");
    } else {
      return form.getValues("mobile");
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-row items-start space-x-3 space-y-0 rounded-md">
          <FormControl>
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
              icon={<div className="w-full text-white">{icon}</div>}
              className={cn("w-full bg-[#1F3933]", {
                "border-[3px] border-red-400": categoryError,
              })}
              disabled={isDisabled(name)}
              onKeyUp={(e) => {
                if (e.key === "Enter") field.onChange(!field.value);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CategoryButton;
