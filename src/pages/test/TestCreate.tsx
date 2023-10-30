import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTest, getTrainingSessions } from '@/api/rest';
import MainTemplate from '@/components/MainTemplate';
import CheckBox from '@/components/CheckBox';
import Label from '@/components/Label';
import Button from '@/components/Button';
import { QUERY_KEYS, ROUTES } from '@/constants';
import { Test, TrainingSession } from '@/types';

interface Props {
  fmNo: number;
}

export default function TestCreate({ fmNo }: Props) {
  const [selected, setSelected] = useState<TrainingSession[]>([]);
  const tests = useRef<Test[]>([]);
  const navigate = useNavigate();

  const { data: sessions } = useQuery({
    queryKey: [QUERY_KEYS.TRAINING_SESSIONS, fmNo],
    queryFn: () => getTrainingSessions(fmNo),
  });

  const createTestMutation = useMutation({
    mutationFn: createTest,
    onSuccess: (data) => {
      tests.current.push(data);
      if (tests.current.length === selected.length) {
        const testNoParam = tests.current
          .map((t) => t.test_no)
          .join('&testNo=');
        const testsObj = tests.current.reduce(
          (a, v) => ({ ...a, [v.test_no]: v.ts_model_name }),
          {}
        );
        navigate(`${ROUTES.TEST.INDEX}/${fmNo}?testNo=${testNoParam}`, {
          state: { tests: testsObj },
        });
      }
    },
  });

  const handleClickStartTest = () => {
    selected.forEach((session) => {
      createTestMutation.mutate(Number(session.session_no));
    });
  };

  return (
    <MainTemplate
      title="Select Training Session"
      description="Select one or two training sessions to test."
    >
      <ul className="h-96 p-5 flex flex-col gap-2 bg-secondary overflow-y-scroll">
        {sessions?.map((session) => {
          const isSelected = selected.some(
            (s) => s.session_no === session.session_no
          );
          return (
            <TrainingSessionItem
              key={session.session_no}
              session={session}
              checked={isSelected}
              onCheckedChange={() => {
                if (isSelected) {
                  setSelected(
                    selected.filter((s) => s.session_no !== session.session_no)
                  );
                } else {
                  if (selected.length === 2) return;
                  setSelected([...selected, session]);
                }
              }}
            />
          );
        })}
      </ul>
      <div className="py-6 text-center">
        <Button onClick={handleClickStartTest} disabled={!selected.length}>
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
    <li key={session.session_no} className="list">
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
