import { useState } from 'react';
import MainTemplate from '@/components/MainTemplate';
import ListContainer from '@/components/ListContainer';
import RadioAccordion from '@/components/RadioAccordion';
import Button from '@/components/Button';
import { AccordionItem, TrainingForm } from '@/types';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<TrainingForm>>;
  onNext: () => void;
}

export default function StepPurpose({ setFormData, onNext }: Props) {
  const [selected, setSelected] = useState(purposes[0].task);
  const items: AccordionItem[] = purposes.map((purpose) => ({
    id: String(purpose.task),
    header: purpose.header,
    content: <AccordionContentItem purpose={purpose} />,
  }));

  const handleNext = () => {
    setFormData((prev) => ({
      ...prev,
      task: selected,
    }));
    onNext();
  };

  return (
    <MainTemplate
      title="Select Purpose"
      description="Select the purpose of your model"
    >
      <ListContainer title="Choose your purpose:">
        <RadioAccordion
          items={items}
          value={String(selected)}
          onValueChange={(value) => setSelected(Number(value))}
        />
      </ListContainer>
      <div className="py-6 text-center">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </MainTemplate>
  );
}

const AccordionContentItem = ({ purpose }: { purpose: Purpose }) => {
  return (
    <div className="flex flex-col gap-2">
      <p>{purpose.description}</p>
      <p>
        <span className="font-semibold">Data Requirement: </span>
        {purpose.dataRequirement}
      </p>
      <div className="font-semibold">
        <span>Example: </span>
        <p className="mt-1 p-3 rounded bg-gray-100 whitespace-pre">
          {purpose.example}
        </p>
      </div>
    </div>
  );
};

type Purpose = {
  task: number;
  header: string;
  description: string;
  dataRequirement: string;
  example: string;
};

const purposes: Purpose[] = [
  {
    task: 0,
    header: 'Chatbots & Conversational Agents',
    description: `A chatbot simulates human-like conversations, enabling interactions with users in a conversational manner. It's designed to assist, guide, or engage users in a dynamic dialogue.`,
    dataRequirement: `For training a chatbot, you typically need a dataset of conversational exchanges. This consists of pairs of user inputs and the desired bot responses. The data doesn't necessarily rely on a specific context.`,
    example: `User: "Hello, how are you?"\nBot: "Hello! I'm doing well. How can I assist you today?"`,
  },
  {
    task: 1,
    header: 'Text Classification',
    description: `Text classification involves categorizing text into predefined labels or groups. It's widely used to structure data, understand sentiment, detect spam, or classify documents into specific topics.`,
    dataRequirement: `For training a text classification model, you need a dataset containing text samples and their corresponding labels. The text could be a sentence, a paragraph, or even a document.`,
    example: `Text: "The movie was a thrilling adventure from start to finish."\nLabel: "Positive"`,
  },
];
