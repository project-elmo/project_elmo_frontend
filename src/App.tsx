import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { healthCheck } from '@/api/rest';
import { useUser } from '@/contexts/UserContext';
import { routes } from '@/utils/routes';
import { QUERY_KEYS } from '@/constants';

const queryClient = new QueryClient();

export default function App() {
  const { isOnboarded } = useUser();
  const router = createBrowserRouter(routes(isOnboarded));

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
