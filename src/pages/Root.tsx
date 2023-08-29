import { useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
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
import Header from '@/components/Header';
import Container from '@/components/Container';
import { QUERY_KEYS, ROUTES } from '@/constants';

export default function Root() {
  const { fmNo } = useParams();
  const [showNav, setShowNav] = useState(true);
  const navigate = useNavigate();

  const { data: models } = useQuery({
    queryKey: [QUERY_KEYS.FINE_TUNED_MODELS],
    queryFn: getFineTunedModels,
  });

  return (
    <Container>
      <Header />
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
              <ul className="mt-1.5 max-h-[calc(100vh-14.5rem)] overflow-x-hidden overflow-y-scroll">
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
            </div>
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
    </Container>
  );
}
