import Button from '@/components/atoms/button/Button';
import { ButtonTypes } from '@/types/ButtonTypes';
import { Minus, Plus, X } from 'lucide-react';

type Props = {
  img: string;
  name: string;
  price: number;
};

export const CartItem: React.FC<Props> = ({
  img = '/img/phones/apple-iphone-14-pro/spaceblack/00.webp',
  name = 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
  price = 999,
}) => {
  return (
    // Container
    <div
      className="
        bg-[#161827] text-[#F1F2F9]
        max-w-screen min-w-[288px]
        p-2 flex flex-col cursor-pointer
        gap-4
        mb-4
        sm:flex-row sm:h-32 sm:items-center
      "
    >
      {/* Image and Name */}
      <div className="flex flex-row items-center gap-6 m-2">
        {/* Close button */}
        <Button
          variant={ButtonTypes.numbered}
          width={16}
          height={16}
          icon={X}
          iconSize={15}
          color="#4A4D58"
        />
        <img className="h-16 w-16 object-contain" src={img} alt={name} />
        <h2 className="font-[Mont] text-left text-sm leading-5">{name}</h2>
      </div>

      {/* Counter and Price */}
      <div className="flex items-center justify-between w-full px-2 sm:flex-1">
        <div className="sm:flex-1 sm:flex sm:justify-center">
          <div className="flex flex-row items-center gap-4">
            <Button
              variant={ButtonTypes.arrow}
              icon={Minus}
              iconSize={16}
              disabled={true}
            />
            <span>1</span>
            <Button variant={ButtonTypes.arrow} icon={Plus} iconSize={16} />
          </div>
        </div>
        <div className="ml-6">
          <h2 className="font-[montBold] text-2xl leading-tight">${price}</h2>
        </div>
      </div>
    </div>
  );
};
