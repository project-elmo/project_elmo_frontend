interface Props {
  title: string;
  children: React.ReactNode;
}

export default function MainTemplate({ title, children }: Props) {
  return (
    <main className="flex-1 pt-8 px-8 md:pt-20 md:pl-14">
      <div className="max-w-screen-md m-auto">
        <h2>{title}</h2>
        {children}
      </div>
    </main>
  );
}
