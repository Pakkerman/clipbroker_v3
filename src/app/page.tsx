import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "~/lib/session";
import { generateId } from "~/lib/utils";
import { LoginForm } from "./_components/LoginForm";
import clsx from "clsx";

const gredientColors = [
  "from-emerald-500 from-20% to-yellow-200",
  "from-red-500 from-20% to-red-200",
  "from-purple-500 from-20% to-purple-200",
  "from-orange-500 from-20% to-orange-200",
  "from-blue-500 from-20% to-blue-200",
];

const bgColors = [
  "bg-emerald-400/40",
  "bg-red-400/40",
  "bg-purple-400/40",
  "bg-orange-400/40",
  "bg-blue-400/40",
];

export default async function Home() {
  const { userId, alias, pin, lastVisitedAlias } = await getSession();
  if (alias) redirect(`/${alias}/`);

  const newId: string = lastVisitedAlias ?? generateId();
  const colorSeed = parseInt((Math.random() * 100).toFixed());

  return (
    <section className="flex h-[50%] flex-col items-center justify-between">
      <div
        className={clsx(
          "fixed top-[50%] h-[200px] w-[200px] blur-[8rem]",
          bgColors[colorSeed % bgColors.length],
        )}
      />
      <div
        className={clsx(
          "bg-gradient-to-r bg-clip-text text-7xl font-bold leading-none text-transparent transition ",
          gredientColors[colorSeed % gredientColors.length],
        )}
      >
        Clipbroker3
      </div>
      <div className="flex w-[80%] flex-col items-center justify-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-md">
        <LoginForm id={newId} />
      </div>
    </section>
  );
}
