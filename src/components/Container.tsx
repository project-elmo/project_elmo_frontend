interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return <section className="flex flex-col h-screen">{children}</section>;
}
