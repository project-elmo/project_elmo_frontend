import { Link, Outlet, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Train', path: '/' },
  { name: 'Test', path: '/test' },
  { name: 'History', path: '/history' },
];

export default function Root() {
  const { pathname } = useLocation() as { pathname: string };

  return (
    <section>
      <header className="flex gap-10 sm:block p-6 border-b-2 border-b-line">
        <h3 className="sm:absolute p-3 sm:pl-10 text-2xl sm:text-3xl">ELMO</h3>
        <nav>
          <ul className="flex justify-center gap-8">
            {navigation.map((menu) => {
              const isActive = pathname === menu.path;
              return (
                <li
                  key={menu.name}
                  className={`w-20 p-3 text-center font-bold ${
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
      <section>
        <nav>nav</nav>
        <Outlet />
      </section>
    </section>
  );
}
