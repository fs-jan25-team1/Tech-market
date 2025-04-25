import Header from '@/components/organisms/Header/Header';
import { Outlet } from 'react-router';
import { Footer } from './components/organisms/Footer/Footer';
import { Breadcrumb } from './components/atoms/Breadcrumb/Breadcrumb';
import { ToasterWrapper } from './components/ui/toaster';
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
