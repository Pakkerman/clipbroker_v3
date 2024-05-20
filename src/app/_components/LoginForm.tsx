"use client";

import clsx from "clsx";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { getBgColor } from "~/lib/colors";
import { loginAction } from "~/server/actions";

export function LoginForm({
  id,
  colorSeed,
}: {
  id: string;
  colorSeed: number;
}) {
  const [input, setInput] = useState(id);

  return (
    <form
      className="flex w-full max-w-[325px] flex-col items-center justify-center gap-2 "
      action={loginAction}
    >
      <label htmlFor="clipboardId">
        <span className="md:text-md text-sm">
          Choose an alias and get clipping
        </span>
      </label>
      <Input
        className="rounded-md bg-slate-50 p-2 text-center text-black"
        type="text"
        name="clipboardId"
        placeholder={id}
        autoComplete="off"
        onChange={(event) => setInput(event.target.value.toLowerCase())}
        value={input}
      />
      <Button
        type="submit"
        className={clsx(" w-full rounded-md p-2", getBgColor(colorSeed))}
      >
        Login
      </Button>
    </form>
  );
}
