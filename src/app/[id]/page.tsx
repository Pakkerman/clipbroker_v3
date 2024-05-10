import { getSession, logout } from "~/lib/session";
import { CreateText } from "../_components/create-text";
import { Texts } from "../_components/texts";
import { redirect } from "next/navigation";

export default async function ClipboardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { userId, alias } = await getSession();
  // FIX: temporary fix for getting session is lagged behind middleware return header with new cookie
  if (id != alias) redirect("/" + id);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between py-8">
      <Texts userId={userId} />
      <CreateText userId={userId} />
      {/* <pre>{JSON.stringify(id, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(await getSession(), null, 2)}</pre> */}
    </div>
  );
}
