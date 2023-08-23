import useFunnel from '@/hooks/useFunnel';
import StepModel from './StepModel';

export default function TrainingPage() {
  const [Funnel, setStep] = useFunnel([
    'model',
    'dataset',
    'parameter',
    'training',
    'done',
  ] as const);

  return (
    <Funnel>
      <Funnel.Step name="model">
        <StepModel onNext={() => setStep('dataset')} />
      </Funnel.Step>
    </Funnel>
  );
}
