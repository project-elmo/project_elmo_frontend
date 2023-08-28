import { useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFineTunedModels } from '@/api/rest';
import { ReactFlowProvider } from 'reactflow';
import {
  MdOutlineAdd,
  MdOutlineChevronLeft,
  MdOutlineSettings,
} from 'react-icons/md';
import Button from '@/components/Button';
import SideNav from '@/components/SideNav';
import { QUERY_KEYS, ROUTES, SERVICE_NAME } from '@/constants';

const navigation = [
  { name: 'Training', path: ROUTES.TRAIN },
  { name: 'Test', path: ROUTES.TEST },
  { name: 'History', path: ROUTES.MAIN },
];

export default function Root() {
  const { pathname } = useLocation() as { pathname: string };
  const { fmNo } = useParams();
  const [showNav, setShowNav] = useState(true);
  const navigate = useNavigate();

  const { data: models } = useQuery({
    queryKey: [QUERY_KEYS.FINE_TUNED_MODELS],
    queryFn: getFineTunedModels,
  });

  return (
    <section className="flex flex-col h-screen">
      <header className="relative flex justify-around gap-10 md:block p-6 border-b-2 border-b-line">
        <div className="md:w-80 h-full flex justify-center items-center md:absolute md:top-0 md:left-0">
          <Link to={ROUTES.MAIN}>
            <h3 className="text-2xl md:text-3xl">{SERVICE_NAME}</h3>
          </Link>
        </div>
        <nav>
          <ul className="flex justify-center gap-8">
            {navigation.map((menu) => {
              const isActive = pathname === menu.path;
              return (
                <li
                  key={menu.name}
                  className={`w-24 h-12 p-3 text-center font-bold ${
                    isActive ? 'border-b-2 border-primary' : 'text-disabled'
                  }`}
                >
                  <Link to={menu.path}>{menu.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <section className="flex flex-1 w-screen">
        {showNav ? (
          <SideNav side="left" className="flex flex-col">
            <div className="flex gap-1.5">
              <Button
                listStyle
                className="flex-1 text-left"
                onClick={() => navigate(ROUTES.TRAIN)}
              >
                <MdOutlineAdd className="inline-block mr-2" />
                <span>New Model</span>
              </Button>
              <Button listStyle onClick={() => setShowNav(false)}>
                <MdOutlineChevronLeft />
              </Button>
            </div>
            <ul className="mt-1.5 grow">
              {models?.map((model) => (
                <Link to={`${ROUTES.MAIN}${model.fm_no}`} key={model.fm_no}>
                  <li
                    className={`-mx-1.5 px-4 py-3 cursor-pointer hover:bg-slate-200 ${
                      fmNo &&
                      model.fm_no === Number(fmNo) &&
                      'font-bold bg-slate-200'
                    }`}
                  >
                    {model.fm_name}
                  </li>
                </Link>
              ))}
            </ul>
            <Link
              to={ROUTES.SETTING}
              className="-mx-2 p-4 pt-5 flex items-center gap-3 border-t-2 border-line text-neutral-400"
            >
              <MdOutlineSettings className="text-xl" />
              <span>Settings</span>
            </Link>
          </SideNav>
        ) : (
          <Button
            listStyle
            onClick={() => setShowNav(true)}
            className="absolute m-1.5"
          >
            <MdOutlineChevronLeft />
          </Button>
        )}
        <ReactFlowProvider>
          <Outlet />
        </ReactFlowProvider>
      </section>
    </section>
  );
}
