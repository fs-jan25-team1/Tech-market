import { CustomDropdown } from '@/components/atoms/dropdown/Dropdown';
import { Pagination } from '../../molecules/Pagination/Pagination';
import products from '../../../../public/api/products.json';
import { ProductCard } from '@/components/organisms/ProductCard/ProductCard';
import { ProductCardType } from '@/types/ProductCardType';
const DropdownSortBy = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'most-expensive', label: 'Most expensive' },
];

const DropdownItemsOnPage = [
  { value: '16', label: '16' },
  { value: '20', label: '20' },
  { value: '24', label: '24' },
];

export const PhonesPageTemplate = () => {
  const displayedProducts: ProductCardType[] = products.slice(0, 16);

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
      {/* needs to update with dinamic routing */}
      <div
        className="col-span-full
          font-[Mont] font-extrabold
          text-[32px] leading-[41px] tracking-[-0.01em]
          min-[639px]:text-[48px] min-[1200px]:leading-[56px]
          text-[#F1F2F9] mb-2"
      >
        Mobile phones
      </div>
      <div
        className="col-span-full
          font-[Mont] font-semibold
          text-[14px] leading-[21px] tracking-normal
          text-[#F1F2F9] mb-10"
      >
        95 models
      </div>
      <div
        className="col-span-full grid 
          grid-cols-[repeat(4,min-content)] gap-4
          min-[640px]:grid-cols-[repeat(12,min-content)]
          min-[1200px]:grid-cols-[repeat(24,min-content)] pb-6"
      >
        <div
          className="col-span-2 
            min-[640px]:col-span-4
            min-[1200px]:col-span-4"
        >
          <CustomDropdown
            placeholder="Newest"
            options={DropdownSortBy}
            onValueChange={(value) => console.log('DropdownSortBy:', value)}
            size="medium"
            name="Sort by"
          />
        </div>
        <div
          className="col-span-2 
            min-[640px]:col-span-3
            min-[1200px]:col-span-3"
        >
          <CustomDropdown
            placeholder="16"
            options={DropdownItemsOnPage}
            onValueChange={(value) => console.log('DropdownSortBy:', value)}
            size="small"
            name="Items on page"
          />
        </div>
      </div>
      <div
        className="col-span-full grid 
          grid-cols-1 gap-x-4 gap-y-10
          justify-items-center
          min-[400px]:grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4 mb-10"
      >
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
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
      <div className="col-span-full">
        <Pagination totalPages={4} />
      </div>
    </div>
  );
};
