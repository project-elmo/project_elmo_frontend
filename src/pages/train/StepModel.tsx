import { useState } from 'react';
import { MdDownload } from 'react-icons/md';
import Button from '@/components/Button';
import MainTemplate from '@/components/MainTemplate';
import CheckBox from '@/components/CheckBox';
import Label from '@/components/Label';

interface Props {
  onNext: () => void;
}

// TODO: 나중에 API 호출 후 대체
type Model = {
  id: number;
  name: string;
  description: string;
  downloaded: boolean;
};
const models: Model[] = [
  {
    id: 1,
    name: 'skt/kogpt2-base-v2',
    description: 'KoGPT2',
    downloaded: false,
  },
  {
    id: 2,
    name: 'gpt2',
    description: 'GPT2',
    downloaded: true,
  },
  {
    id: 3,
    name: 'meta-llama/Llama-2-7b',
    description: 'Llama',
    downloaded: false,
  },
  {
    id: 4,
    name: 'meta-llama/Llama-2-13b-hf',
    description: 'Llama',
    downloaded: false,
  },
  {
    id: 5,
    name: 'meta-llama/Llama-2-13b-hf1',
    description: 'Llama',
    downloaded: false,
  },
  {
    id: 6,
    name: 'meta-llama/Llama-2-13b-hf2',
    description: 'Llama',
    downloaded: false,
  },
  {
    id: 7,
    name: 'meta-llama/Llama-2-13b-hf3',
    description: 'Llama',
    downloaded: false,
  },
  {
    id: 8,
    name: 'meta-llama/Llama-2-13b-hf4',
    description: 'Llama',
    downloaded: false,
  },
];

export default function StepModel({ onNext }: Props) {
  const [selected, setSelected] = useState<Model | null>(null);

  return (
    <MainTemplate
      title="Select Model"
      description="Select pre-trained model to train."
    >
      <div>
        <div className="w-full h-96 flex gap-1.5">
          <div className="flex flex-col basis-3/5">
            <h4 className="px-6 py-3 font-bold bg-secondary">Models</h4>
            <ul className="h-full border border-line overflow-y-scroll">
              {models.map((model) => (
                <ModelListItem
                  key={model.id}
                  model={model}
                  checked={selected?.id === model.id}
                  onCheckedChange={() => setSelected(model)}
                />
              ))}
            </ul>
          </div>
          <div className="flex-1 p-4 border border-line">
            {selected ? (
              <>
                <p className="text-xs">
                  {/* TODO: 다운로드를 마치지 않은 모델은 어떻게 할지 정하기 */}
                  {selected?.downloaded ? 'Downloaded' : 'Downloading'}
                </p>
                <h3 className="my-2 text-2xl">{selected.name}</h3>
                <p>{selected.description}</p>
              </>
            ) : (
              <p>Please select a model.</p>
            )}
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>
    </MainTemplate>
  );
}

interface ModelListItemProps {
  model: Model;
  checked: boolean;
  onCheckedChange: () => void;
}

const ModelListItem = ({
  model,
  checked,
  onCheckedChange,
}: ModelListItemProps) => {
  const onClickListItem = () => {
    onCheckedChange();
    // TODO: 모델 다운로드 여부 확인 후 없으면 다운로드
  };

  return (
    <li
      className="flex justify-between items-center p-3 border-b border-line cursor-pointer"
      onClick={onClickListItem}
    >
      <div className="flex gap-4 items-center">
        <CheckBox
          id={model.name}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          id={model.name}
          label={model.name}
          className={`text-sm cursor-pointer ${
            !model.downloaded && 'text-line'
          }`}
        ></Label>
      </div>
      {!model.downloaded && <MdDownload className="text-line" />}
    </li>
  );
};
