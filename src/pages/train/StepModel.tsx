import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdDownload } from 'react-icons/md';
import { getPreTrainedModels } from '@/api/rest';
import Button from '@/components/Button';
import MainTemplate from '@/components/MainTemplate';
import CheckBox from '@/components/CheckBox';
import Label from '@/components/Label';
import { QUERY_KEYS } from '@/constants';
import { PreTrainedModel } from '@/types';

interface Props {
  onNext: () => void;
}

export default function StepModel({ onNext }: Props) {
  const [selected, setSelected] = useState<PreTrainedModel | null>(null);

  const { data: models } = useQuery({
    queryKey: [QUERY_KEYS.PRE_TRAINED_MODELS],
    queryFn: getPreTrainedModels,
  });

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
              {models?.map((model) => (
                <ModelListItem
                  key={model.pm_no}
                  model={model}
                  checked={selected?.pm_no === model.pm_no}
                  onCheckedChange={() =>
                    setSelected(selected === model ? null : model)
                  }
                />
              ))}
            </ul>
          </div>
          <div className="flex-1 p-4 border border-line overflow-y-scroll">
            {selected ? (
              <>
                <p className="text-xs mb-2">
                  {selected?.downloaded ? 'Downloaded' : 'Downloading'}
                </p>
                <h3 className="text-2xl mb-2">{selected.name}</h3>
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
  model: PreTrainedModel;
  checked: boolean;
  onCheckedChange: () => void;
}

const ModelListItem = ({
  model,
  checked,
  onCheckedChange,
}: ModelListItemProps) => {
  const onClickDownload = () => {
    onCheckedChange();
    // TODO: 모델 다운로드 여부 확인 후 없으면 다운로드
  };

  return (
    <li className="flex justify-between items-center p-3 border-b border-line">
      <div className="flex gap-4 items-center">
        <CheckBox
          id={model.name}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          id={model.name}
          label={model.name}
          isSide
          className={`font-normal ${!model.downloaded && 'text-line'}`}
        ></Label>
      </div>
      <Button
        className="w-fit p-0 bg-transparent text-line font"
        onClick={onClickDownload}
      >
        {!model.downloaded && <MdDownload />}
      </Button>
    </li>
  );
};
