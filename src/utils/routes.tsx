import { Navigate } from 'react-router-dom';
import Root from '@/pages/Root';
import WelcomePage from '@/pages/WelcomePage';
import SettingPage from '@/pages/SettingPage';
import TrainingPage from '@/pages/training';
import HistoryPage from '@/pages/HistoryPage';
import TestPage from '@/pages/test';
import { ROUTES } from '@/constants';

export const routes = (isOnboarded: boolean) => {
  const mainComponent = isOnboarded ? (
    <Root />
  ) : (
    <Navigate to={ROUTES.WELCOME} />
  );

  return [
    {
      path: ROUTES.WELCOME,
      element: !isOnboarded ? <WelcomePage /> : <Navigate to={ROUTES.MAIN} />,
    },
    {
      path: ROUTES.MAIN,
      element: mainComponent,
      children: [
        {
          index: true,
          element: <HistoryPage />,
        },
        {
          path: ROUTES.SETTING,
          element: <SettingPage />,
        },
        {
          path: ROUTES.TRAINING,
          element: <TrainingPage />,
        },
        {
          path: ROUTES.TEST.INDEX,
          children: [
            {
              index: true,
              element: <TestPage />,
            },
            {
              path: ROUTES.TEST.CREATE,
              element: <TestPage />,
            },
            {
              path: ROUTES.TEST.CHAT,
              element: <TestPage />,
            },
          ],
        },
        {
          path: ROUTES.HISTORY,
          element: <HistoryPage />,
        },
      ],
    },
  ];
};
