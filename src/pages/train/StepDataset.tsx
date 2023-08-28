import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDatasets } from '@/api/rest';
import { MdOutlineAdd } from 'react-icons/md';
import MainTemplate from '@/components/MainTemplate';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import Label from '@/components/Label';
import { QUERY_KEYS } from '@/constants';
import { Dataset } from '@/types';

interface Props {
  onNext: () => void;
}

export default function StepDataset({ onNext }: Props) {
  const [datasetFiles, setDatasetFiles] = useState<File[]>([]);
  const [selected, setSelected] = useState<Dataset | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const { data: datasets } = useQuery({
    queryKey: [QUERY_KEYS.DATASETS],
    queryFn: getDatasets,
  });

  const handleClickFileUpload = () => {
    fileInput.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const fileArray = Array.from(files);
    setDatasetFiles([...datasetFiles, ...fileArray]);
  };

  return (
    <MainTemplate
      title="Add Datasets"
      description="Upload dataset files(json, excel, csv) and select one."
    >
      <div>
        <div className="flex flex-col h-96">
          <h4 className="px-6 py-3 font-bold border-2 border-secondary">
            Dataset List
          </h4>
          <ul className="h-full p-5 flex flex-col gap-2 bg-secondary overflow-y-scroll">
            <input
              type="file"
              accept="application/json, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              multiple
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
          </ul>
        </div>
        <div className="mt-6 text-center">
          <Button onClick={onNext} disabled={!selected}>
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
