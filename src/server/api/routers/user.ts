import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  // getOrInsertOne: publicProcedure
  //   .input(z.object({ id: z.string().length(6) }))
  //   .query(async ({ ctx, input }) => {
  //     try {
  //       const data = await ctx.db.query.users.findFirst({
  //         where: eq(users.alias, input.id),
  //       });
  //
  //       if (data) {
  //         return { id: data.clipboardId, pin: data.pin };
  //       } else {
  //         const insertResponse = await ctx.db
  //           .insert(users)
  //           .values({ clipboardId: input.id })
  //           .returning({ id: users.alias, pin: users.pin });
  //
  //         return insertResponse[0];
  //       }
  //     } catch (error) {
  //       console.log("something wrong with finding or create new user", error);
  //     }
  //   }),

  getUser: publicProcedure
    .input(z.object({ id: z.string().length(6) }))
    .query(async ({ ctx, input }) => {
      try {
        const user = ctx.db.query.users.findFirst({
          where: eq(users.alias, input.id),
        });

        return user;
      } catch (error) {
        console.log("something wrong with getting user", error);
      }
    }),

  create: publicProcedure
    .input(z.object({ alias: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const insertedUser = await ctx.db
          .insert(users)
          .values({ alias: input.alias })
          .returning({ clipboardId: users.alias, pin: users.pin });

        return insertedUser[0];
      } catch (error) {
        console.log("something wrong with creating new user with id", error);
      }
    }),

  getUserWithAlias: publicProcedure
    .input(z.object({ alias: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.users.findFirst({
          where: eq(users.alias, input.alias),
        });
      } catch (error) {
        console.log(
          "something wrong with editing alias",
          JSON.stringify(error, null, 2),
        );
      }
    }),

  editAlias: publicProcedure
    .input(z.object({ from: z.string(), to: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.db
          .update(users)
          .set({ alias: input.to })
          .where(eq(users.alias, input.from));

        console.log(res);
      } catch (error) {
        console.log(
          "something wrong with editing alias",
          JSON.stringify(error, null, 2),
        );
      }
    }),
});
