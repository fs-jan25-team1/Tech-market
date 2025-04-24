import Button from '@/components/atoms/button/Button';
import { ButtonTypes } from '@/types/ButtonTypes';
import { Minus, Plus, X } from 'lucide-react';

export const CartItem = ({
  img = '/img/phones/apple-iphone-14-pro/spaceblack/00.webp',
  name = 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
}) => {
  return (
    // Cotainer
    <div
      className="
        bg-[#161827] text-[#F1F2F9]
        max-w-screen h-[160px]
        p-2 flex flex-col cursor-pointer
        gap-4
        mx-[16px] mb-[16px]
      "
    >
      {/* Image and Name */}
      <div className="flex flex-row items-center gap-6 m-[8px]">
        {/* Close button */}
        <div className="flex flex-row items-center justify-end">
          <Button
            variant={ButtonTypes.numbered}
            width={16}
            height={16}
            icon={X}
            iconSize={15}
            color="#4A4D58"
          />
        </div>
        <img
          className="h-[66px] w-[66px] object-contain"
          src={img}
          alt={name}
        />
        <h2 className="font-[Mont] text-left text-sm leading-5">{name}</h2>
      </div>
      {/* Counter and Price */}
      <div className="flex flex-row justify-between items-center mx-[8px]">
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
        <h2 className="font-[montBold] text-[22px] leading-[1.4]">$999</h2>
      </div>
    </div>
  );
};
