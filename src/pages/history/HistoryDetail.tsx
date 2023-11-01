import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { stratify, tree, HierarchyPointNode } from 'd3';
import ReactFlow, { Controls, Edge, MiniMap, Node } from 'reactflow';
import { getTrainingParameter, getTrainingSessions } from '@/api/rest';
import FlowNode from '@/components/flow/FlowNode';
import { QUERY_KEYS } from '@/constants';
import { TrainingParameter, TrainingSession } from '@/types';

const nodeTypes = {
  flowNode: FlowNode,
};

interface Props {
  fmNo: string;
  nodes: Node<TrainingSession>[];
  setNodes: React.Dispatch<React.SetStateAction<Node<TrainingSession>[]>>;
  setSelected: React.Dispatch<React.SetStateAction<TrainingSession | null>>;
  setTrainingParameter: React.Dispatch<
    React.SetStateAction<TrainingParameter | null>
  >;
}

export default function HistoryDetail({
  fmNo,
  nodes,
  setNodes,
  setSelected,
  setTrainingParameter,
}: Props) {
  const [edges, setEdges] = useState<Edge[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: sessions } = useQuery({
    queryKey: [QUERY_KEYS.TRAINING_SESSIONS, fmNo],
    queryFn: () => getTrainingSessions(Number(fmNo)),
    enabled: !!fmNo,
  });

  useEffect(() => {
    if (!fmNo || !wrapperRef.current || !sessions) return;
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const root = stratify<TrainingSession>()
      .id((d) => d.session_no)
      .parentId((d) => d.parent_session_no)(sessions);
    const layout = tree<TrainingSession>().nodeSize([width, height])(root);
    const newNodes = (
      layout.descendants() as HierarchyPointNode<TrainingSession>[]
    ).map((node) => ({
      id: node.data.session_no,
      type: 'flowNode',
      data: node.data,
      position: { x: node.x * 0.6, y: node.depth * height * 0.2 },
    }));
    const newEdges = layout.links().map((link, i) => ({
      id: `e-${i}`,
      source: link.source.id!,
      target: link.target.id!,
      type: 'straight',
    }));
    setNodes([...newNodes]);
    setEdges([...newEdges]);
  }, [fmNo, sessions, setNodes]);

  const getTrainingParameterMutation = useMutation({
    mutationFn: (sessionNo: number) => getTrainingParameter(sessionNo),
    onSuccess: (data) => setTrainingParameter(data),
  });

  const handleNodeClick = (data: TrainingSession) => {
    getTrainingParameterMutation.mutate(Number(data.session_no));
    setSelected(data);
  };

  return (
    <div
      ref={wrapperRef}
      className="max-w-screen-md m-auto h-full overflow-hidden"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          focusable: false,
          interactionWidth: 0,
        }}
        onNodeClick={(_, node) => handleNodeClick(node.data)}
        onEdgeClick={() => {}}
        fitView
      >
        <Controls showInteractive={false} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
