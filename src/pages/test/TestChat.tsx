import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createMessage, getChatHistory } from '@/api/rest';
import { MdSend } from 'react-icons/md';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';
import SideNav from '@/components/SideNav';
import SliderWithLabel from '@/components/SliderWithLabel';
import { QUERY_KEYS } from '@/constants';
import { TestMessage, TestMessageForm } from '@/types';
import TextInputWithLabel from '@/components/TextInputWithLabel';

interface Props {
  testNo: number;
}

export default function TestChat({ testNo }: Props) {
  const [formData, setFormData] = useState<TestMessageForm>({
    test_no: testNo,
    msg: '',
    task: 0,
    max_length: 50,
    temperature: 1,
    top_k: 0,
    top_p: 1,
    repetition_penalty: 1,
    no_repeat_ngram_size: 0,
  });
  const messageRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const queryKey = [QUERY_KEYS.CHAT_HISTORY, String(testNo)];

  const { data: messages } = useQuery({
    queryKey: queryKey,
    queryFn: () => getChatHistory(testNo),
  });

  const scrollToBottom = () => {
    if (!messageRef.current) return;
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createMessageMutation = useMutation({
    mutationFn: createMessage,
    onMutate: async (formData) => {
      setFormData((prev) => ({ ...prev, msg: '' }));
      await queryClient.cancelQueries({ queryKey });
      const previousMessages =
        queryClient.getQueryData<TestMessage[]>(queryKey);
      const newMessages: TestMessage[] = [
        {
          msg_no: Date.now(),
          is_user: true,
          created_at: new Date().toString(),
          msg: formData.msg,
          test_no: formData.test_no,
        },
        {
          msg_no: Date.now() + 1,
          is_user: false,
          created_at: new Date().toString(),
          msg: '...',
          test_no: formData.test_no,
        },
      ];
      queryClient.setQueryData<TestMessage[]>(queryKey, (old) =>
        old ? [...old, ...newMessages] : [...newMessages]
      );
      return { previousMessages };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData<TestMessage[]>(
        queryKey,
        context!.previousMessages
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.nativeEvent.isComposing) {
      e.stopPropagation();
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      createMessageMutation.mutate(formData);
    }
  };

  return (
    <main className="flex-1 flex">
      <section className="flex-1 w-full h-full relative">
        {messages?.length ? (
          <div
            ref={messageRef}
            className="h-[calc(100vh-12.1255rem)] overflow-y-scroll "
          >
            <ul className="h-full flex flex-col gap-2.5 text-left">
              {messages.map((message) => (
                <MessageItem key={message.msg_no} message={message} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="w-full text-center text-line">
            <h3 className="pt-24">ELMO</h3>
          </div>
        )}
        <form
          onKeyDown={handleKeyDown}
          className="absolute bottom-0 w-full h-24 flex justify-center bg-gradient-to-t from-white from-20%"
        >
          <div className="absolute bottom-0 w-full max-w-screen-md flex p-4">
            <Textarea
              value={formData.msg}
              autoFocus
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, msg: e.target.value }))
              }
              placeholder="Send a message"
              className="h-16 max-h-32 pl-4 pr-16 py-5 shadow-md shadow-line/40 resize-none"
            />
            <Button
              type="submit"
              disabled={!formData.msg}
              className="w-fit p-2 absolute right-8 bottom-[1.875rem] rounded-md text-xl disabled:bg-transparent disabled:text-line"
            >
              <MdSend />
            </Button>
          </div>
        </form>
      </section>
      <SideNav side="right" className="p-4">
        <SliderWithLabel
          id="maximum-length"
          label="Maximum Length"
          info="Maximum Length info"
          value={formData.max_length}
          max={512}
          min={10}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, max_length: value[0] }))
          }
        />
        <SliderWithLabel
          id="temperature"
          label="Temperature"
          info="Temperature info"
          value={formData.temperature}
          max={2}
          step={0.1}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, temperature: value[0] }))
          }
        />
        <TextInputWithLabel
          id="top-k"
          label="Top K"
          info="Top K info"
          type="number"
          value={formData.top_k}
          className="mb-4"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, top_k: Number(e.target.value) }))
          }
        />
        <SliderWithLabel
          id="top-p"
          label="Top P"
          info="Top P info"
          value={formData.top_p}
          max={2}
          step={0.1}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, top_p: value[0] }))
          }
        />
        <SliderWithLabel
          id="repetition-penalty"
          label="Repetition Penalty"
          info="Repetition Penalty info"
          value={formData.repetition_penalty}
          min={1}
          max={2}
          step={0.1}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, repetition_penalty: value[0] }))
          }
        />
        <TextInputWithLabel
          id="no-repeat-ngram-size"
          label="No Repeat Ngram Size"
          info="No Repeat Ngram Size info"
          type="number"
          value={formData.no_repeat_ngram_size}
          className="mb-4"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              no_repeat_ngram_size: Number(e.target.value),
            }))
          }
        />
      </SideNav>
    </main>
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
