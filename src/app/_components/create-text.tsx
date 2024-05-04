"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function CreateText({}) {
  const [pre, setPre] = useState("");
  const utils = api.useUtils();
  const { mutate } = api.text.create.useMutation({
    onMutate: () => {
      setPre("text.create.mutate");
    },
    onSuccess: async () => {
      setPre("text.create success");
      await utils.text.invalidate();
    },
    onError: (error) => {
      const msg =
        error.data?.zodError?.fieldErrors?.content?.[0] ??
        "something is wrong with create text";

      setPre(msg);
    },
  });
  return (
    <form
      action={(data) => {
        mutate({ content: data.get("content") as string });
      }}
      className="flex flex-col"
    >
      <input
        name="content"
        type="text"
        placeholder="paste something"
        className="text-black"
        autoComplete="off"
      />
      <button className="" type="submit">
        create
      </button>
      <pre className="fixed bottom-0 left-0 p-2 text-sm">{pre}</pre>
    </form>
  );
}
