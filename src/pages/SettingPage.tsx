import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSetting, updateSetting } from '@/api/rest';
import Button from '@/components/Button';
import MainTemplate from '@/components/MainTemplate';
import SwitchWithLabel from '@/components/SwitchWithLabel';
import TextWithLabel from '@/components/TextWithLabel';
import Toast from '@/components/Toast';
import { QUERY_KEYS } from '@/constants';
import { Setting } from '@/types';

export default function SettingPage() {
  const [formData, setFormData] = useState<Setting>({
    model_path: '',
    result_path: '',
    is_gpu_use: false,
  });
  const [toastOpen, setToastOpen] = useState(false);

  const { data: setting } = useQuery({
    queryKey: [QUERY_KEYS.SETTING],
    queryFn: getSetting,
  });

  useEffect(() => {
    if (!setting) return;
    setFormData(setting);
  }, [setting]);

  const updateSettingMutation = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => setToastOpen(true),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSettingMutation.mutate(formData);
  };

  return (
    <MainTemplate
      title="Environment Settings"
      description={`You can change these values at any time.`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <TextWithLabel label="Model save path" value={formData.model_path} />
          <div className="flex items-center gap-4">
            <SwitchWithLabel
              id="run_on_gpu"
              label="Run on GPU"
              checked={formData.is_gpu_use}
              disabled={!setting?.is_gpu_available}
              className="font-semibold"
              onCheckedChange={(checked: boolean) =>
                setFormData((prev) => ({
                  ...prev,
                  is_gpu_use: checked,
                }))
              }
            />
            {setting && !setting?.is_gpu_available && (
              <p className="text-sm text-disabled">GPU not available</p>
            )}
          </div>
        </div>
        <div className="py-6 text-center">
          <Button type="submit">Change Settings</Button>
        </div>
      </form>

      <Toast
        title="Successfully changed"
        open={toastOpen}
        onOpenChange={(open) => setToastOpen(open)}
      />
    </MainTemplate>
  );
}
