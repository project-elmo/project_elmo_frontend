import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '@/pages/Root';
import Welcome from '@/pages/Welcome';
import Setting from '@/pages/Setting';
import { ROUTES } from './constants';

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <Root />,
    children: [
      {
        path: ROUTES.WELCOME,
        element: <Welcome />,
      },
      {
        path: ROUTES.SETTING,
        element: <Setting />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
