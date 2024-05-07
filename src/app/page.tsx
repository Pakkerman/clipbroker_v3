import { redirect } from "next/navigation";
import { getSession, login } from "~/lib/session";
import { cookies } from "next/headers";
import { LoginForm } from "./_components/LoginForm";
import { generateId } from "~/lib/utils";

export default async function Home() {
  const { clipboardId, pin } = getSession();
  if (clipboardId != null) redirect(`/${clipboardId}/`);

  const newId = generateId();

  return (
    <section className="flex h-full flex-col items-center justify-center">
      <h1 className="text-3xl">clipbroker_v3</h1>
      <div className="flex grow flex-col items-center justify-center gap-4">
        <LoginForm id={newId} />
      </div>
      <pre>
        {/* <div>{JSON.stringify(newId, null, 2)}</div> */}
        <div>
          {cookies()
            .getAll()
            .map((item) => (
              <div key={item.name}>
                <p>{item.name}</p>
                <p>{item.value}</p>
              </div>
            ))}
        </div>
      </pre>
    </section>
  );
}
