import { Navbar } from "../_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="min-h-16">
        <Navbar />
      </nav>
      <main className="grow overflow-y-scroll">{children}</main>
    </>
  );
}
