import { Route, Routes } from 'react-router-dom';
import { useScrollToTop } from './ScrollToTop';
import { Suspense } from 'react';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

export function AppRouter() {
  useScrollToTop();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
}
