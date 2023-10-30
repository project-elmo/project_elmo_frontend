import { getPdfFiles, uploadPdf } from '@/api/rest';
import { QUERY_KEYS, INFOS, API_PREFIX } from '@/constants';
import { Dataset, TestMessageForm } from '@/types';
import { formatNumber } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import {
  MdOutlineClose,
  MdOutlineAdd,
  MdOutlineChevronLeft,
  MdDownload,
} from 'react-icons/md';
import Button from '../Button';
import CheckBox from '../CheckBox';
import Label from '../Label';
import RadioGroupWithLabel from '../RadioGroupWithLabel';
import SideNav from '../SideNav';
import SliderWithLabel from '../SliderWithLabel';
import SwitchWithLabel from '../SwitchWithLabel';
import TextInputWithLabel from '../TextInputWithLabel';

interface Props {
  formData: TestMessageForm;
  setFormData: React.Dispatch<React.SetStateAction<TestMessageForm>>;
}

export default function ParamNav({ formData, setFormData }: Props) {
  const [showParamsNav, setShowParamsNav] = useState(true);
  const [isUsePdf, setIsUsePdf] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: files } = useQuery({
    queryKey: [QUERY_KEYS.PDF_FILES],
    queryFn: getPdfFiles,
  });

  const uploadPdfMutation = useMutation({
    mutationFn: uploadPdf,
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEYS.PDF_FILES]),
  });

  const handleClickFileUpload = () => {
    fileInput.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    uploadPdfMutation.mutate(files[0]);
  };

  return (
    <>
      {showParamsNav ? (
        <SideNav side="right">
          <div className="text-right">
            <Button listStyle onClick={() => setShowParamsNav(false)}>
              <MdOutlineClose />
            </Button>
          </div>
          <div className="max-h-[calc(100vh-10rem)] p-4 overflow-y-scroll">
            <SliderWithLabel
              id="maximum-length"
              label="Maximum Length"
              info={INFOS.MAXIMUM_LENGTH}
              value={formData.max_length}
              max={512}
              min={10}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, max_length: value[0] }))
              }
            />
            <SliderWithLabel
              id="temperature"
              label="Temperature"
              info={INFOS.TEMPERATURE}
              value={formData.temperature}
              max={2}
              step={0.1}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, temperature: value[0] }))
              }
            />
            <TextInputWithLabel
              id="top-k"
              label="Top K"
              info={INFOS.TOP_K}
              value={formData.top_k}
              className="mb-4"
              onChange={({ target }) =>
                setFormData((prev) => ({
                  ...prev,
                  top_k: formatNumber(target.value),
                }))
              }
            />
            <SliderWithLabel
              id="top-p"
              label="Top P"
              info={INFOS.TOP_P}
              value={formData.top_p}
              max={2}
              step={0.1}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, top_p: value[0] }))
              }
            />
            <SliderWithLabel
              id="repetition-penalty"
              label="Repetition Penalty"
              info={INFOS.REPETITION_PENALTY}
              value={formData.repetition_penalty}
              min={1}
              max={2}
              step={0.1}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  repetition_penalty: value[0],
                }))
              }
            />
            <TextInputWithLabel
              id="no-repeat-ngram-size"
              label="No Repeat N-gram Size"
              info={INFOS.NO_REPEAT_NGRAM_SIZE}
              value={formData.no_repeat_ngram_size}
              className="mb-4"
              onChange={({ target }) =>
                setFormData((prev) => ({
                  ...prev,
                  no_repeat_ngram_size: formatNumber(target.value),
                }))
              }
            />
            <SwitchWithLabel
              label="Use PDF"
              id="use-pdf"
              checked={isUsePdf}
              className="font-semibold"
              onCheckedChange={(checked) => {
                setIsUsePdf(checked);
                setFormData((prev) => ({ ...prev, pdf_file_name: '' }));
              }}
            />
            {isUsePdf && (
              <ul className="flex flex-col gap-2 py-2 text-sm">
                <div className="mb-2">
                  <RadioGroupWithLabel
                    label="Language"
                    info="Select the language of the PDF file."
                    items={['English', 'Korean']}
                    value={formData.lang === 'eng' ? 'English' : 'Korean'}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        lang: value === 'English' ? 'eng' : 'ko',
                      }))
                    }
                  />
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  ref={fileInput}
                  onChange={handleFileChange}
                />
                <Button className="list" onClick={handleClickFileUpload}>
                  <MdOutlineAdd className="m-auto text-lg" />
                </Button>
                {files?.map((file) => (
                  <PdflListItem
                    key={file.filename}
                    file={file}
                    checked={formData.pdf_file_name === file.filename}
                    onCheckedChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        pdf_file_name:
                          formData.pdf_file_name === file.filename
                            ? ''
                            : file.filename,
                      }))
                    }
                  />
                ))}
              </ul>
            )}
          </div>
        </SideNav>
      ) : (
        <Button
          listStyle
          onClick={() => setShowParamsNav(true)}
          className="absolute right-0 m-1.5 z-10 shadow-md pr-5"
        >
          <div className="flex gap-1">
            <MdOutlineChevronLeft />
            Params
          </div>
        </Button>
      )}
    </>
  );
}

interface PdfListItemProps {
  file: Dataset;
  checked: boolean;
  onCheckedChange: () => void;
}

const PdflListItem = ({ file, checked, onCheckedChange }: PdfListItemProps) => {
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
};
