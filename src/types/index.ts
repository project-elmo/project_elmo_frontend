export type PreTrainedModel = {
  pm_no: number;
  name: string;
  description: string;
  version: string;
  base_model: string;
  is_downloaded: boolean;
};

export type SocketProgress = {
  task: string;
  model_name: string;
  total: string;
  curr_size: string;
  curr_percent: number;
  start_time: string;
  end_time: string;
  sec_per_dl: string;
};

export type TrainingLog = {
  task: string;
  model_name: string;
  loss: string;
  learning_rate: string;
  epoch: string;
};

export type TrainingResult = {
  task: string;
  model_name: string;
  train_runtime: number;
  train_samples_per_second: number;
  train_steps_per_second: number;
  train_loss: number;
  epoch: number;
};

export type FineTunedModel = {
  fm_no: number;
  fm_name: string;
  user_no?: number;
  pm_no?: number;
  pm_name?: string;
  fm_description?: string;
  list_sessions?: TrainingSession[];
  list_test?: Test[];
};

export type TrainingSession = {
  session_no: string;
  fm_no: number;
  fm_name: string;
  pm_no: number;
  pm_name: string;
  parent_session_no: string;
  start_time: string;
  end_time: string;
  ts_model_name: string;
};

export interface Parameter {
  epochs: number;
  save_strategy: string;
  logging_strategy: string;
  evaluation_strategy: string;
  learning_rate: number | string;
  weight_decay: number;
  batch_size: number;
  eval_steps: number;
  save_steps: number;
  save_total_limits: number;
  run_on_gpu?: boolean;
  load_best_at_the_end: boolean;
  max_length: number;
}

export interface TrainingParameter extends Parameter {
  parameter_no: number;
  session_no: number;
  fm_no: number;
  model_name: string;
  dataset: string;
  task: number;
  train_loss: number;
  dataset_download_link: string;
}

export type Dataset = {
  file_path: string;
  size: number;
  filename: string;
  extension: string;
  download_link: string;
};

export interface TrainingForm extends Parameter {
  pm_no: number | null;
  fm_no?: number;
  fm_name: string;
  parent_session_no?: string;
  ts_model_name: string;
  dataset: string;
  task: number;
  keys_to_use: string[];
}

export type Test = {
  test_no: number;
  session_no: number;
  ts_model_name: string;
  fm_no: number;
  fm_name: string;
};

export type TestMessage = {
  msg_no: number;
  msg: string;
  created_at: string;
  is_user: boolean;
  test_no: number;
};

export type TestMessageForm = {
  test_no: number;
  task: number;
  msg: string;
  max_length: number;
  temperature: number;
  top_k: string;
  top_p: number;
  repetition_penalty: number;
  no_repeat_ngram_size: string;
  pdf_file_name: string;
  lang: 'eng' | 'ko';
};

export type MenuItem = {
  name: string;
  to: string;
  selected: boolean;
};

export type Setting = {
  model_path: string;
  result_path: string;
  is_gpu_use: boolean;
  is_gpu_available?: boolean;
};

export type AccordionItem = {
  id: string;
  header: string;
  content: React.ReactNode;
};
