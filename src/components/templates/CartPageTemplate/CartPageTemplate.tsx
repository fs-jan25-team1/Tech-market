import Button from '@/components/atoms/button/Button';
import { ButtonTypes } from '@/types/ButtonTypes';
import { CartItem } from '@/components/organisms/CartItem/CartItem';
import { Link } from 'react-router';
import { useAppSelector } from '@/store/store';

export const CartPageTemplate = () => {
  const products = useAppSelector((store) => store.cart.items);
  const cartItems = Object.values(products);

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

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

      {cartItems.length === 0 ? (
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
            {cartItems.map((item) => (
              <CartItem
                key={item.product.id}
                id={item.product.id}
                img={item.product.image}
                name={item.product.name}
                price={item.product.price}
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
              <Link to="/checkout" className="w-full">
                <Button
                  variant={ButtonTypes.primary}
                  content="Checkout"
                  width={'100%'}
                />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
