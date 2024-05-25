import { useState } from "react";
import CategoryButton from "./components/CategoryButton";
import { trackerSchema } from "./models/formSchema";
import { Button } from "./components/ui/button";
import ItemCount from "./components/ItemCount";
import StackSelect from "./components/ui/StackSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TrackerSchema } from "./models/formSchema";
import { Form } from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "./lib/utils";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import supabase from "@/supabaseConfig";

function App() {
  const { toast } = useToast();

  const form = useForm<TrackerSchema>({
    resolver: zodResolver(trackerSchema),
    defaultValues: {
      food: false,
      drinks: false,
      mobile: false,
      stack: false,
      foodItems: 0,
      drinkItems: 0,
      mobileItems: 0,
    },
    reValidateMode: "onChange",
  });

  // const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const categoryError: boolean = !!(
    form.formState?.errors?.mobile?.message &&
    form.formState?.errors?.food?.message &&
    form.formState?.errors?.drinks?.message
  );

  async function onSubmit(values: TrackerSchema) {
    setLoading(true);
    try {
      const request = await supabase.from("entries").insert(values);

      console.log(request);

      console.log(values);
      toast({
        title: "Success",
        description: "submitted successfully",
        duration: 2000,
        className: "border-2 border-green-500",
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <>
      <Header />
      <div className="bg-[#F9F9F9]">
        <div className="mx-auto flex max-w-3xl flex-col  items-center font-sodo">
          {/* <h1 className='text-3xl font-semibold  p-8  w-full text-center bg-[#00754A] text-purple-100 font-sodo'>
            What are we waiting on?
          </h1> */}
          {/* START FORM */}
          <p className="mt-4 min-h-4 text-red-500">
            {categoryError && form.formState?.errors?.mobile?.message}
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <p className="mb-2 text-sm text-gray-700">(Tap to Select)</p>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-3">
                  <CategoryButton
                    form={form}
                    icon={
                      <div>
                        <img
                          src="src/assets/summer_berry.webp"
                          className="w-[200px]"
                        />
                        <p className="text-xl font-bold">Drinks</p>
                      </div>
                    }
                    categoryError={categoryError}
                    name="drinks"
                  />
                  <ItemCount name="drinkItems" form={form} />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <CategoryButton
                    form={form}
                    icon={
                      <div>
                        <img
                          src="src/assets/double_smoked_bacon.webp"
                          className="w-[200px]"
                        />
                        <p className="text-xl font-bold">Food</p>
                      </div>
                    }
                    categoryError={categoryError}
                    name="food"
                  />
                  <ItemCount name="foodItems" form={form} />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <CategoryButton
                    form={form}
                    icon={
                      <div>
                        <img
                          src="src/assets/mobile_order1.webp"
                          className="p-2"
                        />
                        <p className="text-xl font-bold">Mobile</p>
                      </div>
                    }
                    categoryError={categoryError}
                    name="mobile"
                  />
                  <ItemCount name="mobileItems" form={form} />
                </div>
              </div>

              <StackSelect form={form} />
              <Button
                type="submit"
                className={cn(
                  "absolute bottom-12 right-12 h-16 w-32 rounded-full bg-[#00754A] font-sodo text-2xl shadow-2xl transition-all hover:bg-[#006241] hover:brightness-125",
                  { "w-16 p-0 shadow-none": loading },
                )}
              >
                {loading ? (
                  <ReloadIcon className="h-12 w-12 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
          {/* END FORM */}

          <p className="text-black">
            NOTE: this site is not affiliated with Starbucks corporation
            <span className="align-super text-xs">&copy;</span> in any way.
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
