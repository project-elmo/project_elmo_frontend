import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '@/pages/Root';
import WelcomePage from '@/pages/WelcomePage';
import SettingPage from '@/pages/SettingPage';
import { ROUTES } from '@/constants';

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <Root />,
    children: [
      {
        path: ROUTES.WELCOME,
        element: <WelcomePage />,
      },
      {
        path: ROUTES.SETTING,
        element: <SettingPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
