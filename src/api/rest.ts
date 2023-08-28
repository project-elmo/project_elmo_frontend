import { FineTunedModel, PreTrainedModel, TrainingSession } from '@/types';
import axios from 'axios';

const API_PREFIX = `${import.meta.env.VITE_API_URL}/api`;

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_PREFIX,
});

export const healthCheck = async () => {
  const res = await axios.get('/health');
  return res;
};

export const getPreTrainedModels = async (): Promise<PreTrainedModel[]> => {
  const res = await axiosInstance.get('/training/pretrained_models');
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const downloadModel = async (name: string) => {
  const res = await axiosInstance.get('/training/hub_download', {
    params: { model_name: name },
  });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res;
};

export const getFineTunedModels = async (): Promise<FineTunedModel[]> => {
  const res = await axiosInstance.get('/history/finetuned_models');
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getTrainingSessions = async (
  fmNo: number
): Promise<TrainingSession[]> => {
  const res = await axiosInstance.get(`/history/training_sessions/${fmNo}`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};
