import { useEffect, useRef, useState } from 'react';
import MainTemplate from '@/components/MainTemplate';
import Progress from '@/components/Progress';
import Spinner from '@/components/Spinner';
import { connectSocket } from '@/utils';
import { SOCKET_API_URL } from '@/constants';
import { SocketProgress, TrainingLog, TrainingResult } from '@/types';

interface Props {
  setResult: React.Dispatch<React.SetStateAction<TrainingResult | null>>;
  onNext: () => void;
}

export default function StepTraining({ setResult, onNext }: Props) {
  const [progress, setProgress] = useState<SocketProgress | null>(null);
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (socket.current) return;

    const handleSocketMessage = (data: string) => {
      const parsed = JSON.parse(data);
      if (parsed.task === 'task_result') {
        socket.current?.close();
        setResult(parsed as TrainingResult);
        onNext();
      } else if (parsed.task === 'training') {
        setProgress(parsed as SocketProgress);
      } else if (parsed.task === 'training_log') {
        setLogs((prev) => [...prev, parsed as TrainingLog]);
      }
    };

    socket.current = connectSocket(SOCKET_API_URL, handleSocketMessage);
  }, []);

  return (
    <MainTemplate title="Training . . .">
      <div className="w-full h-96 mt-4 p-3 bg-secondary overflow-y-scroll">
        {progress ? (
          <>
            <div className="flex items-center gap-3">
              <Progress value={progress.curr_percent} />
              <p className="flex-1 text-sm">
                [{progress.curr_size}/{progress.total} {progress.end_time}]
              </p>
            </div>

            {logs.length && (
              <ul className="flex flex-col gap-2.5 p-5 text-sm">
                <li className="flex">
                  <span className="w-24">Epoch</span>
                  <span className="w-28">Training Loss</span>
                  <span className="w-28">Learning Rate</span>
                </li>
                {logs.map((log) => (
                  <li className="flex" key={`${log.epoch}`}>
                    <span className="w-24">{log.epoch}</span>
                    <span className="w-28">{log.loss}</span>
                    <span className="w-28">{Number(log.learning_rate)}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <Spinner className="w-full h-full flex items-center justify-center" />
        )}
      </div>
    </MainTemplate>
  );
}
