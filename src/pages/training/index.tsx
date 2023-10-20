import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFunnel from '@/hooks/useFunnel';
import StepModel from '@/pages/training/StepModel';
import StepDataset from '@/pages/training/StepDataset';
import StepParameter from '@/pages/training/StepParameter';
import StepTraining from '@/pages/training/StepTraining';
import StepDone from '@/pages/training/StepDone';
import {
  FineTunedModel,
  TrainingForm,
  TrainingResult,
  TrainingSession,
} from '@/types';
import StepPurpose from './StepPurpose';

export default function TrainingPage() {
  const { state } = useLocation() as {
    state: {
      pmNo?: number;
      pmName?: string;
      fmNo?: number;
      fmName?: string;
      parentSessionNo?: string;
    };
  };
  const [Funnel, setStep] = useFunnel(
    ['purpose', 'model', 'dataset', 'parameter', 'training', 'done'] as const,
    state?.fmNo ? 'dataset' : 'purpose'
  );
  const [formData, setFormData] = useState<TrainingForm>({
    pm_no: state?.pmNo ?? null,
    pm_name: state?.pmName || '',
    fm_no: state?.fmNo ?? undefined,
    fm_name: state?.fmName || '',
    ts_model_name: '',
    parent_session_no: state?.parentSessionNo || undefined,
    dataset: '',
    task: 0,
    epochs: 3,
    save_strategy: 'steps',
    logging_strategy: 'steps',
    evaluation_strategy: 'no',
    learning_rate: 5e-5,
    weight_decay: 0,
    batch_size: 8,
    eval_steps: 500,
    save_steps: 500,
    save_total_limits: -1,
    max_length: 512,
    load_best_at_the_end: false,
  });
  const [result, setResult] = useState<TrainingResult | null>(null);
  const [fineTunedModel, setFineTunedModel] = useState<FineTunedModel | null>(
    null
  );
  const [trainingSession, setTrainingSession] =
    useState<TrainingSession | null>(null);

  useEffect(() => {
    if (!result) return;
    setStep('done');
  }, [result]);

  return (
    <Funnel>
      <Funnel.Step name="purpose">
        <StepPurpose onNext={() => setStep('model')} />
      </Funnel.Step>
      <Funnel.Step name="model">
        <StepModel
          onNext={() => setStep('dataset')}
          setFormData={setFormData}
        />
      </Funnel.Step>
      <Funnel.Step name="dataset">
        <StepDataset
          onNext={() => setStep('parameter')}
          setFormData={setFormData}
        />
      </Funnel.Step>
      <Funnel.Step name="parameter">
        <StepParameter
          onNext={() => setStep('training')}
          formData={formData}
          setFormData={setFormData}
          setFineTunedModel={setFineTunedModel}
          setTrainingSession={setTrainingSession}
        />
      </Funnel.Step>
      <Funnel.Step name="training">
        <StepTraining
          loggingStrategy={formData.logging_strategy}
          setResult={setResult}
        />
      </Funnel.Step>
      <Funnel.Step name="done">
        <StepDone
          result={result}
          fineTunedModel={fineTunedModel}
          trainingSession={trainingSession}
        />
      </Funnel.Step>
    </Funnel>
  );
}
