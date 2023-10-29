interface Props {
  title: string;
  children: React.ReactNode;
}

export default function ListContainer({ title, children }: Props) {
  return (
    <div className="flex flex-col h-[28rem] border-2 border-secondary">
      <h4 className="list-title">{title}</h4>
      <ul className="list-container p-5">{children}</ul>
    </div>
  );
}
