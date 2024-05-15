import clsx from "clsx";
import { Button } from "~/components/ui/button";
import { getSession, logout } from "~/lib/session";
import { UserAlias } from "./userAlias";

export async function Navbar() {
  const { alias } = await getSession();

  return (
    <section className={clsx("flex w-full items-center justify-between p-4 ")}>
      <div className=" flex bg-gradient-to-r from-emerald-400 from-20% to-yellow-300 bg-clip-text text-3xl font-bold leading-none text-transparent transition">
        <h1 className="">Clipbroker</h1>
        <span>/</span>
        {alias && <UserAlias alias={alias} />}
        <span>/</span>texts
        {/* TODO: texts and files */}
      </div>

      <div className="flex items-center gap-2">
        <form
          action={async () => {
            "use server";
            await logout();
          }}
        >
          <Button
            variant="outline"
            className="h-8 w-8 rounded-md p-2"
            type="submit"
          >
            <SignoutIcon />
          </Button>
        </form>
      </div>
    </section>
  );
}

export function SignoutIcon() {
  return (
    <svg
      stroke="currentColor"
      height="16"
      width="16"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path>
    </svg>
  );
}

export function EditIcon() {
  return (
    <svg
      stroke="currentColor"
      height="16"
      width="16"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 576 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
    </svg>
  );
}
