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
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

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
          "flex items-center rounded-full border border-slate-500 font-sodo font-bold shadow-sm",
          { "cursor-not-allowed border-slate-300": categoryNotSelected(name) },
        )}
        onClick={() => {
          if (
            !form.getValues()?.food &&
            !form.getValues()?.drinks &&
            !form.getValues()?.mobile
          ) {
            toast({
              title: "Must select a category",
              variant: "destructive",
              description: (
                <p className="text-xs text-slate-600">
                  Click on a category first then select number of items
                </p>
              ),
              duration: 2000,
              className:
                "border-2 border-red-500 mr-auto data-[state=open]:sm:slide-in-from-top-full bg-red-300 text-black",
            });
          }
        }}
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
                  "rounded-l-full py-6 text-xl font-bold text-black disabled:text-gray-300 md:px-8 lg:px-10",
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
                  "rounded-r-full py-6 text-xl font-bold text-black disabled:text-gray-300 md:px-8 lg:px-10",
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
