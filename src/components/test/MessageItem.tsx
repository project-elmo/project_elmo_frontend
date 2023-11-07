import { TestMessage } from '@/types';

interface Props {
  message: TestMessage;
}

export default function MessageItem({ message }: Props) {
  return (
    <li
      className={`w-full whitespace-pre-line p-4 ${
        !message.is_user && 'bg-neutral-100 border-y border-line'
      }`}
    >
      <div className="max-w-screen-md m-auto flex gap-4">
        <span>{message.is_user ? '👤' : '🤖'}</span>
        <p>{message.msg}</p>
      </div>
    </li>
  );
}
