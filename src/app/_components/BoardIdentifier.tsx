"use client";

import { api } from "~/trpc/react";

export function BoardIdentifier({ randomId }: { randomId: string }) {
  const { isLoading, data } = api.user.getOrInsertOne.useQuery({
    id: randomId,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      please input board id
      <form className="flex flex-col" onSubmit={() => {}}>
        <input
          className="rounded-md p-2 text-black"
          type="text"
          minLength={6}
          maxLength={6}
          placeholder={randomId}
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
