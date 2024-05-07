"use client";

export function LoginForm(loginAction) {
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
      />
      <button
        type="submit"
        className="rounded-md border-[1px] border-white p-2"
      >
        submit
      </button>
    </form>
  );
}
