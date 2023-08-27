import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { MdOutlineAdd, MdOutlineChevronLeft } from 'react-icons/md';
import Button from '@/components/Button';
import SideNav from '@/components/SideNav';
import { ROUTES, SERVICE_NAME } from '@/constants';

const navigation = [
  { name: 'Training', path: ROUTES.TRAIN },
  { name: 'Test', path: ROUTES.TEST },
  { name: 'History', path: ROUTES.MAIN },
];

export default function Root() {
  const { pathname } = useLocation() as { pathname: string };
  const [showNav, setShowNav] = useState(true);
  // TODO: API에서 모델 조회
  const [models, setModels] = useState([
    {
      id: '1',
      name: 'meta-llama/Llama-2-7b',
    },
    {
      id: '2',
      name: '문장분석 감성분류 모델',
    },
    {
      id: '3',
      name: '혐오표현 분류 모델',
    },
    {
      id: '4',
      name: '초등학생을 위한 진로코치 대화 모델',
    },
  ]);
  const [selected, setSelected] = useState(models[0].id);
  const navigate = useNavigate();

  return (
    <section className="flex flex-col h-screen">
      <header className="relative flex justify-around gap-10 md:block p-6 border-b-2 border-b-line">
        <div className="md:w-80 h-full flex justify-center items-center md:absolute md:top-0 md:left-0">
          <h3 className="text-2xl md:text-3xl">{SERVICE_NAME}</h3>
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
          <SideNav side="left">
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
            <ul className="mt-1.5">
              {models.map((model) => (
                <li
                  key={model.id}
                  onClick={() => setSelected(model.id)}
                  className={`-mx-1.5 px-4 py-3 cursor-pointer hover:bg-slate-200 ${
                    model.id === selected && 'font-bold bg-slate-200'
                  }`}
                >
                  {model.name}
                </li>
              ))}
            </ul>
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
