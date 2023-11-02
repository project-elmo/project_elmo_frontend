import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChatHistory } from '@/api/rest';
import { QUERY_KEYS } from '@/constants';
import { TestMessage } from '@/types';

interface Props {
  testNo: number;
  name: string;
}

export default function Chat({ testNo, name }: Props) {
  const messageRef = useRef<HTMLDivElement>(null);

  const { data: messages } = useQuery({
    queryKey: [QUERY_KEYS.CHAT_HISTORY, String(testNo)],
    queryFn: () => getChatHistory(testNo),
  });

  const scrollToBottom = () => {
    if (!messageRef.current) return;
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className="flex-1">
      {name && (
        <p className="p-2 text-center bg-secondary border-b-2 border-line text-sm font-semibold">
          {name}
        </p>
      )}
      {messages?.length ? (
        <div
          ref={messageRef}
          className={`${
            name ? 'h-[calc(100vh-8.5rem)]' : 'h-[calc(100vh-6.125rem)]'
          } overflow-y-scroll`}
        >
          <ul className="h-full flex flex-col gap-2.5 text-left">
            {messages.map((message) => (
              <MessageItem
                key={`${testNo}-${message.msg_no}`}
                message={message}
              />
            ))}
            <div className="w-full py-12"></div>
          </ul>
        </div>
      ) : (
        <div className="w-full text-center text-line">
          <h3 className="pt-24">ELMO</h3>
        </div>
      )}
    </section>
  );
}

interface MessageItemProps {
  message: TestMessage;
}

function MessageItem({ message }: MessageItemProps) {
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
