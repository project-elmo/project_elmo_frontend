import { useState } from 'react';
import Button from '@/components/Button';
import MainTemplate from '@/components/MainTemplate';
import RadioGroupWithLabel from '@/components/RadioGroupWithLabel';
import SelectWithLabel from '@/components/SelectWithLabel';
import SliderWithLabel from '@/components/SliderWithLabel';
import SwitchWithLabel from '@/components/SwitchWithLabel';
import TextInputWithLabel from '@/components/TextInputWithLabel';

interface Props {
  onNext: () => void;
}

export default function StepParameter({ onNext }: Props) {
  // TODO: 추후 통합 필요
  const [epochs, setEpochs] = useState(3);
  const [saveStrategy, setSaveStrategy] = useState('steps');
  const [loggingStrategy, setLoggingStrategy] = useState('steps');
  const [evaluationStrategy, setEvaluationStrategy] = useState('no');
  const [weightDecay, setWeightDecay] = useState(0);
  const [batchSize, setBatchSize] = useState(8);
  const [evalSteps, setEvalSteps] = useState(500);
  const [saveSteps, setSaveSteps] = useState(500);
  const [saveTotalLimits, setSaveTotalLimits] = useState('unlimited');
  const [runOnGPU, setRunOnGPU] = useState(true);
  const [loadBestAtEnd, setLoadBestAtEnd] = useState(false);

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
              placeholder="gpt2"
              info="Model name info"
            />
            <SliderWithLabel
              id="epochs"
              label="Epochs"
              info="Epochs info"
              value={epochs}
              onValueChange={(nums: number[]) => setEpochs(nums[0])}
            />
          </div>
          <div className="flex">
            <RadioGroupWithLabel
              label="Save Strategy"
              info="Save Strategy info"
              items={['no', 'steps', 'epoch']}
              value={saveStrategy}
              onValueChange={(value: string) => setSaveStrategy(value)}
            />
            <RadioGroupWithLabel
              label="Logging Strategy"
              info="Logging Strategy info"
              items={['no', 'steps', 'epoch']}
              value={loggingStrategy}
              onValueChange={(value: string) => setLoggingStrategy(value)}
            />
            <RadioGroupWithLabel
              label="Evaluation Strategy"
              info="Evaluation Strategy info"
              items={['no', 'steps', 'epoch']}
              value={evaluationStrategy}
              onValueChange={(value: string) => setEvaluationStrategy(value)}
            />
          </div>
          <div className="flex gap-8">
            <TextInputWithLabel
              id="learning-rate"
              label="Learning Rate"
              placeholder="5e-5"
              info="Learning Rate info"
            />
            <SliderWithLabel
              id="weight-decay"
              label="Weight Decay"
              info="Weight Decay info"
              value={weightDecay}
              max={0.1}
              step={0.01}
              onValueChange={(nums: number[]) => setWeightDecay(nums[0])}
            />
          </div>
          <div className="flex gap-8">
            <SelectWithLabel
              label="Batch Size"
              info="Batch Size info"
              items={[2, 4, 8, 16, 32, 64, 128, 256, 512].map(String)}
              value={String(batchSize)}
              onValueChange={(value: string) => setBatchSize(Number(value))}
            />
            <SelectWithLabel
              label="Eval Steps"
              info="Eval Steps info"
              items={[
                1, 5, 10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
              ].map(String)}
              value={String(evalSteps)}
              onValueChange={(value: string) => setEvalSteps(Number(value))}
            />
            <SelectWithLabel
              label="Save Steps"
              info="Save Steps info"
              items={[
                1, 5, 10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
              ].map(String)}
              value={String(saveSteps)}
              onValueChange={(value: string) => setSaveSteps(Number(value))}
            />
            <SelectWithLabel
              label="Save Total Limits"
              info="Save Total Limits info"
              items={['unlimited', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(String)}
              value={String(saveTotalLimits)}
              onValueChange={(value: string) => setSaveTotalLimits(value)}
            />
          </div>
          <div className="flex gap-16">
            <SwitchWithLabel
              id="run-on-gpu"
              label="Run on GPU"
              checked={runOnGPU}
              onCheckedChange={(checked: boolean) => setRunOnGPU(checked)}
            />
            <SwitchWithLabel
              id="load-best-at-end"
              label="Load Best At The End"
              checked={loadBestAtEnd}
              onCheckedChange={(checked: boolean) => setLoadBestAtEnd(checked)}
            />
          </div>
        </div>
        <div className="mt-10 text-center">
          {/* TODO: 클릭 시 API 요청 후 성공하면 다음 단계로 가기 */}
          <Button onClick={onNext}>Start Training!</Button>
        </div>
      </div>
    </MainTemplate>
  );
}
