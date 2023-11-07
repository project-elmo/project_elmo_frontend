import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { retrainModel, trainPreTrainedModel } from '@/api/rest';
import Button from '@/components/Button';
import MainTemplate from '@/components/MainTemplate';
import RadioGroupWithLabel from '@/components/RadioGroupWithLabel';
import SelectWithLabel from '@/components/SelectWithLabel';
import SliderWithLabel from '@/components/SliderWithLabel';
import SwitchWithLabel from '@/components/SwitchWithLabel';
import TextInputWithLabel from '@/components/TextInputWithLabel';
import { formatNumber } from '@/utils';
import { INFOS } from '@/constants';
import {
  FineTunedModel,
  Parameter,
  Strategy,
  TrainingForm,
  TrainingSession,
} from '@/types';

interface Props {
  formData: TrainingForm;
  setFormData: React.Dispatch<React.SetStateAction<TrainingForm>>;
  setFineTunedModel: React.Dispatch<
    React.SetStateAction<FineTunedModel | null>
  >;
  setTrainingSession: React.Dispatch<
    React.SetStateAction<TrainingSession | null>
  >;
  onNext: () => void;
}

export default function StepParameter({
  formData,
  setFormData,
  setFineTunedModel,
  setTrainingSession,
  onNext,
}: Props) {
  const [modelName, setModelName] = useState<string>('');
  const [parameter, setParameter] = useState<Parameter>({
    epochs: 3,
    save_strategy: 'steps',
    logging_strategy: 'steps',
    evaluation_strategy: 'no',
    learning_rate: '0.00005',
    weight_decay: 0,
    batch_size: 8,
    eval_steps: 500,
    save_steps: 500,
    save_total_limits: -1,
    max_length: 512,
    load_best_at_the_end: false,
  });
  const [message, setMessage] = useState<string>(
    'Model name should not be empty.'
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (!parameter.load_best_at_the_end && modelName) {
      setMessage('');
      return;
    }
    if (!modelName) {
      setMessage('Model name should not be empty.');
      return;
    }
    if (parameter.save_strategy !== parameter.evaluation_strategy) {
      setMessage(
        'Save strategy and evaluation strategy should be the same when load best at the end is true.'
      );
      return;
    }
    if (
      parameter.save_strategy === 'steps' &&
      parameter.save_steps % parameter.eval_steps != 0
    ) {
      setMessage(
        'Save steps should be a multiple of eval steps when load best at the end is true and save strategy is steps.'
      );
      return;
    }
    setMessage('');
  }, [parameter, modelName]);

  const trainPreTrainedModelMutation = useMutation({
    mutationFn: trainPreTrainedModel,
    onSuccess: (data) => setFineTunedModel(data),
  });

  const retrainModelMutation = useMutation({
    mutationFn: retrainModel,
    onSuccess: (data) => setTrainingSession(data),
  });

  const handleClickTraining = () => {
    setFormData((prev) => ({
      ...prev,
    }));
    const newFormData = {
      ...formData,
      fm_name: formData.fm_no ? formData.fm_name : modelName,
      ts_model_name: modelName,
      epochs: parameter.epochs,
      save_strategy: parameter.save_strategy,
      logging_strategy: parameter.logging_strategy,
      evaluation_strategy: parameter.evaluation_strategy,
      learning_rate: Number(parameter.learning_rate),
      weight_decay: parameter.weight_decay,
      batch_size: parameter.batch_size,
      eval_steps: parameter.eval_steps,
      save_steps: parameter.save_steps,
      save_total_limits: parameter.save_total_limits,
      max_length: parameter.max_length,
      load_best_at_the_end: parameter.load_best_at_the_end,
    };
    formData.fm_no
      ? retrainModelMutation.mutate(newFormData)
      : trainPreTrainedModelMutation.mutate(newFormData);
    onNext();
  };

  return (
    <MainTemplate
      title="Set Parameters"
      description="Set parameters to train your LLM."
    >
      <div className="flex gap-8 mb-4">
        <TextInputWithLabel
          id="model-name"
          label="Model Name"
          value={modelName}
          onChange={({ target }) => setModelName(target.value)}
          inputRef={inputRef}
        />
        <SliderWithLabel
          id="epochs"
          label="Epochs"
          info={INFOS.EPOCHS}
          value={parameter.epochs}
          min={1}
          onValueChange={(nums: number[]) =>
            setParameter((prev) => ({ ...prev, epochs: nums[0] }))
          }
        />
      </div>

      <details>
        <summary className="text-sm font-semibold cursor-pointer">
          Advanced
        </summary>
        <div className="flex flex-col gap-6 pt-4 px-4 bg-gray-50">
          <div className="flex">
            <RadioGroupWithLabel
              label="Save Strategy"
              info={INFOS.SAVE_STRATEGY}
              items={['no', 'steps', 'epoch']}
              value={parameter.save_strategy}
              onValueChange={(value) =>
                setParameter((prev) => ({
                  ...prev,
                  save_strategy: value as Strategy,
                }))
              }
            />
            <RadioGroupWithLabel
              label="Logging Strategy"
              info={INFOS.LOGGING_STRATEGY}
              items={['no', 'steps', 'epoch']}
              value={parameter.logging_strategy}
              onValueChange={(value: string) =>
                setParameter((prev) => ({
                  ...prev,
                  logging_strategy: value as Strategy,
                }))
              }
            />
            <RadioGroupWithLabel
              label="Evaluation Strategy"
              info={INFOS.EVALUATION_STRATEGY}
              items={['no', 'steps', 'epoch']}
              value={parameter.evaluation_strategy}
              onValueChange={(value: string) =>
                setParameter((prev) => ({
                  ...prev,
                  evaluation_strategy: value as Strategy,
                }))
              }
            />
          </div>
          <div className="flex gap-8">
            <TextInputWithLabel
              id="learning-rate"
              label="Learning Rate"
              info={INFOS.LEARNING_RATE}
              value={String(parameter.learning_rate)}
              onChange={({ target }) =>
                setParameter((prev) => ({
                  ...prev,
                  learning_rate: formatNumber(target.value),
                }))
              }
            />
            <SliderWithLabel
              id="weight-decay"
              label="Weight Decay"
              info={INFOS.WEIGHT_DECAY}
              value={parameter.weight_decay}
              max={0.1}
              step={0.01}
              onValueChange={(nums: number[]) =>
                setParameter((prev) => ({ ...prev, weight_decay: nums[0] }))
              }
            />
          </div>
          <div className="flex gap-8">
            <SelectWithLabel
              label="Batch Size"
              info={INFOS.BATCH_SIZE}
              items={[2, 4, 8, 16, 32, 64, 128, 256, 512].map(String)}
              value={String(parameter.batch_size)}
              onValueChange={(value: string) =>
                setParameter((prev) => ({
                  ...prev,
                  batch_size: Number(value),
                }))
              }
            />
            <SelectWithLabel
              label="Save Steps"
              info={INFOS.SAVE_STEPS}
              items={[
                1, 5, 10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
              ].map(String)}
              value={String(parameter.save_steps)}
              onValueChange={(value: string) =>
                setParameter((prev) => ({
                  ...prev,
                  save_steps: Number(value),
                }))
              }
            />
            <SelectWithLabel
              label="Eval Steps"
              info={INFOS.EVAL_STEPS}
              items={[
                1, 5, 10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
              ].map(String)}
              value={String(parameter.eval_steps)}
              onValueChange={(value: string) =>
                setParameter((prev) => ({
                  ...prev,
                  eval_steps: Number(value),
                }))
              }
            />
            <SelectWithLabel
              label="Save Total Limits"
              info={INFOS.SAVE_TOTAL_LIMITS}
              items={['unlimited', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(String)}
              value={
                parameter.save_total_limits === -1
                  ? 'unlimited'
                  : String(parameter.save_total_limits)
              }
              onValueChange={(value: string) =>
                setParameter((prev) => ({
                  ...prev,
                  save_total_limits: value === 'unlimited' ? -1 : Number(value),
                }))
              }
            />
          </div>
          <div className="flex gap-8 items-center">
            <SliderWithLabel
              id="maximum-length"
              label="Maximum Length"
              info={INFOS.MAXIMUM_LENGTH}
              value={parameter.max_length}
              min={1}
              max={512}
              onValueChange={(nums: number[]) =>
                setParameter((prev) => ({ ...prev, max_length: nums[0] }))
              }
            />
            <div className="w-full">
              <SwitchWithLabel
                id="load-best-at-end"
                label="Load Best At The End"
                info={INFOS.LOAD_BEST_AT_THE_END}
                checked={parameter.load_best_at_the_end}
                onCheckedChange={(checked: boolean) =>
                  setParameter((prev) => ({
                    ...prev,
                    load_best_at_the_end: checked,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </details>
      <div className="pb-6 text-center">
        <p className="w-full h-8 mb-2 flex justify-center items-end text-red-400 text-sm">
          {message}
        </p>
        <Button disabled={!!message} onClick={handleClickTraining}>
          Start Training!
        </Button>
      </div>
    </MainTemplate>
  );
}
