"use client";

import { useState } from "react";

export function LoginForm({
  loginAction,
  id,
}: {
  loginAction: any;
  id: string;
}) {
  const [input, setInput] = useState(id);

  return (
    <form
      className="flex flex-col items-center justify-center gap-2"
      action={loginAction}
    >
      <label htmlFor="clipboardId">Board Id</label>
      <input
        className="rounded-md border-[1px] p-2 text-center text-black"
        type="text"
        name="clipboardId"
        placeholder={id}
        autoComplete="off"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      />
      <button
        type="submit"
        className="rounded-md border-[1px] border-white p-2"
      >
        login
      </button>
    </form>
  );
}
