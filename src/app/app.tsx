import { Suspense } from 'react';
import { Router, RouterProvider } from '../shared/lib/routes';
import { pages } from '../pages';
import { Layout } from '../widgets/layout';
export const App = () => {
  return (
    <RouterProvider>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Router pages={pages} />
        </Suspense>
      </Layout>
    </RouterProvider >
  );
}

