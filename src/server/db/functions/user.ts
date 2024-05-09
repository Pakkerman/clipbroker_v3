import "server-only";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { generateId } from "~/lib/utils";

export async function getOrCreateUser(alias: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.alias, alias),
    });

    if (user) return user;

    await db.insert(users).values({ alias });
    return await db.query.users.findFirst({
      where: eq(users.alias, alias),
    });
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }
}

// export async function getUser(clipboardId: string) {
//   try {
//     await db.query.users.findFirst({
//       where: eq(users.alias, clipboardId),
//     });
//   } catch (error) {
//     console.log("something wrong with getting user", error);
//   }
// }
//
// export async function createUser(clipboardId: string) {
//   try {
//     await db.insert(users).values({ clipboardId });
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getBoardIds() {
  const data = await db.select().from(users);
  return data;
}

export async function validNewBoardId(id: string): Promise<boolean> {
  const data = await db.query.users.findFirst({
    where: eq(users.alias, id),
  });

  return data ? true : false;
}

export async function getNewId(): Promise<string> {
  let rand = generateId();

  while (await db.query.users.findFirst({ where: eq(users.alias, rand) })) {
    rand = generateId();
  }

  // cookies().set("clipboardId", rand);
  return rand;
}
