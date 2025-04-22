import { Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};
