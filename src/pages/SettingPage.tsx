import Button from '@/components/Button';
import MainTemplate from '@/components/MainTemplate';
import TextInputWithLabel from '@/components/TextInputWithLabel';
import { SERVICE_NAME } from '@/constants';

export default function SettingPage() {
  return (
    <MainTemplate
      title="Environment Setting"
      description={`You can change these values at any time in the 'Menu > Environment Settings'.`}
    >
      <form>
        <TextInputWithLabel
          id="model-save-path"
          label="Model save path"
          info="example information"
          placeholder={`home/{user}/elmo/data/models`}
        />
        <div className="mt-6 text-center">
          <Button type="submit">Start {SERVICE_NAME}</Button>
        </div>
      </form>
    </MainTemplate>
  );
}
