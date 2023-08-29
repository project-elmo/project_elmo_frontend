import { useNavigate } from 'react-router-dom';
import MainTemplate from '@/components/MainTemplate';
import Button from '@/components/Button';
import { ROUTES } from '@/constants';
import { TrainingResult } from '@/types';

interface Props {
  result: TrainingResult | null;
}

export default function StepDone({ result }: Props) {
  const navigate = useNavigate();

  return (
    <MainTemplate title="Done!">
      <div className="mt-2">
        {result && (
          <div className="w-full p-6 flex flex-col gap-3 bg-secondary">
            <ResultItem label="Model Name" value={result.model_name} />
            <ResultItem label="Train Runtime" value={result.train_runtime} />
            <ResultItem
              label="Train Samples Per Second"
              value={result.train_samples_per_second}
            />
            <ResultItem
              label="Train Steps Per Second"
              value={result.train_steps_per_second}
            />
            <ResultItem label="Train Loss" value={result.train_loss} />
            <ResultItem label="Epoch" value={result.epoch} />
          </div>
        )}
        <div className="mt-12 text-center">
          <Button onClick={() => navigate(ROUTES.MAIN)}>Go History</Button>
        </div>
      </div>
    </MainTemplate>
  );
}

interface ResultItemProps {
  label: string;
  value: string | number;
}

function ResultItem({ label, value }: ResultItemProps) {
  return (
    <div className="flex flex-col">
      <h4 className="text-sm font-semibold mb-1">{label}</h4>
      <p>{value}</p>
    </div>
  );
}
