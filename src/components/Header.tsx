import { ROUTES, SERVICE_NAME } from '@/constants';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Training', path: ROUTES.TRAINING },
  { name: 'Test', path: ROUTES.TEST.INDEX },
  { name: 'History', path: ROUTES.MAIN },
];

export default function Header() {
  const { pathname } = useLocation() as { pathname: string };
  return (
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
  );
}
