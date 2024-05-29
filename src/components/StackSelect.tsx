import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { FormField } from "./ui/form";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type StackSelectProps = {
  form: UseFormReturn<
    {
      stack: boolean;
      foodItems?: number | undefined;
      drinkItems?: number | undefined;
      mobileItems?: number | undefined;
      food?: boolean | undefined;
      mobile?: boolean | undefined;
      drinks?: boolean | undefined;
    },
    unknown,
    undefined
  >;
};

const StackSelect = ({ form }: StackSelectProps) => {
  return (
    <>
      <div className="my-4 mr-auto ">
        <FormField
          name={"stack"}
          control={form.control}
          render={({ field }) => (
            <>
              {form.formState?.errors?.stack && (
                <p className="text-red-500">Please select one</p>
              )}
              <div className="mb-4 flex w-full items-center gap-2 border-b-4 border-b-[#D4E9E2]">
                <p className={cn("font-sodo font-bold", {})}>
                  Is there a stack?
                </p>
                <Popover>
                  <PopoverTrigger>
                    <QuestionMarkCircledIcon className="mb-1 scale-125" />
                  </PopoverTrigger>
                  <PopoverContent side="left">
                    <p className="mb-12 ml-2 rounded-full border border-gray-300 bg-gray-600 px-4 py-2 font-sodo text-sm text-white shadow-lg">
                      Is there a line of cars waiting to order?
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <Tabs
                defaultValue="__notselected__"
                value={
                  field.value === undefined
                    ? "__notselected__"
                    : field.value
                      ? "yes"
                      : "no"
                }
                className="w-[400px]"
              >
                <TabsList className=" rounded-full border-2 border-none bg-transparent text-black">
                  <TabsTrigger
                    value="yes"
                    className="border- w-24 rounded-full font-bold data-[state=active]:border-2 data-[state=active]:border-[#00754A] data-[state=active]:bg-[#D4E9E2]"
                    onClick={() => field.onChange(true)}
                  >
                    Yes
                  </TabsTrigger>
                  <TabsTrigger
                    value="no"
                    className="border- w-24 rounded-full font-bold data-[state=active]:border-2 data-[state=active]:border-[#00754A] data-[state=active]:bg-[#D4E9E2]"
                    onClick={() => field.onChange(false)}
                  >
                    No
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </>
          )}
        />
      </div>
    </>
  );
};

export default StackSelect;
