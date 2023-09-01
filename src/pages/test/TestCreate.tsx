import MainTemplate from '@/components/MainTemplate';

interface Props {
  fmNo: number;
}

export default function TestCreate({ fmNo }: Props) {
  return (
    <MainTemplate title="Select Training Session">TestCreate</MainTemplate>
  );
}
