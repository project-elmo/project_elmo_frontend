import { ROUTES } from '@/constants';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Training', path: ROUTES.TRAINING },
  { name: 'Test', path: ROUTES.TEST.INDEX },
  { name: 'History', path: ROUTES.HISTORY.INDEX },
];

interface Props {
  currentPage?: string;
}

export default function Header({ currentPage }: Props) {
  return (
    <header className="relative flex justify-around gap-10 md:block p-6 border-b-2 border-b-line">
      <div className="md:w-72 h-full flex justify-center items-center md:absolute md:top-0 md:left-0">
        <Link to={ROUTES.MAIN}>
          <img src="/logo.png" className="sm:w-[80%] m-auto" />
        </Link>
      </div>
      <nav className="flex justify-center items-center">
        <ul className="flex justify-center gap-8">
          {navigation.map((menu) => {
            const isActive = currentPage === menu.name.toLowerCase();
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
