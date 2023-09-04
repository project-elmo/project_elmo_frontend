export const SERVICE_NAME = 'ELMO';

export const SOCKET_API_URL = `${
  import.meta.env.VITE_SOCKET_URL
}/api/training/ws/progress/`;

export const ROUTES = {
  MAIN: '/',
  HISTORY: '/:fmNo',
  WELCOME: '/welcome',
  SETTING: '/setting',
  TRAINING: '/training',
  TEST: {
    INDEX: '/test',
    CREATE: '/test/:fmNo',
    CHAT: '/test/:fmNo/:testNo',
  },
} as const;

export const QUERY_KEYS = {
  HEALTH: 'health',
  PRE_TRAINED_MODELS: 'preTrainedModels',
  FINE_TUNED_MODELS: 'fineTunedModels',
  TRAINING_SESSIONS: 'trainingSessions',
  TRAINING_PARAMETER: 'trainingParameter',
  DATASETS: 'datasets',
  CHAT_HISTORY: 'chatHistory',
  FINE_TUNED_WITH_TESTS: 'fineTunedWithTests',
  SETTING: 'setting',
} as const;

export const LOCAL_STORAGE_KEYS = {
  ONBOARDED: 'onboarded',
} as const;
