import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactFlowProvider } from 'reactflow';
import Header from '@/components/Header';
import Container from '@/components/Container';
import ModelNav from '@/components/ModelNav';
import ErrorFallback from '@/components/ErrorFallback';
import { ROUTES } from '@/constants';

export default function Root() {
  const { pathname } = useLocation();

  let currentPage = 'home';
  if (pathname.includes(ROUTES.TEST.INDEX)) currentPage = 'test';
  else if (pathname.includes(ROUTES.TRAINING)) currentPage = 'training';
  else if (pathname.includes(ROUTES.HISTORY.INDEX)) currentPage = 'history';

  return (
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
          <Container>
            <Header currentPage={currentPage} />
            <section className="flex flex-1 w-screen">
              {currentPage !== 'home' && <ModelNav currentPage={currentPage} />}
              <ReactFlowProvider>
                <Outlet />
              </ReactFlowProvider>
            </section>
          </Container>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
