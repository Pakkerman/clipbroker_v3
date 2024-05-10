"use client";

import { useState } from "react";
import { loginAction } from "~/server/actions";
import { Button } from "~/components/ui/button";

export function LoginForm({ id }: { id: string }) {
  const [input, setInput] = useState(id);

  return (
    <form
      className="flex flex-col items-center justify-center gap-2"
      action={loginAction}
    >
      <label htmlFor="clipboardId">Board Id</label>
      <input
        className="rounded-md bg-emerald-50 p-2 text-center text-black"
        type="text"
        name="clipboardId"
        placeholder={id}
        autoComplete="off"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      />
      <Button type="submit" className="w-full rounded-md bg-emerald-500 p-2">
        Login
      </Button>
    </form>
  );
}
