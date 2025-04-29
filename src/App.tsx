import Header from '@/components/organisms/Header/Header';
import { Outlet } from 'react-router';
import { Footer } from './components/organisms/Footer/Footer';
import { ToasterWrapper } from './components/ui/toaster';
import { Breadcrumb } from './components/atoms/Breadcrumb/Breadcrumb';
import { useAuthUser } from './hooks/useAuthUser';

export const App = () => {
  useAuthUser();

  return (
    <>
      <Header />
      <ToasterWrapper />
      <Breadcrumb />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
