import "server-only";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { generateId } from "~/lib/utils";
import { getSession } from "~/lib/session";

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

export async function editAlias(newAlias: string) {
  try {
    const { alias, userId } = await getSession();
    if (!alias)
      throw new Error(
        "somthing wrong with edit alias, alias of current user doesn't exist",
      );
    if (!userId)
      throw new Error(
        "somthing wrong with edit alias, userId of current user doesn't exist",
      );

    const alreadExistedUser = await db.query.users.findFirst({
      where: eq(users.alias, newAlias),
    });

    if (alreadExistedUser) return false;

    await db.update(users).set({ alias: newAlias }).where(eq(users.id, userId));

    return true;
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
//     console.log("", error);
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
