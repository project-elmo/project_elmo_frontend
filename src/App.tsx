import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { healthCheck } from '@/api/rest';
import { useUser } from '@/contexts/UserContext';
import ErrorFallback from '@/components/ErrorFallback';
import { routes } from '@/utils/routes';
import { QUERY_KEYS } from '@/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      useErrorBoundary: true,
    },
  },
});

export default function App() {
  const { isOnboarded } = useUser();
  const router = createBrowserRouter(routes(isOnboarded));

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error, resetErrorBoundary }: FallbackProps) => (
              <ErrorFallback
                error={error}
                resetErrorBoundary={resetErrorBoundary}
              />
            )}
          >
            <Init />
            <ReactQueryDevtools initialIsOpen={false} />
            <RouterProvider router={router} />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
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
