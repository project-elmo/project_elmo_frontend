import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Node } from 'reactflow';
import HistoryMain from '@/pages/history/HistoryMain';
import HistoryDetail from '@/pages/history/HistoryDetail';
import DetailNav from '@/components/history/DetailNav';
import { TrainingParameter, TrainingSession } from '@/types';
import 'reactflow/dist/style.css';

export default function HistoryPage() {
  const { fmNo } = useParams();
  const [selected, setSelected] = useState<TrainingSession | null>(null);
  const [trainingParameter, setTrainingParameter] =
    useState<TrainingParameter | null>(null);
  const [nodes, setNodes] = useState<Node<TrainingSession>[]>([]);

  return (
    <main className="flex-1 flex">
      <section className="flex-1 text-center h-full">
        {fmNo ? (
          <HistoryDetail
            fmNo={fmNo}
            nodes={nodes}
            setNodes={setNodes}
            setSelected={setSelected}
            setTrainingParameter={setTrainingParameter}
          />
        ) : (
          <HistoryMain />
        )}
      </section>
      {selected && trainingParameter && (
        <DetailNav
          trainingSession={selected}
          trainingParameter={trainingParameter}
          onClose={() => {
            setNodes((prev) =>
              prev.map((node) => ({ ...node, selected: false }))
            );
            setSelected(null);
          }}
        />
      )}
    </main>
  );
}
