import Button from '../../components/atoms/button/Button';
import { ButtonTypes } from '../../types/ButtonTypes';

export const HomePage = () => {
  return (
    <>
      <div>Home page!</div>
      <Button variant={ButtonTypes.primary} content={'Button'} />
      <Button variant={ButtonTypes.numbered} content={'1'} />
      <Button variant={ButtonTypes.arrow} content={'>'} />
    </>
  );
};
