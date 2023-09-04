interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function MainTemplate({ title, description, children }: Props) {
  return (
    <main className="flex-1 pt-8 px-8 md:pt-20 md:px-14">
      <div className="max-w-screen-md m-auto">
        <h2>{title}</h2>
        {description && <p className="mb-5">{description}</p>}
        {children}
      </div>
    </main>
  );
}
