import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { texts } from "~/server/db/schema";

export const textRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx, input }) => {
    try {
      const data = await ctx.db.query.texts.findMany({
        orderBy: (texts, { desc }) => [desc(texts.createdAt)],
      });

      console.log("getAll", data.length, "entries");
      return data;
    } catch (error) {
      console.log("something wrong with getAll text", error);
    }
  }),
  create: publicProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(texts).values({
          content: input.content,
        });

        console.log("insert", input.content);
      } catch (error) {
        console.log("something wrong with create text", error);
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.delete(texts).where(eq(texts.id, input.id));
      } catch (error) {
        console.log("something wrong with delete text", error);
      }
    }),
});
