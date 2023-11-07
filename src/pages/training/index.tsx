import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFunnel from '@/hooks/useFunnel';
import StepPurpose from '@/pages/training/StepPurpose';
import StepModel from '@/pages/training/StepModel';
import StepDataset from '@/pages/training/StepDataset';
import StepColumn from '@/pages/training/StepColumn';
import StepParameter from '@/pages/training/StepParameter';
import StepTraining from '@/pages/training/StepTraining';
import StepDone from '@/pages/training/StepDone';
import { TRAINING_STEPS } from '@/constants';
import {
  FineTunedModel,
  TrainingForm,
  TrainingResult,
  TrainingSession,
} from '@/types';

export default function TrainingPage() {
  const { state } = useLocation() as {
    state: {
      fmNo?: number;
      parentSessionNo?: string;
      task?: number;
    };
  };
  const [Funnel, setStep] = useFunnel(
    Object.values(TRAINING_STEPS),
    state?.fmNo ? TRAINING_STEPS.DATASET : TRAINING_STEPS.PURPOSE
  );
  const [formData, setFormData] = useState<TrainingForm>({
    pm_no: null,
    fm_no: state?.fmNo ?? undefined,
    fm_name: '',
    ts_model_name: '',
    parent_session_no: state?.parentSessionNo || undefined,
    dataset: '',
    task: state?.task ?? 0,
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
    keys_to_use: ['question', 'answer'],
  });
  const [result, setResult] = useState<TrainingResult | null>(null);
  const [fineTunedModel, setFineTunedModel] = useState<FineTunedModel | null>(
    null
  );
  const [trainingSession, setTrainingSession] =
    useState<TrainingSession | null>(null);

  return (
    <Funnel>
      <Funnel.Step name={TRAINING_STEPS.PURPOSE}>
        <StepPurpose
          onNext={() => setStep(TRAINING_STEPS.MODEL)}
          setFormData={setFormData}
        />
      </Funnel.Step>
      <Funnel.Step name={TRAINING_STEPS.MODEL}>
        <StepModel
          onNext={() => setStep(TRAINING_STEPS.DATASET)}
          setFormData={setFormData}
        />
      </Funnel.Step>
      <Funnel.Step name={TRAINING_STEPS.DATASET}>
        <StepDataset
          onNext={() => setStep(TRAINING_STEPS.COLUMN)}
          setFormData={setFormData}
        />
      </Funnel.Step>
      <Funnel.Step name={TRAINING_STEPS.COLUMN}>
        <StepColumn
          onNext={() => setStep(TRAINING_STEPS.PARAMETER)}
          task={formData.task}
          dataset={formData.dataset}
          setFormData={setFormData}
        />
      </Funnel.Step>
      <Funnel.Step name={TRAINING_STEPS.PARAMETER}>
        <StepParameter
          onNext={() => setStep(TRAINING_STEPS.TRAINING)}
          formData={formData}
          setFormData={setFormData}
          setFineTunedModel={setFineTunedModel}
          setTrainingSession={setTrainingSession}
        />
      </Funnel.Step>
      <Funnel.Step name={TRAINING_STEPS.TRAINING}>
        <StepTraining
          setResult={setResult}
          onNext={() => setStep(TRAINING_STEPS.DONE)}
        />
      </Funnel.Step>
      <Funnel.Step name={TRAINING_STEPS.DONE}>
        <StepDone
          result={result}
          fineTunedModel={fineTunedModel}
          trainingSession={trainingSession}
        />
      </Funnel.Step>
    </Funnel>
  );
}
