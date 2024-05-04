import { CreateText } from "./_components/create-text";
import { Texts } from "./_components/texts";
import { BoardIdentifier } from "./_components/BoardIdentifier";
import { generateId } from "~/utils/utils";
import {
  getBoardIds,
  getNewId,
  validNewBoardId,
} from "~/server/db/functions/user";
import { cookies } from "next/headers";

export default async function Home() {
  const newId = await getNewId();

  return (
    <section className="flex h-full flex-col items-center justify-center">
      <h1 className="text-3xl">clipbroker_v3</h1>
      <div className="flex grow flex-col items-center justify-center gap-4">
        <BoardIdentifier newId={newId} />
      </div>
      <pre>{JSON.stringify(newId, null, 2)}</pre>
    </section>
  );
}
