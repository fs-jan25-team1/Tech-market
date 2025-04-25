import Header from '@/components/organisms/Header/Header';
import { Outlet } from 'react-router';
import { Footer } from './components/organisms/Footer/Footer';
import { ToasterWrapper } from './components/ui/toaster';
import { Breadcrumb } from './components/atoms/Breadcrumb/Breadcrumb';

export const App = () => {
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
