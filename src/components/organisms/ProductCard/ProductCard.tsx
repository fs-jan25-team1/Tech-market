import { ButtonTypes } from '@/types/ButtonTypes';
import { CardInfoType } from '../../../types/CardInfoType';
import Button from '../../atoms/button/Button';
import { Heart } from 'lucide-react';

type Props = Partial<CardInfoType>;

export const ProductCard = ({
  img = '/img/phones/apple-iphone-14-pro/spaceblack/00.webp',
  name = 'Apple iPhone 11 128GB Black',
  priceRegular = 1199,
  priceDiscount = 999,
  screen = '6,5" OLED',
  capacity = '512Gb',
  ram = '8Gb',
}: Props) => {
  return (
    <div
      className="bg-[#161827] text-[#F1F2F9] 
      w-[212px] h-[439px] 
      sm:w-[237px] sm:h-[512px] 
      xl:w-[272px] xl:h-[506px] 
      p-3 sm:p-4 flex flex-col cursor-pointer"
    >
      <div className="flex flex-col items-center mb-2 sm:mb-[8px]">
        <img
          className="h-[160px] w-[180px] sm:h-[196px] sm:w-[208px] object-contain mb-2 sm:mb-[8px]"
          src={img}
          alt={name}
        />
        <h2 className="font-mont text-sm font-light leading-[21px] text-size-[14px] w-[180px] sm:w-[208px] text-center">
          {name}
        </h2>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-3 sm:mb-[14px] w-[180px] sm:w-[208px]">
          <div className="flex items-center gap-2 text-lg font-bold">
            <span>${priceDiscount ?? priceRegular}</span>
            {priceDiscount && (
              <span className="text-[#89939A] line-through text-base font-normal">
                ${priceRegular}
              </span>
            )}
          </div>
        </div>

        <div className="w-[180px] sm:w-[208px] h-px bg-[#3B3E4A] mb-6 sm:mb-[32px]" />

        <div className="text-[#89939A] text-sm mb-6 sm:mb-8 flex flex-col justify-between w-[180px] sm:w-[208px]">
          <p className="flex justify-between mb-2 sm:mb-[8px]">
            Screen: <span className="text-[#F1F2F9]">{screen}</span>
          </p>
          <p className="flex justify-between mb-2 sm:mb-[8px]">
            Capacity: <span className="text-[#F1F2F9]">{capacity}</span>
          </p>
          <p className="flex justify-between mb-2 sm:mb-[8px]">
            RAM: <span className="text-[#F1F2F9]">{ram}</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 w-[180px] sm:w-[208px]">
          <Button content="Add to cart" variant={ButtonTypes.primary} />
          <Button variant={ButtonTypes.favourite} icon={Heart} iconSize={15} />
        </div>
      </div>
    </div>
  );
};
