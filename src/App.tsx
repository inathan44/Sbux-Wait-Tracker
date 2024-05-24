import { useState } from 'react';
import CategoryButton from './components/CategoryButton';
import { trackerSchema } from './models/formSchema';
import { Button } from './components/ui/button';
import ItemCount from './components/ItemCount';
import StackSelect from './components/ui/StackSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TrackerSchema } from './models/formSchema';
import { Form } from '@/components/ui/form';

function App() {
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
    reValidateMode: 'onChange',
  });

  const [categories, setCategories] = useState({
    food: { selected: false, count: 0 },
    mobile: { selected: false, count: 0 },
    drinks: { selected: false, count: 0 },
  });

  // const [error, setError] = useState<string>('');
  // const [loading, setLoading] = useState<boolean>(false);

  async function handleCountClick(
    category: keyof typeof categories,
    amount: number
  ) {
    setCategories((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        count: Math.max(prev[category].count + amount, 0),
      },
    }));
  }

  const categoryError: boolean = !!(
    form.formState?.errors?.mobile?.message &&
    form.formState?.errors?.food?.message &&
    form.formState?.errors?.drinks?.message
  );

  function onSubmit(values: TrackerSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      {/* START FORM */}
      <p>{categoryError && form.formState?.errors?.mobile?.message}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='flex'>
            <div className='flex flex-col items-center'>
              <CategoryButton
                form={form}
                icon={
                  <div>
                    <img
                      src='src/assets/summer_berry.webp'
                      className='w-[200px]'
                    />
                    <p className='text-black font-bold text-xl'>Drinks</p>
                  </div>
                }
                categoryError={categoryError}
                name='drinks'
              />
              <ItemCount
                category='drinks'
                count={categories.drinks.count}
                handleCountClick={handleCountClick}
              />
            </div>
            <div className='flex flex-col items-center'>
              <CategoryButton
                form={form}
                icon={
                  <div>
                    <img
                      src='src/assets/double_smoked_bacon.webp'
                      className='w-[200px]'
                    />
                    <p className='text-black font-bold text-xl'>Food</p>
                  </div>
                }
                categoryError={categoryError}
                name='food'
              />
              <ItemCount
                category='food'
                count={categories.food.count}
                handleCountClick={handleCountClick}
              />
            </div>
            <div className='flex flex-col items-center'>
              <CategoryButton
                form={form}
                icon={
                  <div>
                    <img src='src/assets/mobile_order1.webp' className='p-2' />
                    <p className='text-black font-bold text-xl'>Mobile</p>
                  </div>
                }
                categoryError={categoryError}
                name='mobile'
              />
              <ItemCount
                category='mobile'
                count={categories.mobile.count}
                handleCountClick={handleCountClick}
              />
            </div>
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
      {/* END FORM */}

      <StackSelect />
    </>
  );
}

export default App;
