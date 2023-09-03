import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTest, getTrainingSessions } from '@/api/rest';
import MainTemplate from '@/components/MainTemplate';
import CheckBox from '@/components/CheckBox';
import Label from '@/components/Label';
import Button from '@/components/Button';
import { QUERY_KEYS, ROUTES } from '@/constants';
import { TrainingSession } from '@/types';

interface Props {
  fmNo: number;
}

export default function TestCreate({ fmNo }: Props) {
  const [selected, setSelected] = useState<TrainingSession | null>(null);
  const navigate = useNavigate();

  const { data: sessions } = useQuery({
    queryKey: [QUERY_KEYS.TRAINING_SESSIONS, fmNo],
    queryFn: () => getTrainingSessions(fmNo),
  });

  const createTestMutation = useMutation({
    mutationFn: createTest,
    onSuccess: (data) =>
      navigate(`${ROUTES.TEST.INDEX}/${fmNo}/${data.test_no}`),
  });

  const handleClickStartTest = () => {
    if (!selected) return;
    createTestMutation.mutate(Number(selected.session_no));
  };

  return (
    <MainTemplate
      title="Select Training Session"
      description="Select a training session to test"
    >
      <ul className="h-96 p-5 flex flex-col gap-2 bg-secondary overflow-y-scroll">
        {sessions?.map((session) => (
          <TrainingSessionItem
            key={session.session_no}
            session={session}
            checked={selected?.session_no === session.session_no}
            onCheckedChange={() =>
              setSelected(
                selected?.session_no === session.session_no ? null : session
              )
            }
          />
        ))}
      </ul>
      <div className="py-6 text-center">
        <Button onClick={handleClickStartTest} disabled={!selected}>
          Start test
        </Button>
      </div>
    </MainTemplate>
  );
}

interface TrainingSessionItemProps {
  session: TrainingSession;
  checked: boolean;
  onCheckedChange: () => void;
}

function TrainingSessionItem({
  session,
  checked,
  onCheckedChange,
}: TrainingSessionItemProps) {
  return (
    <li
      key={session.session_no}
      className="list-file flex justify-between items-center"
    >
      <div className="flex gap-4 items-center">
        <CheckBox
          id={session.session_no}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          id={session.session_no}
          label={session.ts_model_name}
          isSide
          className="font-normal"
        ></Label>
      </div>
    </li>
  );
}
