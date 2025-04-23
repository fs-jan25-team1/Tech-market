import Button from '@/components/atoms/button/Button';
import { ButtonTypes } from '@/types/ButtonTypes';
import { ProductColor } from '@/types/ProductColor';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';

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
    </>
  );
};
