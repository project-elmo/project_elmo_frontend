import Button from '@/components/Button';
import MainTemplate from '@/components/MainTemplate';
import TextInputWithLabel from '@/components/TextInputWithLabel';

export default function SettingPage() {
  return (
    <MainTemplate
      title="Environment Settings"
      description={`You can change these values at any time.`}
    >
      <form>
        <TextInputWithLabel
          id="model-save-path"
          label="Model save path"
          info="example information"
          placeholder={`home/{user}/elmo/data/models`}
        />
        <div className="py-6 text-center">
          <Button type="submit">Change Settings</Button>
        </div>
      </form>
    </MainTemplate>
  );
}
