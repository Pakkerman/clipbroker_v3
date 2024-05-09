import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { texts } from "~/server/db/schema";

export const textRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const data = await ctx.db.query.texts.findMany({
          where: (texts, { eq }) => eq(texts.userId, input.userId),
          orderBy: (texts, { desc }) => [desc(texts.createdAt)],
        });

        console.log("getAll", data.length, "entries");
        return data;
      } catch (error) {
        throw new Error(JSON.stringify(error, null, 2));
      }
    }),

  create: publicProcedure
    .input(z.object({ content: z.string().min(1), userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(texts).values({
          content: input.content,
          userId: input.userId,
        });

        console.log("insert", input.content);
      } catch (error) {
        throw new Error(JSON.stringify(error, null, 2));
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number(), userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .delete(texts)
          .where(and(eq(texts.id, input.id), eq(texts.userId, input.userId)));
      } catch (error) {
        throw new Error(JSON.stringify(error, null, 2));
      }
    }),
});
