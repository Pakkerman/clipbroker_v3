import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "~/lib/session";
import { generateId } from "~/lib/utils";
import { LoginForm } from "./_components/LoginForm";

export default async function Home() {
  const { userId, alias, pin, lastVisitedAlias } = await getSession();
  if (alias) redirect(`/${alias}/`);

  const newId: string = lastVisitedAlias ?? generateId();

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
