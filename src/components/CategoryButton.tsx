type CategoryButtonProps = {
  label: 'food' | 'mobile' | 'drinks';
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

import { cn } from '@/lib/utils';

const CategoryButton = ({ label, checked, onChange }: CategoryButtonProps) => {
  return (
    <label className='inline-flex items-center cursor-pointer relative'>
      <span
        className={cn(
          'border-8 w-64 h-48 relative rounded-xl border-slate-400',
          {
            'border-blue-500': checked,
          }
        )}
      >
        <input
          type='checkbox'
          className='opacity-0 absolute'
          checked={checked}
          onChange={onChange}
        />
        {/* {checked && <span className='block w-3 h-3 bg-white rounded'></span>} */}
      </span>
      <span className='text-gray-700 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl'>
        {label}
      </span>
    </label>
  );
};

export default CategoryButton;
