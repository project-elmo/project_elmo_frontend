import Button from '@/components/Button';
import MainTemplate from '@/components/MainTemplate';
import Progress from '@/components/Progress';

interface Props {
  onNext: () => void;
}

// TODO: API 호출한 데이터로 교체
const data = [
  { step: 10, loss: 2.4153 },
  { step: 20, loss: 2.4153 },
  { step: 30, loss: 2.4153 },
  { step: 40, loss: 2.4153 },
  { step: 50, loss: 2.4153 },
  { step: 60, loss: 2.4153 },
  { step: 70, loss: 2.4153 },
  { step: 80, loss: 2.4153 },
  { step: 90, loss: 2.4153 },
  { step: 90, loss: 2.4153 },
  { step: 90, loss: 2.4153 },
  { step: 90, loss: 2.4153 },
  { step: 90, loss: 2.4153 },
  { step: 90, loss: 2.4153 },
];

export default function StepTraining({ onNext }: Props) {
  // TODO: 과정이 끝나면 onNext 호출

  return (
    <MainTemplate title="Training . . .">
      <div className="w-full h-96 mt-4 p-3 bg-secondary overflow-y-scroll">
        <div className="flex items-center gap-3">
          <Progress value={70} />
          <p className="flex-1 text-sm">[50/50 03:00, Epoch 2/2]</p>
        </div>
        <ul className="flex flex-col gap-2.5 p-5">
          <li className="flex">
            <span className="w-20">Step</span>
            <span>Training Loss</span>
          </li>
          {data.map((item) => (
            <li className="flex">
              <span className="w-20">{item.step}</span>
              <span>{item.loss}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 text-center">
        <Button onClick={onNext}>Done</Button>
      </div>
    </MainTemplate>
  );
}
