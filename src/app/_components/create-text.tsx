"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function CreateText({}) {
  const [pre, setPre] = useState("");
  const { mutate } = api.text.create.useMutation({
    onMutate: () => {
      setPre("text.create.mutate");
    },
    onSuccess: () => {
      setPre("text.create success");
    },
    onError: (error) => {
      const msg =
        error.data?.zodError?.fieldErrors?.content?.[0] ||
        "something is wrong with create text";

      setPre(msg);
    },
  });
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        mutate({ content: data.content as string });
      }}
      className="flex flex-col"
    >
      <input
        name="content"
        type="text"
        placeholder="paste something"
        className="text-black"
      />
      <button className="" type="submit">
        create
      </button>
      <pre className="fixed bottom-0 left-0 p-2 text-sm">{pre}</pre>
    </form>
  );
}
