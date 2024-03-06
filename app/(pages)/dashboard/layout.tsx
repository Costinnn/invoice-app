import DashMenu from "@/app/(pages)/dashboard/_components/DashMenu";
import "./layout.scss";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="dashlayout">
      <DashMenu />
      {children}
    </main>
  );
}
