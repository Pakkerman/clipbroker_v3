import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getOrInsertOne: publicProcedure
    .input(z.object({ id: z.string().length(6) }))
    .query(async ({ ctx, input }) => {
      try {
        let data = await ctx.db.query.users.findFirst({
          where: eq(users.clipboardId, input.id),
        });

        console.log(input.id);
        console.log(data);

        if (!data) {
          const insertResponse = await ctx.db
            .insert(users)
            .values({ clipboardId: input.id })
            .returning({ id: users.clipboardId, pin: users.pin });

          console.log("insert", insertResponse);
        }

        return data;
      } catch (error) {
        console.log("something wrong with finding or create new user", error);
      }
    }),
  // create: publicProcedure
  //   .input(z.object({ content: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //
  //   }),
});
