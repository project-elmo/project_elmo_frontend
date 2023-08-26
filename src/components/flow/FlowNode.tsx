import { memo } from 'react';
import { Position } from 'reactflow';
import FlowHandle from '@/components/flow/FlowHandle';
import { Data } from '@/pages/HistoryPage';

interface Props {
  data: Data;
  selected: boolean;
}

function FlowNode({ data, selected }: Props) {
  return (
    <>
      <FlowHandle type="target" position={Position.Top} />
      <div
        className={`w-60 h-20 flex flex-col justify-center bg-secondary rounded-md shadow-md shadow-line/40 text-sm ${
          selected && 'border-2 border-primary'
        }`}
      >
        <p className="font-bold">{data.name}</p>
        <p>{data.description}</p>
      </div>
      <FlowHandle type="source" position={Position.Bottom} />
    </>
  );
}

export default memo(FlowNode);
