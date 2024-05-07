import "server-only";
//
import { eq } from "drizzle-orm";
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { generateId } from "~/lib/utils";
import { cookies } from "next/headers";

export async function getBoardIds() {
  const data = await db.select().from(users);
  return data;
}

export async function validNewBoardId(id: string): Promise<boolean> {
  const data = await db.query.users.findFirst({
    where: eq(users.clipboardId, id),
  });

  return data ? true : false;
}

export async function getNewId(): Promise<string> {
  let rand = generateId();

  while (
    await db.query.users.findFirst({ where: eq(users.clipboardId, rand) })
  ) {
    rand = generateId();
  }

  // cookies().set("clipboardId", rand);
  return rand;
}
