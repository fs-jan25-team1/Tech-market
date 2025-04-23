import Header from '@/components/organisms/Header/Header';
import { Outlet } from 'react-router';
import { Footer } from './components/organisms/Footer/Footer';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
