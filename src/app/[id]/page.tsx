import { getSession, logout } from "~/lib/session";
import { CreateText } from "../_components/create-text";
import { Texts } from "../_components/texts";

export default async function ClipboardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { clipboardId, pin } = getSession();

  return (
    <div>
      <h1 className="">this board {clipboardId}</h1>
      <Texts />
      <CreateText />
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

      <pre>{JSON.stringify(id, null, 2)}</pre>
    </div>
  );
}
