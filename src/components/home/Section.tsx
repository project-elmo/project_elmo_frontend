interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: Props) {
  return (
    <section className="p-4">
      <h2 className="text-center mb-8">{title}</h2>
      {children}
    </section>
  );
}
