import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MdAdd, MdOutlineChevronLeft } from 'react-icons/md';

const navigation = [
  { name: 'Train', path: '/' },
  { name: 'Test', path: '/test' },
  { name: 'History', path: '/history' },
];

export default function Root() {
  const { pathname } = useLocation() as { pathname: string };
  const [showNav, setShowNav] = useState(true);

  return (
    <section className="flex flex-col h-screen">
      <header className="flex gap-10 sm:block p-6 border-b-2 border-b-line">
        <h3 className="sm:absolute mt-3 sm:ml-10 text-2xl sm:text-3xl">ELMO</h3>
        <nav>
          <ul className="flex justify-center gap-8">
            {navigation.map((menu) => {
              const isActive = pathname === menu.path;
              return (
                <li
                  key={menu.name}
                  className={`w-20 h-12 p-3 text-center font-bold ${
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
      <section className="flex flex-1">
        {showNav ? (
          <nav className="w-80 p-1.5 bg-secondary border-r-2 border-line">
            <div className="flex gap-1.5">
              <button className="flex-1 text-left list-btn">
                <MdAdd className="inline-block mr-2" />
                <span>New Model</span>
              </button>
              <button className="list-btn" onClick={() => setShowNav(false)}>
                <MdOutlineChevronLeft />
              </button>
            </div>
          </nav>
        ) : (
          <button
            className="absolute m-1.5 list-btn"
            onClick={() => setShowNav(true)}
          >
            <MdOutlineChevronLeft />
          </button>
        )}
        <Outlet />
      </section>
    </section>
  );
}
