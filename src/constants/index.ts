export const API_PREFIX = `${import.meta.env.VITE_API_URL}/api`;

export const SERVICE_NAME = 'ELMO';

export const SOCKET_API_URL = `${
  import.meta.env.VITE_SOCKET_URL
}/api/training/ws/progress`;

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

export const INFOS = {
  EPOCHS: `The number of times the entire dataset is iterated during the training process. The higher, the better the model can learn.`,
  SAVE_STRATEGY: `The method used to store a trained model, allowing its progress to be preserved for future use or further training.
              
	Possible values are:
	"no": No save is done during training.
	"steps": Save is done every save_steps.
	"epoch": Save is done at the end of each epoch.`,
  LOGGING_STRATEGY: `The method used to record and store logs. It includes log level, format, and file path.
              
	Possible values are:
	"no": No save is done during training.
	"steps": Save is done every save_steps.
	"epoch": Save is done at the end of each epoch.`,
  EVALUATION_STRATEGY: `The method used to analyze and evaluate the logs. It includes methods for monitoring, analyzing log data, and extracting insights for troubleshooting and performance optimization.
              
	Possible values are:
	"no": No evaluation is done during training.
	"steps": Evaluation is done (and logged) every eval_steps.
	"epoch": Evaluation is done at the end of each epoch.`,
  LEARNING_RATE: `Model's speed of learning.
	
	Higher: faster but can miss important details.
	Lower: slower but more thorough.`,
  WEIGHT_DECAY: `This helps the model to not focus too much on any single pattern, making it more balanced.
	
	Higher: increases the penalty, more generalization but potentially compromising performance.
	Lower: reduces the penalty, can focus more on the training data.`,
  BATCH_SIZE: `The number of data samples that the model processes in each training step.
	
	Larger: faster training, more memory.
	Smaller: slower training, finer patterns captured.`,
  SAVE_STEPS: `How often the model should store important information during training if save_strategy="steps".
	
	Larger: less memory, less context.
	Smaller: more memory, more context.`,
  EVAL_STEPS: `How often the model's performance is evaluated during training if evaluation_strategy="steps".
	
	Larger: improved accuracy, slower training.
	Smaller: faster training, compromised accuracy.`,
  SAVE_TOTAL_LIMITS: `The maximum amount of context or information it can store while processing text.
	
	Higher: more context, more memory.
	Lower: less context, less memory.`,
  MAXIMUM_LENGTH: `The maximum number of tokens or characters that can be processed in a single output.
	
	Higher: more context, more memory and time.
	Lower: less context, less memory and time.`,
  LOAD_BEST_AT_THE_END: `Whether or not to load the best model found during training at the end of training. When this option is enabled, the best checkpoint will always be saved.`,
  TEMPERATURE: `The level of randomness or creativity in the model's responses.
  
  Higher: more diverse and creative, less coherent.
  Lower: less diverse and creative, more coherent.`,
  TOP_K: `The maximum amount of the vocabulary or choices the model considers for the next word in a sequence.
  
  Higher: more diverse and creative, slower.
  Lower: less diverse and creative, faster.`,
  TOP_P: `How to manage word choices during text generation based on the probability of each word's occurrence.
  
  Higher: more diverse and creative, slower.
  Lower: less diverse and creative, faster.`,
  REPETITION_PENALTY: `The parameter for repetition penalty.
  1.0 means no penalty.`,
  NO_REPEAT_NGRAM_SIZE: `The maximum size of repeating the same group of words.
  If it's 3, it means no sequences of three consecutive words are repeated.`,
  TRAIN_RUNTIME: `The time it takes to train the model.`,
  TRAIN_SAMPLES_PER_SECOND: `How fast the model learns from examples, with a bigger number meaning it learns faster, but it depends on the computer and how it's set up.`,
  TRAIN_STEPS_PER_SECOND: `How fast the model completes training iterations in one second, indicating its training efficiency, with a higher value indicating faster training.`,
  TRAIN_LOSS: `How well the model is performing during training, with lower values indicating better performance and accuracy.`,
} as const;
