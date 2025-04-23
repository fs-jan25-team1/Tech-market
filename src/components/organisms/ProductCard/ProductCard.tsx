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
      className="
        bg-[#161827] text-[#F1F2F9]
        w-[160px] h-[370px]
        sm:w-[237px] sm:h-[512px]
        xl:w-[272px] xl:h-[506px]
        p-2 sm:p-4 flex flex-col cursor-pointer
      "
    >
      <div className="flex flex-col items-center mb-2 sm:mb-[8px]">
        <img
          className="h-[120px] w-[140px] sm:h-[196px] sm:w-[208px] object-contain mb-2 sm:mb-[8px]"
          src={img}
          alt={name}
        />
        <h2 className="font-[MontSemiBold text-xs sm:text-sm leading-[18px] sm:leading-[21px] w-[140px] sm:w-[208px] text-center">
          {name}
        </h2>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-2 sm:mb-[14px] w-[140px] sm:w-[208px]">
          <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-lg">
            <span className="font-[montBold]">
              ${priceDiscount ?? priceRegular}
            </span>
            {priceDiscount && (
              <span className="font-[MontSemiBold] text-[#89939A] line-through text-xs sm:text-base">
                ${priceRegular}
              </span>
            )}
          </div>
        </div>

        <div className="w-[140px] sm:w-[208px] h-px bg-[#3B3E4A] mb-3 sm:mb-[32px]" />

        <div className="text-[#89939A] text-xs sm:text-sm mb-4 sm:mb-8 flex flex-col justify-between w-[140px] sm:w-[208px]">
          <p className="flex justify-between mb-1 sm:mb-[8px]">
            Screen: <span className="text-[#F1F2F9] font-[mont]">{screen}</span>
          </p>
          <p className="flex justify-between mb-1 sm:mb-[8px]">
            Capacity:{' '}
            <span className="text-[#F1F2F9] font-[mont]">{capacity}</span>
          </p>
          <p className="flex justify-between mb-1 sm:mb-[8px]">
            RAM: <span className="text-[#F1F2F9] font-[mont]">{ram}</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-1 sm:gap-2 w-[140px] sm:w-[208px]">
          <Button
            content="Add to cart"
            variant={ButtonTypes.primary}
            className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2"
          />
          <Button
            variant={ButtonTypes.favourite}
            icon={Heart}
            iconSize={14}
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </div>
      </div>
    </div>
  );
};
