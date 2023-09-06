import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { tree, HierarchyPointNode, stratify } from 'd3';
import ReactFlow, { Node, Edge, Controls, MiniMap } from 'reactflow';
import { MdOutlineAdd, MdOutlineClose } from 'react-icons/md';
import { getTrainingParameter, getTrainingSessions } from '@/api/rest';
import SideNav from '@/components/SideNav';
import FlowNode from '@/components/flow/FlowNode';
import Button from '@/components/Button';
import TextWithLabel from '@/components/TextWithLabel';
import { QUERY_KEYS, ROUTES } from '@/constants';
import { TrainingParameter, TrainingSession } from '@/types';
import 'reactflow/dist/style.css';

const nodeTypes = {
  flowNode: FlowNode,
};

export default function HistoryPage() {
  const { fmNo } = useParams();
  const [selected, setSelected] = useState<TrainingSession | null>(null);
  const [trainingParameter, setTrainingParameter] =
    useState<TrainingParameter | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node<TrainingSession>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const navigate = useNavigate();

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

  const getTrainingParameterMutation = useMutation({
    mutationFn: (sessionNo: number) => getTrainingParameter(sessionNo),
    onSuccess: (data) => setTrainingParameter(data),
  });

  const handleNodeClick = (data: TrainingSession) => {
    getTrainingParameterMutation.mutate(Number(data.session_no));
    setSelected(data);
  };

  const handleCloseRightNav = () => {
    setNodes((prev) => prev.map((node) => ({ ...node, selected: false })));
    setSelected(null);
  };

  const handleClickTrain = () => {
    navigate(ROUTES.TRAINING, {
      state: {
        pmNo: selected?.pm_no,
        fmNo: selected?.fm_no,
        pmName: selected?.pm_name,
        fmName: selected?.fm_name,
        parentSessionNo: selected?.session_no,
      },
    });
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
              onNodeClick={(_, node) => handleNodeClick(node.data)}
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
        <SideNav
          side="right"
          className="flex flex-col justify-between p-1.5 pb-6"
        >
          <div>
            <div className="text-right">
              <Button listStyle onClick={handleCloseRightNav}>
                <MdOutlineClose />
              </Button>
            </div>
            <div className="px-1.5 py-2">
              <TextWithLabel
                label="Trained Model Name"
                value={selected.ts_model_name}
              />
              {trainingParameter && (
                <div className="max-h-[calc(100vh-21rem)] flex flex-col gap-3 mt-3 overflow-y-scroll">
                  <TextWithLabel
                    label="Model Name"
                    value={trainingParameter.model_name}
                  />
                  <TextWithLabel
                    label="Epochs"
                    value={trainingParameter.epochs}
                  />
                  <TextWithLabel
                    label="Save Strategy"
                    value={trainingParameter.save_strategy}
                  />
                  <TextWithLabel
                    label="Logging Strategy"
                    value={trainingParameter.logging_strategy}
                  />
                  <TextWithLabel
                    label="Evaluation Strategy"
                    value={trainingParameter.evaluation_strategy}
                  />
                  <TextWithLabel
                    label="Learning Rate"
                    value={trainingParameter.learning_rate}
                  />
                  <TextWithLabel
                    label="Weight Decay"
                    value={trainingParameter.weight_decay}
                  />
                  <TextWithLabel
                    label="Batch Size"
                    value={trainingParameter.batch_size}
                  />
                  <TextWithLabel
                    label="Eval Steps"
                    value={trainingParameter.eval_steps}
                  />
                  <TextWithLabel
                    label="Save Steps"
                    value={trainingParameter.save_steps}
                  />
                  <TextWithLabel
                    label="Save Total Limits"
                    value={trainingParameter.save_total_limits}
                  />
                  <TextWithLabel
                    label="Run on GPU"
                    value={trainingParameter.run_on_gpu ? 'on' : 'off'}
                  />
                  <TextWithLabel
                    label="Load Best At The End"
                    value={
                      trainingParameter.load_best_at_the_end ? 'on' : 'off'
                    }
                  />
                  {trainingParameter.dataset && (
                    <TextWithLabel
                      label="Dataset"
                      value={trainingParameter.dataset}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="flex justify-center" onClick={handleClickTrain}>
              <MdOutlineAdd className="text-xl" />
              <span>Continue to Train</span>
            </Button>
          </div>
        </SideNav>
      )}
    </main>
  );
}
