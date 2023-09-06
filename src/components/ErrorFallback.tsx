import { useNavigate } from 'react-router-dom';
import { FallbackProps } from 'react-error-boundary';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { ROUTES } from '@/constants';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    resetErrorBoundary();
    navigate(ROUTES.MAIN, { replace: true });
  };

  return (
    <Container>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <h2>Error</h2>
        <pre>{error.message}</pre>
        <Button onClick={handleClick}>Go Main</Button>
      </div>
    </Container>
  );
}
