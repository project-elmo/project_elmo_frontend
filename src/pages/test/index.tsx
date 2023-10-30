import { useParams, useSearchParams } from 'react-router-dom';
import TestMain from '@/pages/test/TestMain';
import TestCreate from '@/pages/test/TestCreate';
import TestChat from '@/pages/test/TestChat';

export default function TestPage() {
  const { fmNo } = useParams();
  const [searchParams] = useSearchParams();
  const testNos = searchParams
    .getAll('testNo')
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <>
      {fmNo ? (
        testNos.length ? (
          <TestChat testNos={testNos} />
        ) : (
          <TestCreate fmNo={Number(fmNo)} />
        )
      ) : (
        <TestMain />
      )}
    </>
  );
}
