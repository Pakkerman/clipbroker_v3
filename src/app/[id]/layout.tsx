import { Footer } from "../_components/footer";
import { Navbar } from "../_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="min-h-16 w-full">
        <Navbar />
      </nav>
      <main className="w-full grow overflow-y-scroll">{children}</main>
      <footer className="h-16 w-full border-t border-white/20">
        <Footer />
      </footer>
    </>
  );
}
