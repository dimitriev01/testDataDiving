import { Suspense } from 'react';
import { Layout } from 'src/widgets/layout';
import { Router } from 'src/shared/lib/routes';
import { pages } from 'src/pages';
import { RouterProvider } from './providers';

export const App = () => {
  return (
    <RouterProvider>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Router pages={pages} />
        </Suspense>
      </Layout>
    </RouterProvider>
  );
}

