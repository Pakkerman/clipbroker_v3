"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";

export function CreateText({ userId }: { userId: number }) {
  const [pre, setPre] = useState("");
  const [clipboardText, setClipboardText] = useState("");
  const utils = api.useUtils();
  const { mutate, isPending } = api.text.create.useMutation({
    onMutate: () => {
      setPre("text.create.mutate");
    },
    onSuccess: async () => {
      setPre("text.create success");
      await utils.text.invalidate();
      toast.success("new text created");
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
      .then((data) => setClipboardText(data))
      .catch((error) => JSON.stringify(error, null, 2));
  }, []);

  return (
    <form
      className="flex w-[90%] max-w-[500px] flex-col gap-2 "
      action={(data) => {
        mutate({
          userId,
          content:
            data.get("content") !== ""
              ? (data.get("content") as string)
              : clipboardText,
        });
      }}
    >
      <Textarea
        className={clsx("w-full rounded-md p-2")}
        name="content"
        placeholder={clipboardText}
        autoComplete="off"
      />
      <button
        className="rounded-md border-2 border-white/20 p-2"
        type="submit"
        disabled={isPending}
      >
        create
      </button>
      {/* <pre className="fixed bottom-0 left-0 p-2 text-sm">{pre}</pre> */}
    </form>
  );
}
