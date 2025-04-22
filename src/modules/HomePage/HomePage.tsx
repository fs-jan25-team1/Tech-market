import Button from '@/components/atoms/button/Button';
import { CustomDropdown } from '@/components/atoms/dropdown/Dropdown';
import { ImageSlider } from '@/components/organisms/BannerSlider/ImageSlider';
import { ButtonTypes } from '@/types/ButtonTypes';

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
      <Button content={'>'} variant={ButtonTypes.arrow} disabled={true} />
      <Button content={'>'} variant={ButtonTypes.arrow} />
      <Button variant={ButtonTypes.selector} />
      <Button variant={ButtonTypes.favourite} />
      <br />
      <br />
      <CustomDropdown
        placeholder="Newest"
        options={DropdownSortBy}
        onValueChange={(value) => console.log('DropdownSortBy:', value)}
        size="medium"
      />
      <ImageSlider />
    </>
  );
};
