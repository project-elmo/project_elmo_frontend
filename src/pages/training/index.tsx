import { useEffect, useState } from 'react';
import useFunnel from '@/hooks/useFunnel';
import StepModel from '@/pages/training/StepModel';
import StepDataset from '@/pages/training/StepDataset';
import StepParameter from '@/pages/training/StepParameter';
import StepTraining from '@/pages/training/StepTraining';
import StepDone from '@/pages/training/StepDone';
import { PreTrainedTrainingForm, TrainingResult } from '@/types';

export default function TrainingPage() {
  const [Funnel, setStep] = useFunnel([
    'model',
    'dataset',
    'parameter',
    'training',
    'done',
  ] as const);
  const [formData, setFormData] = useState<PreTrainedTrainingForm>({
    pm_no: null,
    pm_name: '',
    fm_name: '',
    ts_model_name: '',
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
    run_on_gpu: true,
    load_best_at_the_end: false,
  });
  const [result, setResult] = useState<TrainingResult | null>(null);

  useEffect(() => {
    if (!result) return;
    setStep('done');
  }, [result]);

  return (
    <Funnel>
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
        />
      </Funnel.Step>
      <Funnel.Step name="training">
        <StepTraining
          loggingStrategy={formData.logging_strategy}
          setResult={setResult}
        />
      </Funnel.Step>
      <Funnel.Step name="done">
        <StepDone result={result} />
      </Funnel.Step>
    </Funnel>
  );
}
