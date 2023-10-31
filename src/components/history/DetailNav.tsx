import { useNavigate } from 'react-router-dom';
import { MdOutlineClose, MdOutlineAdd } from 'react-icons/md';
import Button from '@/components/Button';
import SideNav from '@/components/SideNav';
import TextWithLabel from '@/components/TextWithLabel';
import { API_PREFIX, ROUTES } from '@/constants';
import { TrainingParameter, TrainingSession } from '@/types';

interface Props {
  trainingSession: TrainingSession;
  trainingParameter: TrainingParameter;
  onClose: () => void;
}

export default function DetailNav({
  trainingSession,
  trainingParameter,
  onClose,
}: Props) {
  const navigate = useNavigate();

  const handleClickTrain = () => {
    navigate(ROUTES.TRAINING, {
      state: {
        fmNo: trainingSession.fm_no,
        parentSessionNo: trainingSession.session_no,
        task: trainingParameter?.task,
      },
    });
  };

  return (
    <SideNav side="right" className="flex flex-col justify-between p-1.5 pb-6">
      <div>
        <div className="text-right">
          <Button listStyle onClick={onClose}>
            <MdOutlineClose />
          </Button>
        </div>
        <div className="px-1.5 py-2">
          <TextWithLabel
            label="Trained Model Name"
            value={trainingSession.ts_model_name}
          />
          <div className="max-h-[calc(100vh-21rem)] flex flex-col gap-3 mt-3 overflow-y-scroll">
            <TextWithLabel
              label="Model Name"
              value={trainingParameter.model_name}
            />
            <TextWithLabel
              label="Purpose"
              value={trainingParameter.task === 0 ? 'QA' : 'Classification'}
            />
            <TextWithLabel
              label="Dataset"
              value={trainingParameter.dataset}
              link={`${API_PREFIX}/training${trainingParameter.dataset_download_link}`}
            />
            <TextWithLabel
              label="Train Loss"
              value={trainingParameter.train_loss}
            />
            <TextWithLabel label="Epochs" value={trainingParameter.epochs} />
            <TextWithLabel
              label="Save Strategy"
              value={trainingParameter.save_strategy}
            />
            <TextWithLabel
              label="Logging Strategy"
              value={trainingParameter.logging_strategy}
            />
            <TextWithLabel
              label="Evaluation Strategy"
              value={trainingParameter.evaluation_strategy}
            />
            <TextWithLabel
              label="Learning Rate"
              value={trainingParameter.learning_rate}
            />
            <TextWithLabel
              label="Weight Decay"
              value={trainingParameter.weight_decay}
            />
            <TextWithLabel
              label="Batch Size"
              value={trainingParameter.batch_size}
            />
            <TextWithLabel
              label="Eval Steps"
              value={trainingParameter.eval_steps}
            />
            <TextWithLabel
              label="Save Steps"
              value={trainingParameter.save_steps}
            />
            <TextWithLabel
              label="Save Total Limits"
              value={trainingParameter.save_total_limits}
            />
            <TextWithLabel
              label="Run on GPU"
              value={trainingParameter.run_on_gpu ? 'on' : 'off'}
            />
            <TextWithLabel
              label="Load Best At The End"
              value={trainingParameter.load_best_at_the_end ? 'on' : 'off'}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="flex justify-center" onClick={handleClickTrain}>
          <MdOutlineAdd className="text-xl" />
          <span>Continue to Train</span>
        </Button>
      </div>
    </SideNav>
  );
}
