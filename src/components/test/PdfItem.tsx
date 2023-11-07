import { MdDownload } from 'react-icons/md';
import CheckBox from '@/components/CheckBox';
import Label from '@/components/Label';
import { API_PREFIX } from '@/constants';
import { Dataset } from '@/types';

interface Props {
  file: Dataset;
  checked: boolean;
  onCheckedChange: () => void;
}

export default function PdfItem({ file, checked, onCheckedChange }: Props) {
  return (
    <li key={file.filename} className="list">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-4">
          <CheckBox
            id={file.filename}
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
          <Label
            id={file.filename}
            label={file.filename}
            isSide
            className="font-normal cursor-pointer text-xs"
          ></Label>
        </div>
        <a href={`${API_PREFIX}/test${file.download_link}`} className="p-2">
          <MdDownload />
        </a>
      </div>
    </li>
  );
}
