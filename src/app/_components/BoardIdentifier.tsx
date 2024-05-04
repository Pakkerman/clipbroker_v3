"use client";

import { api } from "~/trpc/react";
import { useClipboard } from "../api/context/ClipboardContext";
import { useRouter } from "next/navigation";

export function BoardIdentifier({ newId }: { newId: string }) {
  const router = useRouter();
  // const { isLoading, data } = api.user.getOrInsertOne.useQuery({
  //   id: randomId,
  // });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      please input board id
      <form
        className="flex flex-col"
        action={async (formData) => {
          const id = (formData.get("id") as string) ?? newId;
          console.log(formData);
          router.push(`/${id}`);
        }}
      >
        <input
          className="rounded-md p-2 text-center text-black "
          type="text"
          name="id"
          minLength={6}
          maxLength={6}
          placeholder={newId}
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
