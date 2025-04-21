import Button from '@/components/atoms/button/Button';
import { ButtonTypes } from '@/types/ButtonTypes';

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
    </>
  );
};
