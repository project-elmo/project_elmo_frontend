import { useNavigate } from 'react-router-dom';
import MainTemplate from '@/components/MainTemplate';
import Label from '@/components/Label';
import Button from '@/components/Button';
import { INFOS, ROUTES } from '@/constants';
import { FineTunedModel, TrainingResult, TrainingSession } from '@/types';

interface Props {
  result: TrainingResult | null;
  fineTunedModel: FineTunedModel | null;
  trainingSession: TrainingSession | null;
}

export default function StepDone({
  result,
  fineTunedModel,
  trainingSession,
}: Props) {
  const navigate = useNavigate();
  const isRetrain = !!trainingSession;

  return (
    <MainTemplate title="Done!">
      <div className="mt-2">
        {result && (
          <div className="list-container p-6">
            <div className="flex gap-48">
              <ResultItem label="Model Name" value={result.model_name} />
              <ResultItem
                label="Train Loss"
                value={result.train_loss}
                info={INFOS.TRAIN_LOSS}
              />
            </div>
            <ResultItem
              label="Train Runtime"
              value={result.train_runtime}
              info={INFOS.TRAIN_RUNTIME}
            />
            <ResultItem
              label="Train Samples Per Second"
              value={result.train_samples_per_second}
              info={INFOS.TRAIN_SAMPLES_PER_SECOND}
            />
            <ResultItem
              label="Train Steps Per Second"
              value={result.train_steps_per_second}
              info={INFOS.TRAIN_STEPS_PER_SECOND}
            />
            <ResultItem
              label="Epoch"
              value={result.epoch}
              info={INFOS.EPOCHS}
            />
          </div>
        )}
        <div className="py-12 text-center">
          <Button
            onClick={() =>
              navigate(
                `${ROUTES.HISTORY.INDEX}/${
                  isRetrain ? trainingSession.fm_no : fineTunedModel?.fm_no
                }`
              )
            }
          >
            Go History
          </Button>
        </div>
      </div>
    </MainTemplate>
  );
}

interface ResultItemProps {
  label: string;
  value: string | number;
  info?: string;
}

function ResultItem({ label, value, info }: ResultItemProps) {
  return (
    <div className="flex flex-col">
      <Label label={label} info={info} />
      <p>{value}</p>
    </div>
  );
}
