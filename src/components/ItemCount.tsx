import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type ItemCountProps = {
  count: number;
  handleCountClick: (
    category: 'food' | 'mobile' | 'drinks',
    amount: number
  ) => void;
  category: 'food' | 'mobile' | 'drinks';
};

const ItemCount = ({ category, handleCountClick, count }: ItemCountProps) => {
  return (
    <>
      <div className='flex items-center shadow-lg'>
        <Button
          onClick={() => handleCountClick(category, -1)}
          className={cn('p-6 font-bold text-xl text-black')}
          disabled={count === 0}
          variant={'ghost'}
        >
          -
        </Button>
        <p className='border-x-2 border-gray-300 px-6 font-bold'>{count}</p>
        <Button
          onClick={() => handleCountClick(category, 1)}
          className={cn('p-6 font-bold text-xl text-black')}
          variant={'ghost'}
        >
          +
        </Button>
      </div>
    </>
  );
};

export default ItemCount;
