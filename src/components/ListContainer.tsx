interface Props {
  title: string;
  children: React.ReactNode;
}

export default function ListContainer({ title, children }: Props) {
  return (
    <div className="flex flex-col h-[28rem] border-2 border-secondary">
      <h4 className="px-6 py-3 font-bold border-b-2 border-secondary">
        {title}
      </h4>
      <ul className="h-full p-5 flex flex-col gap-2 bg-secondary overflow-y-scroll">
        {children}
      </ul>
    </div>
  );
}
