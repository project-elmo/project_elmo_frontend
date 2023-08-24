import { useNavigate } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';
import MainTemplate from '@/components/MainTemplate';
import Button from '@/components/Button';
import { ROUTES } from '@/constants';

export default function StepDone() {
  const navigate = useNavigate();

  return (
    <MainTemplate title="Done!">
      <div>
        <div className="w-full py-20">
          <MdCheckCircle className="w-full h-32" />
        </div>
        <div className="mt-12 text-center">
          <Button onClick={() => navigate(ROUTES.MAIN)}>Go History</Button>
        </div>
      </div>
    </MainTemplate>
  );
}
