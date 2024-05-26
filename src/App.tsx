import { useEffect, useState } from "react";
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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import supabase from "@/supabaseConfig";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";

function App() {
  const navigate = useNavigate();

  const { toast } = useToast();

  const [session, setSession] = useState<null | Session>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setSession(session);
      }
    });
  }, [navigate]);

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

  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const categoryError: boolean = !!(
    form.formState?.errors?.mobile?.message &&
    form.formState?.errors?.food?.message &&
    form.formState?.errors?.drinks?.message
  );

  async function onSubmit(values: TrackerSchema) {
    setLoading(true);

    const { data, error } = await supabase.from("entries").insert(values);

    if (error && error.message) {
      if (
        error.message.endsWith(
          'new row violates row-level security policy for table "entries"',
        )
      )
        setSubmitError("You need to sign in to submit an entry");
      else {
        setSubmitError(error.message);
      }
    } else {
      setSubmitError("");
      console.log(data);
      toast({
        title: "Success",
        description: "submitted successfully",
        duration: 2000,
        className: "border-2 border-green-500",
      });
      form.reset();
    }

    setLoading(false);
  }

  if (!session)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-4xl font-bold text-[#00754A]">Loading...</p>
      </div>
    );

  return (
    <>
      <div className="min-h-[calc(100vh_-_80px)] bg-[#F9F9F9] px-3">
        {submitError && (
          <p className="text-center text-red-500">{submitError}</p>
        )}
        <div className="flex flex-col items-center font-sodo md:mx-auto  md:max-w-2xl lg:max-w-3xl">
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
              <div className="mb-4 flex w-full gap-4 md:max-w-screen-lg">
                <CategoryButton
                  form={form}
                  icon={
                    <div>
                      <img
                        src="src/assets/summer_berry.webp"
                        className="mx-auto w-[150px] md:w-[200px]"
                      />
                      <p className="text-xl font-bold">Drinks</p>
                    </div>
                  }
                  categoryError={categoryError}
                  name="drinks"
                />

                <CategoryButton
                  form={form}
                  icon={
                    <div>
                      <img
                        src="src/assets/double_smoked_bacon.webp"
                        className="mx-auto w-[120px] md:w-[250px]"
                      />
                      <p className="text-xl font-bold">Food</p>
                    </div>
                  }
                  categoryError={categoryError}
                  name="food"
                />

                <CategoryButton
                  form={form}
                  icon={
                    <div>
                      <img
                        src="src/assets/mobile_order1.webp"
                        className="mx-auto w-32 p-2 md:w-auto"
                      />
                      <p className="text-xl font-bold">Mobile</p>
                    </div>
                  }
                  categoryError={categoryError}
                  name="mobile"
                />
              </div>
              <p className="stext-sm text-gray-700">No. of items</p>
              <div className="flex gap-4">
                <ItemCount name="drinkItems" form={form} />
                <ItemCount name="foodItems" form={form} />
                <ItemCount name="mobileItems" form={form} />
              </div>

              <StackSelect form={form} />
              <Button
                type="submit"
                disabled={loading}
                className={cn(
                  "fixed bottom-12 right-6 h-16 w-32 rounded-full bg-[#00754A] font-sodo text-2xl shadow-2xl transition-all hover:bg-[#006241] hover:brightness-125 md:right-8 lg:right-12",
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
