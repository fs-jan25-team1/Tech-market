import React from 'react';

import Button from '@/components/atoms/button/Button';
import { ButtonTypes } from '@/types/ButtonTypes';
import { CartItem } from '@/components/organisms/CartItem/CartItem';

type CartItemType = {
  img: string;
  name: string;
  price: number;
};

// Dummy data for cart items
const cartItemsData: CartItemType[] = [
  {
    img: '/img/phones/apple-iphone-14-pro/spaceblack/00.webp',
    name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
    price: 999,
  },
  {
    img: '/img/phones/apple-iphone-14-pro/spaceblack/00.webp',
    name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
    price: 999,
  },
  {
    img: '/img/phones/apple-iphone-14-pro/spaceblack/00.webp',
    name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
    price: 999,
  },
];

type Props = {
  cartItems?: CartItemType[]; // Replace with the actual type of cart items
};

export const CartPageTemplate: React.FC<Props> = ({
  cartItems = cartItemsData,
}) => {
  const totalItems = 5;
  const totalPrice = 1000;

  return (
    <div
      className="grid grid-cols-4 gap-4 
      min-[640px]:grid-cols-12
      min-[1200px]:grid-cols-24 px-4
      min-[640px]:px-6
      min-[1200px]:px-0
      min-[1200px]:max-w-[1136px] mx-auto
      pt-6 pb-16
      min-[640px]:pt-10 min-[640px]:pb-16
      min-[1200px]:pt-10 min-[1200px]:pb-20 
      gap-y-0"
    >
      <h1
        className="col-span-full
          font-[Mont] font-extrabold
          text-[32px] leading-[41px] tracking-[-0.01em]
          min-[639px]:text-[48px] min-[1200px]:leading-[56px]
          text-[#F1F2F9] mb-2"
      >
        Cart
      </h1>

      {!cartItems ? (
        <h2
          className="col-span-full
          font-[Mont] font-semibold
          text-[22px] leading-[34px] tracking-normal
          text-[#F1F2F9] mb-10"
        >
          No items in cart
        </h2>
      ) : (
        <>
          {/* Cart items */}
          <div className="col-span-full min-[1200px]:col-span-16">
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                img={item.img}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>

          {/* Checkout container */}
          <div className="col-span-full min-[1200px]:col-span-8 border-1 border-[#3B3E4A] p-6 self-start">
            <div className="flex flex-col items-center">
              <h2 className="font-[montBold] text-2xl">${totalPrice}</h2>
              <h4 className="font-[Mont] text-sm text-[#75767F]">
                Total for {totalItems} items
              </h4>
              <div className="h-[1px] bg-[#3B3E4A] w-full my-4"></div>
              <Button
                variant={ButtonTypes.primary}
                content="Checkout"
                width={'100%'}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};