import Header from '@/components/organisms/Header/Header';
import { Outlet } from 'react-router';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
