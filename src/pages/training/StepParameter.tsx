import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { retrainModel, trainPreTrainedModel } from '@/api/rest';
import Button from '@/components/Button';
import MainTemplate from '@/components/MainTemplate';
import RadioGroupWithLabel from '@/components/RadioGroupWithLabel';
import SelectWithLabel from '@/components/SelectWithLabel';
import SliderWithLabel from '@/components/SliderWithLabel';
import SwitchWithLabel from '@/components/SwitchWithLabel';
import TextInputWithLabel from '@/components/TextInputWithLabel';
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
    learning_rate: 5e-5,
    weight_decay: 0,
    batch_size: 8,
    eval_steps: 500,
    save_steps: 500,
    save_total_limits: -1,
    load_best_at_the_end: false,
  });

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
      learning_rate: parameter.learning_rate,
      weight_decay: parameter.weight_decay,
      batch_size: parameter.batch_size,
      eval_steps: parameter.eval_steps,
      save_steps: parameter.save_steps,
      save_total_limits: parameter.save_total_limits,
      run_on_gpu: parameter.run_on_gpu,
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
              info="Model name info"
              placeholder={formData.pm_name}
              value={modelName}
              onChange={({ target }) => setModelName(target.value)}
            />
            <SliderWithLabel
              id="epochs"
              label="Epochs"
              info="Epochs info"
              value={parameter.epochs}
              onValueChange={(nums: number[]) =>
                setParameter((prev) => ({ ...prev, epochs: nums[0] }))
              }
            />
          </div>
          <div className="flex">
            <RadioGroupWithLabel
              label="Save Strategy"
              info="Save Strategy info"
              items={['no', 'steps', 'epoch']}
              value={parameter.save_strategy}
              onValueChange={(value: string) =>
                setParameter((prev) => ({ ...prev, save_strategy: value }))
              }
            />
            <RadioGroupWithLabel
              label="Logging Strategy"
              info="Logging Strategy info"
              items={['no', 'steps', 'epoch']}
              value={parameter.logging_strategy}
              onValueChange={(value: string) =>
                setParameter((prev) => ({ ...prev, logging_strategy: value }))
              }
            />
            <RadioGroupWithLabel
              label="Evaluation Strategy"
              info="Evaluation Strategy info"
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
              info="Learning Rate info"
              value={String(parameter.learning_rate)}
              onChange={({ target }) =>
                setParameter((prev) => ({
                  ...prev,
                  learning_rate: Number(target.value),
                }))
              }
            />
            <SliderWithLabel
              id="weight-decay"
              label="Weight Decay"
              info="Weight Decay info"
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
              info="Batch Size info"
              items={[2, 4, 8, 16, 32, 64, 128, 256, 512].map(String)}
              value={String(parameter.batch_size)}
              onValueChange={(value: string) =>
                setParameter((prev) => ({ ...prev, batch_size: Number(value) }))
              }
            />
            <SelectWithLabel
              label="Eval Steps"
              info="Eval Steps info"
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
              info="Save Steps info"
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
              info="Save Total Limits info"
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
          <SwitchWithLabel
            id="load-best-at-end"
            label="Load Best At The End"
            checked={parameter.load_best_at_the_end}
            onCheckedChange={(checked: boolean) =>
              setParameter((prev) => ({
                ...prev,
                load_best_at_the_end: checked,
              }))
            }
          />
        </div>
        <div className="py-6 text-center">
          <Button onClick={handleClickTraining}>Start Training!</Button>
        </div>
      </div>
    </MainTemplate>
  );
}
