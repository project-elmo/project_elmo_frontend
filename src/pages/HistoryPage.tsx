import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tree, HierarchyPointNode, stratify } from 'd3';
import ReactFlow, { Node, Edge, Controls, MiniMap } from 'reactflow';
import { MdOutlineAdd, MdOutlineClose } from 'react-icons/md';
import { getTrainingSessions } from '@/api/rest';
import SideNav from '@/components/SideNav';
import FlowNode from '@/components/flow/FlowNode';
import TextInputWithLabel from '@/components/TextInputWithLabel';
import Button from '@/components/Button';
import { QUERY_KEYS } from '@/constants';
import { TrainingSession } from '@/types';
import 'reactflow/dist/style.css';

const nodeTypes = {
  flowNode: FlowNode,
};

export default function HistoryPage() {
  const { fmNo } = useParams();
  const [selected, setSelected] = useState<TrainingSession | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node<TrainingSession>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

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
  }, [fmNo, wrapperRef, sessions]);

  const handleCloseRightNav = () => {
    setNodes((prev) => prev.map((node) => ({ ...node, selected: false })));
    setSelected(null);
  };

  return (
    <main className="flex-1 flex">
      <section className="flex-1 text-center h-full">
        <div
          ref={wrapperRef}
          className="max-w-screen-md m-auto h-full overflow-hidden"
        >
          {fmNo && nodes ? (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              defaultEdgeOptions={{
                focusable: false,
                interactionWidth: 0,
              }}
              onNodeClick={(_, node) => setSelected(node.data)}
              onEdgeClick={() => {}}
              fitView
            >
              <Controls showInteractive={false} />
              <MiniMap />
            </ReactFlow>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-line">
              <h3>Please select a model.</h3>
              <p>
                Or click
                <span className="mx-2 font-semibold">
                  <MdOutlineAdd className="inline-block" /> New Model
                </span>
                and start training your own LLM.
              </p>
            </div>
          )}
        </div>
      </section>
      {selected && (
        <SideNav side="right" className="p-1.5">
          <div className="text-right">
            <Button listStyle onClick={handleCloseRightNav}>
              <MdOutlineClose />
            </Button>
          </div>
          <div className="px-1.5 py-2">
            <TextInputWithLabel
              id="trained-model-name"
              label="Trained Model Name"
              value={selected.ts_model_name}
              onChange={() => {}}
            />
            {/* TODO: 다른 설정 값 받아와서 노출 */}
          </div>
          <div className="mt-6 flex justify-center">
            <Button className="flex justify-center">
              <MdOutlineAdd className="text-xl" />
              <span>Continue to Train</span>
            </Button>
          </div>
        </SideNav>
      )}
    </main>
  );
}
