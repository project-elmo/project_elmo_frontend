import { useRef, useState } from 'react';
import { MdOutlineAdd, MdOutlineClose } from 'react-icons/md';
import MainTemplate from '@/components/MainTemplate';
import Button from '@/components/Button';

interface Props {
  onNext: () => void;
}

export default function StepDataset({ onNext }: Props) {
  const [datasets, setDatasets] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClickFileUpload = () => {
    fileInput.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const fileArray = Array.from(files);
    console.log(fileArray);
    setDatasets([...datasets, ...fileArray]);
  };

  const handleDeleteFile = (lastModified: number) => {
    const filteredDatasets = datasets.filter(
      (dataset) => dataset.lastModified !== lastModified
    );
    setDatasets(filteredDatasets);
  };

  return (
    <MainTemplate title="Add Datasets" description="json, excel, csv">
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
            {datasets.map((dataset) => (
              <li
                key={dataset.lastModified}
                className="list-file flex justify-between items-center"
              >
                <span>{dataset.name}</span>
                <Button
                  className="w-fit bg-transparent text-primary text-lg"
                  onClick={() => handleDeleteFile(dataset.lastModified)}
                >
                  <MdOutlineClose />
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 text-center">
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>
    </MainTemplate>
  );
}
