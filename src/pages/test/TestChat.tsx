import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMessage } from '@/api/rest';
import { MdSend } from 'react-icons/md';
import Chat from '@/components/test/Chat';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';
import ParamNav from '@/components/test/ParamNav';
import { QUERY_KEYS } from '@/constants';
import { TestMessage, TestMessageForm } from '@/types';

interface Props {
  testNos: number[];
}

export default function TestChat({ testNos }: Props) {
  const { state } = useLocation() as {
    state: {
      tests: {
        [testNo: number]: string;
      };
    };
  };
  const tests = state?.tests ?? {};
  const [formData, setFormData] = useState<TestMessageForm>({
    test_no: testNos[0],
    msg: '',
    task: 0,
    max_length: 50,
    temperature: 1,
    top_k: '0',
    top_p: 1,
    repetition_penalty: 1,
    no_repeat_ngram_size: '0',
    pdf_file_name: '',
    lang: 'eng',
  });
  const queryClient = useQueryClient();
  const chatQueryKey = QUERY_KEYS.CHAT_HISTORY;

  const createMessageMutation = useMutation({
    mutationFn: createMessage,
    onMutate: async (formData) => {
      const queryKey = [chatQueryKey, String(formData.test_no)];
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
      return { testNo: formData.test_no, previousMessages };
    },
    onError: (_, __, context) => {
      const queryKey = [chatQueryKey, String(context!.testNo)];
      queryClient.setQueriesData(queryKey, context!.previousMessages);
    },
    onSettled: (_, __, ___, context) => {
      const queryKey = [chatQueryKey, String(context!.testNo)];
      queryClient.invalidateQueries({ queryKey, type: 'active' });
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.nativeEvent.isComposing) {
      e.stopPropagation();
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      testNos.forEach((testNo) => {
        createMessageMutation.mutate({ ...formData, test_no: testNo });
      });
    }
  };

  return (
    <main className="flex-1 flex">
      <div className="flex-1 w-full h-full relative">
        <div className="flex gap-4">
          {testNos.map((testNo) => (
            <Chat key={testNo} testNo={testNo} name={tests[testNo]} />
          ))}
        </div>
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
      </div>
      <ParamNav formData={formData} setFormData={setFormData} />
    </main>
  );
}
