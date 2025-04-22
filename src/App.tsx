import { Outlet } from 'react-router';

export const App = () => {
  return (
    <>
      <h1>ХЕДЕР ВМЕСТО этого h1</h1>

      <main>
        <Outlet />
      </main>
    </>
  );
};
