import { useEffect, useState } from 'react';
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
import {
  FineTunedModel,
  Parameter,
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
  const [message, setMessage] = useState<string>('');

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
      <div>
        <div className="flex flex-col gap-7">
          <div className="flex gap-8">
            <TextInputWithLabel
              id="model-name"
              label="Model Name"
              placeholder={formData.pm_name}
              value={modelName}
              onChange={({ target }) => setModelName(target.value)}
            />
            <SliderWithLabel
              id="epochs"
              label="Epochs"
              info="One complete round of learning where the model goes through all the training data once. The more rounds, the better the model can learn."
              value={parameter.epochs}
              min={1}
              onValueChange={(nums: number[]) =>
                setParameter((prev) => ({ ...prev, epochs: nums[0] }))
              }
            />
          </div>
          <div className="flex">
            <RadioGroupWithLabel
              label="Save Strategy"
              info={`The checkpoint save strategy to adopt during training.  Possible values are:
              "no": No save is done during training.
              "epoch": Save is done at the end of each epoch.
              "steps": Save is done every save_steps.`}
              items={['no', 'steps', 'epoch']}
              value={parameter.save_strategy}
              onValueChange={(value: string) =>
                setParameter((prev) => ({ ...prev, save_strategy: value }))
              }
            />
            <RadioGroupWithLabel
              label="Logging Strategy"
              info={`The logging strategy to adopt during training. Possible values are:
              "no": No save is done during training.
              "epoch": Save is done at the end of each epoch.
              "steps": Save is done every save_steps.`}
              items={['no', 'steps', 'epoch']}
              value={parameter.logging_strategy}
              onValueChange={(value: string) =>
                setParameter((prev) => ({ ...prev, logging_strategy: value }))
              }
            />
            <RadioGroupWithLabel
              label="Evaluation Strategy"
              info={`The evaluation strategy to adopt during training. Possible values are:
              "no": No evaluation is done during training.
              "steps": Evaluation is done (and logged) every eval_steps.
              "epoch": Evaluation is done at the end of each epoch.`}
              items={['no', 'steps', 'epoch']}
              value={parameter.evaluation_strategy}
              onValueChange={(value: string) =>
                setParameter((prev) => ({
                  ...prev,
                  evaluation_strategy: value,
                }))
              }
            />
          </div>
          <div className="flex gap-8">
            <TextInputWithLabel
              id="learning-rate"
              label="Learning Rate"
              info={`Model's speed of learning. Higher values mean faster learning but can miss important details. Lower values are slower but more thorough.`}
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
              info="This helps the model to not focus too much on any single pattern, making it more balanced."
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
              info="The number of examples the model learns from in each mini-lesson within a round."
              items={[2, 4, 8, 16, 32, 64, 128, 256, 512].map(String)}
              value={String(parameter.batch_size)}
              onValueChange={(value: string) =>
                setParameter((prev) => ({ ...prev, batch_size: Number(value) }))
              }
            />
            <SelectWithLabel
              label="Eval Steps"
              info={`Number of update steps between two evaluations if evaluation_strategy="steps".`}
              items={[
                1, 5, 10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
              ].map(String)}
              value={String(parameter.eval_steps)}
              onValueChange={(value: string) =>
                setParameter((prev) => ({ ...prev, eval_steps: Number(value) }))
              }
            />
            <SelectWithLabel
              label="Save Steps"
              info={`Number of updates steps before two checkpoint saves if save_strategy="steps".`}
              items={[
                1, 5, 10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
              ].map(String)}
              value={String(parameter.save_steps)}
              onValueChange={(value: string) =>
                setParameter((prev) => ({ ...prev, save_steps: Number(value) }))
              }
            />
            <SelectWithLabel
              label="Save Total Limits"
              info={`If a value is passed, will limit the total amount of checkpoints.`}
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
              info={`The maximum length the generated tokens can have.`}
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
                info={`Whether or not to load the best model found during training at the end of training. When this option is enabled, the best checkpoint will always be saved.`}
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
        <div className="pb-6 text-center">
          <p className="w-full h-8 mb-2 flex justify-center items-end text-red-400 text-sm">
            {message}
          </p>
          <Button disabled={!!message} onClick={handleClickTraining}>
            Start Training!
          </Button>
        </div>
      </div>
    </MainTemplate>
  );
}
