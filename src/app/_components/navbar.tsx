import clsx from "clsx";
import { getSession, logout } from "~/lib/session";

export async function Navbar() {
  const { alias } = await getSession();

  return (
    <section
      className={clsx(
        "flex w-full items-center justify-between border-b border-white/20 p-4 transition-all",
      )}
    >
      <div className=" bg-gradient-to-r from-emerald-400 from-20% to-yellow-300 bg-clip-text text-3xl font-bold leading-none text-transparent transition">
        Clipbroker3
      </div>
      <div className="flex items-center gap-2">
        <p>{alias}</p>
        <form
          action={async () => {
            "use server";
            await logout();
          }}
        >
          <button
            className="rounded-md border-[1px] border-white p-2"
            type="submit"
          >
            logout
          </button>
        </form>
      </div>
    </section>
  );
}
