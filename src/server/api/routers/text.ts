import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { texts } from "~/server/db/schema";

export const textRouter = createTRPCRouter({
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
});
