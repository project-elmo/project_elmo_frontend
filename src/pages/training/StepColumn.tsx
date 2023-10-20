import { useState } from 'react';
import MainTemplate from '@/components/MainTemplate';
import ListContainer from '@/components/ListContainer';
import SelectWithLabel from '@/components/SelectWithLabel';
import Button from '@/components/Button';

interface Props {
  onNext: () => void;
}

const questions = ['User', 'Question', 'Text', 'Seed'];
const answers = ['Model', 'Answer', 'Label', 'Generated Completion'];

export default function StepColumn({ onNext }: Props) {
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [selectedAnswer, setSelectedAnswer] = useState(answers[0]);
  return (
    <MainTemplate
      title="Select Data Columns/Keys"
      description="To better customize your training, select the appropriate columns (for CSV files) or keys (for JSON files) that correspond to the data you wish to use."
    >
      <ListContainer title="Column name/key for training">
        <SelectWithLabel
          label="{User/Question/Text/Seed}"
          info="info"
          items={questions}
          value={selectedQuestion}
          onValueChange={(value) => setSelectedQuestion(value)}
        />
        <SelectWithLabel
          label="{Model/Answer/Label/Generated Completion}"
          info="info"
          items={answers}
          value={selectedAnswer}
          onValueChange={(value) => setSelectedAnswer(value)}
        />
      </ListContainer>
      <div className="py-6 text-center">
        <Button onClick={onNext}>Next</Button>
      </div>
    </MainTemplate>
  );
}
