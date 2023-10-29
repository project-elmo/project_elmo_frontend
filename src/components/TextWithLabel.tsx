interface Props {
  label: string;
  value: string | number;
  link?: string;
}

export default function TextWithLabel({ label, value, link }: Props) {
  return (
    <div className="text-sm">
      <h4 className="font-semibold mb-2">{label}</h4>
      {link ? (
        <a href={link} className="underline">
          {value}
        </a>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}
