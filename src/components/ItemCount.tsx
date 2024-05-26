import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type ItemCountProps = {
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
  name: "foodItems" | "drinkItems" | "mobileItems";
};

const ItemCount = ({ form, name }: ItemCountProps) => {
  function categoryNotSelected(
    name: "foodItems" | "drinkItems" | "mobileItems",
  ) {
    let categoryNotSelected = false;
    if (name === "foodItems") {
      categoryNotSelected = !form.getValues()?.food;
    } else if (name === "drinkItems") {
      categoryNotSelected = !form.getValues()?.drinks;
    }
    if (name === "mobileItems") {
      categoryNotSelected = !form.getValues()?.mobile;
    }
    return categoryNotSelected;
  }

  function fieldIsZero(name: "foodItems" | "drinkItems" | "mobileItems") {
    const fieldAtZero = +(form.getValues()?.[name] || 0) === 0;
    return fieldAtZero;
  }

  return (
    <>
      <div
        className={cn(
          "flex items-center rounded-sm border border-slate-500 font-sodo font-bold shadow-sm",
          { "border-slate-300": categoryNotSelected(name) },
        )}
      >
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <>
              <Button
                onClick={() =>
                  form.setValue(name, +(form.getValues(name) || 0) - 1)
                }
                className={cn(
                  "py-6 text-xl font-bold text-black disabled:text-gray-300 md:px-8 lg:px-10",
                )}
                disabled={categoryNotSelected(name) || fieldIsZero(name)}
                variant={"ghost"}
                type="button"
              >
                -
              </Button>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className={cn(
                      "h-8 rounded-none border-0 border-x-2 border-slate-300 bg-transparent text-center text-black disabled:cursor-default disabled:text-black disabled:opacity-100",
                      {
                        "text-gray-300 disabled:text-gray-300":
                          categoryNotSelected(name),
                      },
                    )}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button
                onClick={() =>
                  form.setValue(name, +(form.getValues(name) || 0) + 1)
                }
                className={cn(
                  "py-6 text-xl font-bold text-black disabled:text-gray-300 md:px-8 lg:px-10",
                )}
                variant={"ghost"}
                disabled={categoryNotSelected(name)}
                type="button"
              >
                +
              </Button>
            </>
          )}
        />
      </div>
    </>
  );
};

export default ItemCount;
