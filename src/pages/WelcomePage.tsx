import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Button from '@/components/Button';
import MainTemplate from '@/components/MainTemplate';
import Container from '@/components/Container';
import Header from '@/components/Header';
import { ROUTES, SERVICE_NAME } from '@/constants';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { setIsOnboarded } = useUser();

  const handleClickContinue = () => {
    setIsOnboarded();
    navigate(ROUTES.SETTING);
  };

  return (
    <Container>
      <Header />
      <MainTemplate title="Welcome!">
        <p className="font-bold">
          PLEASE READ THIS DISCLAIMER CAREFULLY BEFORE USING {SERVICE_NAME}.
        </p>
        <div className="max-h-[28rem] my-2.5 py-5 bg-secondary overflow-y-scroll">
          <ol className="px-10 list-decimal">
            <li>
              Copyright of Pre-trained Models: {SERVICE_NAME} does not own the
              copyright to any pre-trained models provided or used within our
              service. Any pre-trained models made available through{' '}
              {SERVICE_NAME} are for convenience and demonstration purposes
              only.
            </li>
            <li>
              Risk and Liability of Trained Models: By using the {SERVICE_NAME}{' '}
              service, you acknowledge and agree that any risks associated with
              the performance, results, or outputs of models trained using our
              platform are solely your responsibility. {SERVICE_NAME}, its
              employees, affiliates, and partners, are not liable for any harm,
              damages, or losses that may arise from the use or reliance on
              models trained through our service.
            </li>
            <li>
              Licensing of Trained Models: It is the user's responsibility to
              ensure that models trained on {SERVICE_NAME} comply with the
              licensing terms of the original pre-trained models. Any
              modifications, adaptations, or derivatives of pre-trained models
              must adhere to the licensing stipulations set forth by the
              original copyright holders.
            </li>
          </ol>
          <p className="px-5 pt-5">
            Additionally, while {SERVICE_NAME} strives to provide a reliable and
            user-friendly platform, we make no guarantees regarding uptime, data
            preservation, or the accuracy of model training. Always keep backups
            of your data and never solely rely on our platform for
            mission-critical tasks.
          </p>
        </div>
        <p className="text-sm">
          By proceeding with the use of {SERVICE_NAME}, you signify your
          agreement to this disclaimer. If you do not agree with any part of
          this disclaimer, please do not use our service.
        </p>
        <div className="py-6 text-center">
          <Button onClick={handleClickContinue}>Continue</Button>
        </div>
      </MainTemplate>
    </Container>
  );
}
