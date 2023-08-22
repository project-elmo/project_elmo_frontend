import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '@/pages/Root';
import Welcome from '@/pages/Welcome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
