import { useParams } from 'react-router-dom';
import TestMain from '@/pages/test/TestMain';
import TestCreate from '@/pages/test/TestCreate';
import TestChat from '@/pages/test/TestChat';

export default function TestPage() {
  const { fmNo, testNo } = useParams();

  return (
    <main className="flex-1">
      <section className="h-full m-auto relative">
        {fmNo ? (
          testNo ? (
            <TestChat />
          ) : (
            <TestCreate fmNo={Number(fmNo)} />
          )
        ) : (
          <TestMain />
        )}
      </section>
    </main>
  );
}
