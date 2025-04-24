import Button from '@/components/atoms/button/Button';
import { CustomDropdown } from '@/components/atoms/dropdown/Dropdown';
import { ImageSlider } from '@/components/organisms/BannerSlider/ImageSlider';
import { ProductCard } from '@/components/organisms/ProductCard/ProductCard';
import { ButtonTypes } from '@/types/ButtonTypes';
import { ProductColor } from '@/types/ProductColor';
import { BrandNewSlider } from '@/components/organisms/BrandNewSlider/BrandNewSlider';
import { HotPricesSlider } from '@/components/organisms/HotPricesSlider/HotPricesSlider';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';

const DropdownSortBy = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'most-expensive', label: 'Most expensive' },
];

export const HomePage = () => {
  return (
    <>
      <div>Home page!</div>
      <Button content={'Button'} variant={ButtonTypes.primary} />
      <Button content={'1'} variant={ButtonTypes.numbered} />
      <Button variant={ButtonTypes.arrow} icon={ChevronRight} disabled={true} />
      <Button variant={ButtonTypes.arrow} icon={ChevronRight} />
      <Button variant={ButtonTypes.selector} bgColor={ProductColor.cream} />
      <Button variant={ButtonTypes.favourite} icon={Heart} iconSize={15} />
      <Button content={'Back'} variant={ButtonTypes.back} icon={ChevronLeft} />
      <br />
      <br />
      <CustomDropdown
        placeholder="Newest"
        options={DropdownSortBy}
        onValueChange={(value) => console.log('DropdownSortBy:', value)}
        size="medium"
        name='Sort by'
      />
      <ImageSlider />
      <ProductCard />
      <BrandNewSlider />
      <HotPricesSlider />
    </>
  );
};
