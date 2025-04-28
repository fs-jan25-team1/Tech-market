import { Link } from 'react-router-dom';
import { ButtonTypes } from '@/types/ButtonTypes';
import { CardInfoType } from '../../../types/CardInfoType';
import Button from '../../atoms/button/Button';
import { Heart } from 'lucide-react';
import React from 'react';
import { toast } from 'react-hot-toast';

type Props = Partial<CardInfoType> & {
  id?: string;
  isFavourite?: boolean;
};

export const ProductCard = ({
  id = '1',
  img = '/img/phones/apple-iphone-14-pro/spaceblack/00.webp',
  name = 'Apple iPhone 11 128GB Black',
  priceRegular = 1199,
  priceDiscount = 999,
  screen = '6,5" OLED',
  capacity = '512Gb',
  ram = '8Gb',
  isFavourite = false,
}: Props) => {
  const handleFavoritesClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    toast.success(`${name} added to favorites`, {
      style: {
        background: '#161827',
        color: '#F1F2F9',
        border: '1px solid #3B3E4A',
      },
    });
  };

  const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    toast.success(`${name} added to cart`, {
      style: {
        background: '#161827',
        color: '#F1F2F9',
        border: '1px solid #3B3E4A',
      },
    });
  };

  return (
    <div
      className="
      bg-[#161827] text-[#F1F2F9]
      w-full h-full
      p-2 sm:p-4 flex flex-col cursor-pointer
      transition-all duration-300 ease-in-out
      hover:scale-105 hover:shadow-lg
      hover:bg-[#1f2133]
      animate-fadeIn
      "
    >
      <Link
        to={`/product/${id}`}
        className="flex flex-col items-center cursor-pointer grow px-[16px]"
      >
        <img
          className="h-[120px] w-[140px] sm:h-[196px] sm:w-[208px] object-contain mb-2 sm:mb-[24px]"
          src={img}
          alt={name}
        />
        <h2 className="font-[MontSemiBold] text-xs sm:text-sm leading-[18px] sm:leading-[21px] w-full text-left h-[42px]">
          {name}
        </h2>

        <div className="mb-2 sm:mb-[14px] w-full">
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

        <div className="text-[#89939A] text-xs flex flex-col justify-between w-full border-t border-[#3B3E4A] mb-3 sm:mb-[32px] pt-[16px]">
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
      </Link>

      <div className="flex items-center justify-between gap-1 sm:gap-2 w-full mt-auto">
        <Button
          content="Add to cart"
          variant={ButtonTypes.primary}
          className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 !w-full"
          onClick={handleAddToCartClick}
        />
        <Button
          variant={ButtonTypes.favourite}
          icon={Heart}
          iconSize={14}
          className={`w-8 h-8 sm:w-10 sm:h-10 ${isFavourite ? 'active' : ''}`}
          onClick={handleFavoritesClick}
        />
      </div>
    </div>
  );
};
