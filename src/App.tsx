import { Routes, Route } from 'react-router-dom';
import Header from './components/organisms/Header/Header';
import { HomePage } from './modules/HomePage';

import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage.tsx/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
      </Routes>
    </>
  );
};
