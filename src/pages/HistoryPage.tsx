import { useEffect, useRef, useState } from 'react';
import { tree, HierarchyPointNode, stratify } from 'd3';
import ReactFlow, { Node, Edge, Controls, MiniMap } from 'reactflow';
import { MdOutlineAdd, MdOutlineClose } from 'react-icons/md';
import SideNav from '@/components/SideNav';
import FlowNode from '@/components/flow/FlowNode';
import TextInputWithLabel from '@/components/TextInputWithLabel';
import Button from '@/components/Button';
import 'reactflow/dist/style.css';

// TODO: API 개발 후 타입 재정의
export interface Data {
  id: string;
  name: string;
  description: string;
  parentId: string;
}

const nodeTypes = {
  flowNode: FlowNode,
};

export default function HistoryPage() {
  const [data, setData] = useState<Data[]>([
    {
      id: '1',
      name: 'meta-llama/Llama-2-7b',
      description: 'step100, loss 0.24345',
      parentId: '',
    },
    {
      id: '2',
      name: '재훈련모델 1',
      description: 'step120, loss 0.24345',
      parentId: '1',
    },
    {
      id: '3',
      name: '재훈련모델 2',
      description: 'step120, loss 0.24345',
      parentId: '1',
    },
    {
      id: '4',
      name: '재훈련모델 2',
      description: 'step120, loss 0.24345',
      parentId: '2',
    },
  ]);
  const [selected, setSelected] = useState<Data | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node<Data>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const root = stratify<Data>()
      .id((d) => d.id)
      .parentId((d) => d.parentId)(data);
    const layout = tree<Data>().nodeSize([width, height])(root);
    const newNodes = (layout.descendants() as HierarchyPointNode<Data>[]).map(
      (node) => ({
        id: node.data.id,
        type: 'flowNode',
        data: node.data,
        position: { x: node.x * 0.6, y: node.depth * height * 0.2 },
      })
    );
    const newEdges = layout.links().map((link, i) => ({
      id: `e-${i}`,
      source: link.source.id!,
      target: link.target.id!,
      type: 'straight',
    }));
    setNodes([...newNodes]);
    setEdges([...newEdges]);
  }, [data, wrapperRef]);

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
              value={selected?.name}
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
