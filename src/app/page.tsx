import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { CreateText } from "./_components/create-text";

export default function Home() {
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <h1 className="text-3xl">clipbroker_v3</h1>
      <div className="flex grow items-center justify-center">
        <CreateText />
      </div>
    </section>
  );
}
