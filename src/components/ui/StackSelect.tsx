import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { FormField } from "./form";
import { UseFormReturn } from "react-hook-form";

type StackSelectProps = {
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
};

const StackSelect = ({ form }: StackSelectProps) => {
  return (
    <>
      <div className="my-12 mr-auto ">
        <div className="mb-4 flex w-full items-center gap-2 border-b-4 border-b-[#D4E9E2]">
          <p className="font-sodo font-bold">Is there a stack?</p>
          <Popover>
            <PopoverTrigger>
              <QuestionMarkCircledIcon className="mb-1 scale-125" />
            </PopoverTrigger>
            <PopoverContent side="right">
              <p className="mb-12 ml-2 rounded-full border border-gray-300 px-4 py-2 font-sodo text-sm text-gray-600 shadow-lg">
                Is there a line of cars waiting to order?
              </p>
            </PopoverContent>
          </Popover>
        </div>
        <FormField
          name={"stack"}
          control={form.control}
          render={({ field }) => (
            <Tabs
              defaultValue="yes"
              value={field.value === true ? "yes" : "no"}
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
          )}
        />
      </div>
    </>
  );
};

export default StackSelect;
