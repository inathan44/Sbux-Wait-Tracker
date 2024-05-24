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
      <div className='flex gap-2 items-center'>
        <Button
          onClick={() => handleCountClick(category, -1)}
          className={cn('')}
          disabled={count === 0}
        >
          -
        </Button>
        <p>{count}</p>
        <Button onClick={() => handleCountClick(category, 1)}>+</Button>
      </div>
    </>
  );
};

export default ItemCount;
