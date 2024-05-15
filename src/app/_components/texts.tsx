"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import clsx from "clsx";
import { api } from "~/trpc/react";
import { CopyButton } from "../components/CopyButton";
import { DeleteButton } from "../components/DeleteButton";
import { Loading } from "../components/Loading";

export function Texts({ userId }: { userId: number }) {
  const [animationParent] = useAutoAnimate();
  const { data, isLoading } = api.text.getAll.useQuery({
    userId: userId,
  });

  return (
    <ul
      className="max-h-[500px] min-h-[300px] w-[90%] max-w-[500px] overflow-y-scroll rounded-md border border-white/20 p-2"
      ref={animationParent}
    >
      {isLoading && <Loading />}
      {data?.map((item) => (
        <li
          className="flex w-full justify-between gap-2 border-b p-2"
          key={item.id}
        >
          <div className="w-[80%] overflow-hidden">
            <p className={clsx("")}>{item.content}</p>
          </div>

          <CopyButton content={item.content} />
          <DeleteButton id={item.id} userId={userId} />
        </li>
      ))}
    </ul>
  );
}
