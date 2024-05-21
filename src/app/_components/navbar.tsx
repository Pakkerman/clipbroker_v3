import clsx from "clsx";
import { Button } from "~/components/ui/button";
import { getSession, logout } from "~/lib/session";
import { EditAliasButton, UserAlias } from "./userAlias";
import { SignoutIcon } from "~/components/svgs";
import { LogoutButton } from "../components/LogoutButton";

export async function Navbar() {
  const { alias } = await getSession();

  return (
    <section className={clsx("flex w-full items-center justify-between p-4 ")}>
      <div className=" flex bg-gradient-to-r from-emerald-400 from-20% to-yellow-300 bg-clip-text text-xl font-bold leading-none text-transparent transition">
        <h1 className="">Clipbroker</h1>
        <span>/</span>
        {alias && <UserAlias alias={alias} />}
        <span>/</span>texts
        {/* TODO: texts and files */}
      </div>

      <div className="flex items-center gap-2">
        <EditAliasButton />
        <form
          action={async () => {
            "use server";
            await logout();
          }}
        >
          <LogoutButton />
        </form>
      </div>
    </section>
  );
}
