import { useParams } from 'react-router-dom';
import TestMain from '@/pages/test/TestMain';
import TestCreate from '@/pages/test/TestCreate';
import TestChat from '@/pages/test/TestChat';

export default function TestPage() {
  const { fmNo, testNo } = useParams();

  return (
    <>
      {fmNo ? (
        testNo ? (
          <TestChat testNo={Number(testNo)} />
        ) : (
          <TestCreate fmNo={Number(fmNo)} />
        )
      ) : (
        <TestMain />
      )}
    </>
  );
}
