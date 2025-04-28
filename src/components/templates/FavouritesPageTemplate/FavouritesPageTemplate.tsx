import { ProductCard } from '@/components/organisms/ProductCard/ProductCard';
import { useAppSelector } from '@/store/store';
import { ProductCardType } from '@/types/ProductCardType';

export const FavouritesPageTemplate = () => {
  const items = useAppSelector((store) => store.favourites.items);
  const displayedProducts: ProductCardType[] = items;
  console.log('Favourites items:', items);
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
      <div
        className="col-span-full
          font-[Mont] font-extrabold
          text-[32px] leading-[41px] tracking-[-0.01em]
          min-[639px]:text-[48px] min-[1200px]:leading-[56px]
          text-[#F1F2F9] mb-2"
      >
        Favourites
      </div>
      <div
        className="col-span-full
          font-[Mont] font-semibold
          text-[14px] leading-[21px] tracking-normal
          text-[#F1F2F9] mb-10"
      >
        {items.length} models
      </div>
      <div
        className="col-span-full grid 
          grid-cols-1 gap-x-4 gap-y-10
          justify-items-center
          min-[400px]:grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4"
      >
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            priceRegular={product.fullPrice}
            priceDiscount={product.price}
            img={product.image}
            screen={product.screen}
            capacity={product.capacity}
            ram={product.ram}
          />
        ))}
      </div>
    </div>
  );
};
