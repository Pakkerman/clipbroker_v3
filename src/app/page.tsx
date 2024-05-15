import { redirect } from "next/navigation";
import { getSession } from "~/lib/session";
import { generateId } from "~/lib/utils";
import { LoginForm } from "./_components/LoginForm";
import clsx from "clsx";
import { getBgColor, getGredientColor } from "~/lib/colors";

export default async function Home() {
  const { userId, alias, pin, lastVisitedAlias } = await getSession();
  if (alias) redirect(`/${alias}/`);

  const newId: string = lastVisitedAlias ?? generateId();
  const colorSeed = parseInt((Math.random() * 100).toFixed());

  return (
    <section className="flex h-[100svh] flex-col items-center justify-around">
      <div
        className={clsx(
          "fixed top-[55%] z-[-1] h-[200px] w-[200px] bg-opacity-40 blur-[7rem]",
          getBgColor(colorSeed),
        )}
      />
      <div
        className={clsx(
          "bg-gradient-to-r bg-clip-text text-5xl font-bold leading-none text-transparent transition md:text-7xl",
          getGredientColor(colorSeed),
        )}
      >
        Clipbroker
      </div>
      <LoginForm id={newId} colorSeed={colorSeed} />
    </section>
  );
}
