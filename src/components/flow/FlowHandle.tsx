import { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface FlowHandleProps {
  type: 'source' | 'target';
  position: Position;
}

function FlowHandle({ type, position }: FlowHandleProps) {
  return (
    <Handle
      type={type}
      position={position}
      isConnectable={false}
      className="bg-transparent border-0"
    />
  );
}

export default memo(FlowHandle);
