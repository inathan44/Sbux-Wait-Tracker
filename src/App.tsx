import { useState } from 'react';
import CategoryButton from './components/CategoryButton';
import { trackerSchema } from './models/formSchema';
import { Button } from './components/ui/button';
import ItemCount from './components/ItemCount';
import StackSelect from './components/ui/StackSelect';
import { ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

function App() {
  const [categories, setCategories] = useState({
    food: { selected: false, count: 0 },
    mobile: { selected: false, count: 0 },
    drinks: { selected: false, count: 0 },
  });

  const [stack, setStack] = useState<boolean>(false);

  const [formError, setFormError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleCategoryClick(category: keyof typeof categories) {
    setCategories((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        selected: !prev[category].selected,
      },
    }));
  }

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

  const handleSubmit = async () => {
    setFormError('');

    const data = {
      drinks: categories.drinks.selected,
      food: categories.food.selected,
      mobile: categories.mobile.selected,
      stack,
    };

    try {
      trackerSchema.parse(data);
    } catch (error) {
      const zodError = (error as ZodError).issues[0].message;
      setFormError(zodError);
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      console.log('data', data);
    } catch (error) {
      setError('error submitting form');
    }
    setLoading(false);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen w-screen gap-12'>
        <p>{error}</p>
        <p>{formError}</p>
        <div className='flex mx-12 justify-center'>
          <div>
            <CategoryButton
              checked={categories.food.selected}
              label={'food'}
              onChange={() => handleCategoryClick('food')}
            />
            <ItemCount
              category='food'
              count={categories.food.count}
              handleCountClick={handleCountClick}
            />
          </div>
          <div>
            <CategoryButton
              checked={categories.drinks.selected}
              label={'drinks'}
              onChange={() => handleCategoryClick('drinks')}
            />
            <ItemCount
              category='drinks'
              count={categories.drinks.count}
              handleCountClick={handleCountClick}
            />
          </div>
          <div>
            <CategoryButton
              checked={categories.mobile.selected}
              label={'mobile'}
              onChange={() => handleCategoryClick('mobile')}
            />
            <ItemCount
              category='mobile'
              count={categories.mobile.count}
              handleCountClick={handleCountClick}
            />
          </div>
        </div>
        <StackSelect />
        <Button onClick={handleSubmit} className='w-96'>
          {loading ? 'Loading' : 'Submit'}
        </Button>
      </div>
    </>
  );
}

export default App;
