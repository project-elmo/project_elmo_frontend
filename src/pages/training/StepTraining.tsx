import { useEffect, useRef, useState } from 'react';
import MainTemplate from '@/components/MainTemplate';
import Progress from '@/components/Progress';
import Spinner from '@/components/Spinner';
import { capitalizeFirstLetter, connectSocket } from '@/utils';
import { SOCKET_API_URL } from '@/constants';
import { SocketProgress, TrainingResult } from '@/types';

interface Props {
  loggingStrategy: string;
  setResult: React.Dispatch<React.SetStateAction<TrainingResult | null>>;
}

export default function StepTraining({ loggingStrategy, setResult }: Props) {
  const [progresses, setProgresses] = useState<SocketProgress[]>([]);
  const socket = useRef<WebSocket | null>(null);
  const lastProgress = progresses[progresses.length - 1];

  const handleSocketMessage = (data: string) => {
    const parsed = JSON.parse(data);
    if (parsed.task === 'task_result') {
      setResult(parsed as TrainingResult);
      socket.current?.close();
    } else {
      setProgresses((prev) => [...prev, parsed as SocketProgress]);
    }
  };

  useEffect(() => {
    if (socket.current) return;
    socket.current = connectSocket(SOCKET_API_URL, handleSocketMessage);
  }, []);

  return (
    <MainTemplate title="Training . . .">
      <div className="w-full h-96 mt-4 p-3 bg-secondary overflow-y-scroll">
        {progresses.length ? (
          <>
            <div className="flex items-center gap-3">
              <Progress value={lastProgress.curr_percent} />
              <p className="flex-1 text-sm">
                [{lastProgress.curr_size}/{lastProgress.total}{' '}
                {lastProgress.end_time}]
              </p>
            </div>
            <ul className="flex flex-col gap-2.5 p-5">
              <li className="flex">
                <span className="w-20">
                  {capitalizeFirstLetter(loggingStrategy)}
                </span>
              </li>
              {progresses.map((progress) => (
                <li
                  className="flex"
                  key={`${progress.curr_size}${progress.start_time}`}
                >
                  <span className="w-20">{progress.curr_size}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Spinner className="w-full h-full flex items-center justify-center" />
        )}
      </div>
    </MainTemplate>
  );
}
