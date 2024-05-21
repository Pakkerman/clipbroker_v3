import { Footer } from "../_components/footer";
import { Navbar } from "../_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-[100dvh] min-h-16 w-full flex-col items-center justify-between">
      <nav className=" w-full flex-none shrink border-b border-white/20">
        <Navbar />
      </nav>
      <main className="h-full w-full p-4">{children}</main>
      <footer className=" min-h-16 w-full flex-none border-t border-white/20">
        <Footer />
      </footer>
    </section>
  );
}
