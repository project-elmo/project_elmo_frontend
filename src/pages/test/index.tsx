import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdSend } from 'react-icons/md';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';
import TestMain from './TestMain';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

// TODO: API 요청
const messages: Message[] = [
  {
    id: 1,
    text: 'hi',
    sender: 'user',
  },
  {
    id: 2,
    text: 'Hello! How can I assist you today?',
    sender: 'bot',
  },
  {
    id: 3,
    text: 'Do you have any ideas what I should have for dinner?',
    sender: 'user',
  },
  {
    id: 4,
    text: `Certainly! Here are 10 dinner ideas for eating out:

		Italian Restaurant: Enjoy some classic pasta dishes like spaghetti carbonara or fettuccine Alfredo.
		
		Mexican Restaurant: Tacos, burritos, enchiladas, or a hearty bowl of chili con carne could hit the spot.
		
		Sushi Bar: Treat yourself to a variety of fresh sushi rolls and sashimi.
		
		Steakhouse: Indulge in a juicy steak cooked to your preference, paired with sides like mashed potatoes or grilled vegetables.
		
		Indian Restaurant: Delight in the flavors of curry dishes like chicken tikka masala or vegetable korma.
		
		Mediterranean Restaurant: Enjoy dishes like falafel, hummus, kebabs, and gyros.
		
		Thai Restaurant: Try some flavorful Thai curry, pad Thai, or a refreshing papaya salad.
		
		Burger Joint: Savor a gourmet burger with all the fixings, along with some crispy fries.
		
		Japanese Ramen Shop: Warm up with a bowl of comforting ramen noodles topped with various ingredients.
		
		Seafood Restaurant: If you're a seafood lover, enjoy dishes like grilled fish, seafood pasta, or a seafood platter.
		
		Remember to consider any dietary restrictions or preferences you have when choosing a restaurant or dish. Enjoy your dinner out!`,
    sender: 'bot',
  },
];

export default function TestPage() {
  const { fmNo } = useParams();
  const [text, setText] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setText('');
      // TODO: API 요청
    }
  };

  return (
    <main className="flex-1">
      <section className="h-full m-auto relative">
        {fmNo ? (
          <>
            <div className="h-[calc(100vh-10.375rem)] overflow-y-scroll">
              <ul className="flex flex-col gap-2.5 text-left ">
                {messages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
              </ul>
              <div className="h-[5.75rem]"></div>
            </div>
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
        ) : (
          <TestMain />
        )}
      </section>
    </main>
  );
}

interface MessageItemProps {
  message: Message;
}

function MessageItem({ message }: MessageItemProps) {
  return (
    <li
      className={`whitespace-pre-line p-4 ${
        message.sender === 'bot' && 'bg-neutral-100 border-y border-line'
      }`}
    >
      <div className="max-w-screen-md m-auto flex gap-4">
        <span>{message.sender === 'bot' ? '🤖' : '👤'}</span>
        <p>{message.text}</p>
      </div>
    </li>
  );
}
