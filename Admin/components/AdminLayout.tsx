interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {

  return (
    <>
      <header>ALLO</header>
      <main>{children}</main>
    </>
  );
}

