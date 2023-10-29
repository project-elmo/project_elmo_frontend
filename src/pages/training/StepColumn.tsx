import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDataKeys } from '@/api/rest';
import MainTemplate from '@/components/MainTemplate';
import ListContainer from '@/components/ListContainer';
import SelectWithLabel from '@/components/SelectWithLabel';
import Button from '@/components/Button';
import { TrainingForm } from '@/types';

interface Props {
  task: number;
  dataset: string;
  setFormData: React.Dispatch<React.SetStateAction<TrainingForm>>;
  onNext: () => void;
}

export default function StepColumn({
  task,
  dataset,
  setFormData,
  onNext,
}: Props) {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const { data: columns } = useQuery({
    queryKey: ['dataset', dataset],
    queryFn: () => getDataKeys(dataset),
  });

  const handleNext = () => {
    if (!selectedQuestion || !selectedAnswer) return;
    setFormData((prev) => ({
      ...prev,
      dataset,
      keys_to_use: [selectedQuestion, selectedAnswer],
    }));
    onNext();
  };

  return (
    <MainTemplate
      title="Select Data Columns/Keys"
      description="To better customize your training, select the appropriate columns (for CSV files) or keys (for JSON files) that correspond to the data you wish to use."
    >
      <ListContainer title="Column name/key for training">
        {columns && (
          <>
            <SelectWithLabel
              label={task === 0 ? 'Question' : 'Text'}
              info="info"
              items={columns}
              value={selectedQuestion || undefined}
              placeholder="Select a column/key"
              onValueChange={(value) => setSelectedQuestion(value)}
            />
            <SelectWithLabel
              label={task === 0 ? 'Answer' : 'Label'}
              info="info"
              items={columns}
              value={selectedAnswer || undefined}
              placeholder="Select a column/key"
              onValueChange={(value) => setSelectedAnswer(value)}
            />
          </>
        )}
      </ListContainer>
      <div className="py-6 text-center">
        <Button
          onClick={handleNext}
          disabled={!selectedAnswer || !selectedQuestion}
        >
          Next
        </Button>
      </div>
    </MainTemplate>
  );
}
