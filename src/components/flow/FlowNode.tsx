import { memo } from 'react';
import { Position } from 'reactflow';
import FlowHandle from '@/components/flow/FlowHandle';
import { TrainingSession } from '@/types';

interface Props {
  data: TrainingSession;
  selected: boolean;
}

function FlowNode({ data, selected }: Props) {
  return (
    <>
      <FlowHandle type="target" position={Position.Top} />
      <div
        className={`w-60 h-20 p-4 flex flex-col justify-center bg-secondary rounded-md shadow-md shadow-line/40 text-sm break-words ${
          selected && 'border-2 border-primary'
        }`}
      >
        <p className="font-bold">{data.ts_model_name}</p>
      </div>
      <FlowHandle type="source" position={Position.Bottom} />
    </>
  );
}

export default memo(FlowNode);
