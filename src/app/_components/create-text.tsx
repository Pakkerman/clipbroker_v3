"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export function CreateText({ userId }: { userId: number }) {
  const [pre, setPre] = useState("");
  const [clipboardText, setClipboardText] = useState("");
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

  useEffect(() => {
    window.navigator.clipboard
      .readText()
      .then((data) => setClipboardText(data));
  }, []);

  return (
    <form
      action={(data) => {
        mutate({
          userId,
          content:
            data.get("content") !== ""
              ? (data.get("content") as string)
              : clipboardText,
        });
      }}
      className="flex flex-col"
    >
      <input
        className={clsx("rounded-md p-2 text-black ")}
        name="content"
        type="text"
        placeholder={clipboardText}
        autoComplete="off"
      />
      <button className="" type="submit">
        create
      </button>
      <pre className="fixed bottom-0 left-0 p-2 text-sm">{pre}</pre>
    </form>
  );
}
