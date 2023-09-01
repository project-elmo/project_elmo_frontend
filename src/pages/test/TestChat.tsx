import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChatHistory } from '@/api/rest';
import { MdSend } from 'react-icons/md';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';
import { QUERY_KEYS } from '@/constants';
import { ChatMessage } from '@/types';

interface Props {
  testNo: number;
}

export default function TestChat({ testNo }: Props) {
  const [text, setText] = useState('');

  const { data: messages } = useQuery({
    queryKey: [QUERY_KEYS.CHAT_HISTORY, String(testNo)],
    queryFn: () => getChatHistory(testNo),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setText('');
      // TODO: API 요청
    }
  };

  return (
    <>
      {messages?.length ? (
        <div className="h-[calc(100vh-10.375rem)] overflow-y-scroll">
          <ul className="h-full flex flex-col gap-2.5 text-left">
            {messages.map((message) => (
              <MessageItem key={message.msg_no} message={message} />
            ))}
          </ul>
          <div className="h-[5.75rem]"></div>
        </div>
      ) : (
        <div className="w-full text-center text-line">
          <h3 className="pt-24">ELMO</h3>
        </div>
      )}
      <form
        onKeyDown={handleKeyDown}
        className="absolute bottom-0 w-full bg-gradient-to-t from-white from-20%"
      >
        <div className="relative max-w-screen-md m-auto flex p-4">
          <Textarea
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
            placeholder="Send a message"
            className="h-16 max-h-32 pl-4 pr-16 py-5 shadow-md shadow-line/40 resize-none"
          />
          <Button
            type="submit"
            disabled={!text}
            className="w-fit p-2 absolute right-8 bottom-[1.875rem] rounded-md text-xl disabled:bg-transparent disabled:text-line"
          >
            <MdSend />
          </Button>
        </div>
      </form>
    </>
  );
}

interface MessageItemProps {
  message: ChatMessage;
}

function MessageItem({ message }: MessageItemProps) {
  return (
    <li
      className={`whitespace-pre-line p-4 ${
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
