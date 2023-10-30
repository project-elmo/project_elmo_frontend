import { useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { QueryErrorResetBoundary, useQuery } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { getFineTunedModelsWithTests } from '@/api/rest';
import { ReactFlowProvider } from 'reactflow';
import {
  MdOutlineAdd,
  MdOutlineChevronLeft,
  MdOutlineMenu,
  MdOutlineSettings,
} from 'react-icons/md';
import Button from '@/components/Button';
import SideNav from '@/components/SideNav';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Collapsible from '@/components/CollapsibleMenu';
import ErrorFallback from '@/components/ErrorFallback';
import { QUERY_KEYS, ROUTES } from '@/constants';

export default function Root() {
  const { fmNo } = useParams();
  const [searchParams] = useSearchParams();
  const testNos = searchParams.getAll('testNo').map(Number);
  const { pathname } = useLocation();
  const [showNav, setShowNav] = useState(true);
  const [opened, setOpened] = useState<number[]>([]);
  const navigate = useNavigate();

  const currentPage = pathname.includes(ROUTES.TEST.INDEX)
    ? 'test'
    : pathname.includes(ROUTES.TRAINING)
    ? 'training'
    : 'history';

  const { data: models } = useQuery({
    queryKey: [QUERY_KEYS.FINE_TUNED_WITH_TESTS],
    queryFn: getFineTunedModelsWithTests,
  });

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
              {showNav ? (
                <SideNav side="left" className="flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1.5">
                      <Button
                        listStyle
                        className="flex-1 text-left"
                        onClick={() => navigate(ROUTES.TRAINING)}
                      >
                        <MdOutlineAdd className="inline-block mr-2" />
                        <span>New Model</span>
                      </Button>
                      <Button listStyle onClick={() => setShowNav(false)}>
                        <MdOutlineChevronLeft />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-1.5 mt-1.5 max-h-[calc(100vh-14.5rem)] overflow-x-hidden overflow-y-scroll">
                      {models?.map((model) => (
                        <Collapsible
                          key={model.fm_no}
                          trigger={{
                            name: model.fm_name,
                            to:
                              currentPage === 'test'
                                ? `${ROUTES.TEST.INDEX}/${model.fm_no}`
                                : `${ROUTES.MAIN}${model.fm_no}`,
                            selected: Number(fmNo) === model.fm_no,
                          }}
                          contents={model.list_test?.map((test) => ({
                            name: test.ts_model_name,
                            to: `${ROUTES.TEST.INDEX}/${model.fm_no}?testNo=${test.test_no}`,
                            selected:
                              currentPage === 'test' &&
                              testNos.includes(test.test_no),
                          }))}
                          isOpen={opened.includes(model.fm_no)}
                          onOpenChange={(open) =>
                            setOpened((prev) =>
                              open
                                ? [...prev, model.fm_no]
                                : prev.filter((fmNo) => fmNo !== model.fm_no)
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <Link
                    to={ROUTES.SETTING}
                    className="-mx-2 p-4 pt-5 flex items-center gap-3 border-t-2 border-line "
                  >
                    <MdOutlineSettings className="text-xl" />
                    <span>Settings</span>
                  </Link>
                </SideNav>
              ) : (
                <Button
                  listStyle
                  onClick={() => setShowNav(true)}
                  className="absolute m-1.5 z-10 shadow-md"
                >
                  <MdOutlineMenu />
                </Button>
              )}

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
