import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { healthCheck } from '@/api/rest';
import Root from '@/pages/Root';
import WelcomePage from '@/pages/WelcomePage';
import SettingPage from '@/pages/SettingPage';
import TrainingPage from '@/pages/train';
import HistoryPage from '@/pages/HistoryPage';
import { QUERY_KEYS, ROUTES } from '@/constants';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <Root />,
    children: [
      {
        index: true,
        element: <HistoryPage />,
      },
      {
        path: ROUTES.HISTORY,
        element: <HistoryPage />,
      },
      {
        path: ROUTES.WELCOME,
        element: <WelcomePage />,
      },
      {
        path: ROUTES.SETTING,
        element: <SettingPage />,
      },
      {
        path: ROUTES.TRAIN,
        element: <TrainingPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Init />
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

function Init() {
  const { isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.HEALTH],
    queryFn: healthCheck,
  });

  useEffect(() => {
    if (!isSuccess) return;
    console.log('health check');
  }, [isSuccess]);

  return <></>;
}
