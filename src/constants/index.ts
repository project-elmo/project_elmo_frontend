export const SERVICE_NAME = 'ELMO';

export const SOCKET_API_URL = `${
  import.meta.env.VITE_SOCKET_URL
}/api/training/ws/progress/`;

export const ROUTES = {
  MAIN: '/',
  WELCOME: '/welcome',
  SETTING: '/setting',
  TRAIN: '/train',
  TEST: '/test',
} as const;

export const QUERY_KEYS = {
  HEALTH: 'health',
  PRE_TRAINED_MODELS: 'preTrainedModels',
} as const;
