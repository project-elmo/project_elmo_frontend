interface Props {
  label: string;
  value: string | number;
}

export default function TextWithLabel({ label, value }: Props) {
  return (
    <div className="text-sm">
      <h4 className="font-semibold mb-2">{label}</h4>
      <p>{value}</p>
    </div>
  );
}
