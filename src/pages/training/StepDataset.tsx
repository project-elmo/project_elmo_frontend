import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDatasets, uploadDatasets } from '@/api/rest';
import { MdOutlineAdd } from 'react-icons/md';
import MainTemplate from '@/components/MainTemplate';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import Label from '@/components/Label';
import { QUERY_KEYS } from '@/constants';
import { Dataset, TrainingForm } from '@/types';
import ListContainer from '@/components/ListContainer';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<TrainingForm>>;
  onNext: () => void;
}

export default function StepDataset({ setFormData, onNext }: Props) {
  const [selected, setSelected] = useState<Dataset | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: datasets } = useQuery({
    queryKey: [QUERY_KEYS.DATASETS],
    queryFn: getDatasets,
  });

  const uploadDatasetMutation = useMutation({
    mutationFn: uploadDatasets,
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEYS.DATASETS]),
  });

  const handleClickFileUpload = () => {
    fileInput.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    uploadDatasetMutation.mutate(files[0]);
  };

  const handleNext = () => {
    if (!selected) return;
    setFormData((prev) => ({
      ...prev,
      dataset: selected.file_path,
    }));
    onNext();
  };

  return (
    <MainTemplate
      title="Add Datasets"
      description="Upload dataset files(json, csv) and select one."
    >
      <div>
        <ListContainer title="Dataset List">
          <input
            type="file"
            accept="application/json, .csv"
            className="hidden"
            ref={fileInput}
            onChange={handleFileChange}
          />
          <Button className="list-file" onClick={handleClickFileUpload}>
            <MdOutlineAdd className="m-auto text-lg" />
          </Button>
          {datasets?.map((dataset) => (
            <DatasetlListItem
              key={dataset.filename}
              dataset={dataset}
              checked={selected?.filename === dataset.filename}
              onCheckedChange={() =>
                setSelected(selected === dataset ? null : dataset)
              }
            />
          ))}
        </ListContainer>
        <div className="py-6 text-center">
          <Button onClick={handleNext} disabled={!selected}>
            Next
          </Button>
        </div>
      </div>
    </MainTemplate>
  );
}

interface DatasetListItemProps {
  dataset: Dataset;
  checked: boolean;
  onCheckedChange: () => void;
}

const DatasetlListItem = ({
  dataset,
  checked,
  onCheckedChange,
}: DatasetListItemProps) => {
  return (
    <li
      key={dataset.filename}
      className="list-file flex justify-between items-center"
    >
      <div className="flex gap-4 items-center">
        <CheckBox
          id={dataset.filename}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          id={dataset.filename}
          label={dataset.filename}
          isSide
          className="font-normal"
        ></Label>
      </div>
    </li>
  );
};
