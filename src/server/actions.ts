"use server";

import { login } from "~/lib/session";

export async function loginAction(formData: FormData) {
  const clipboardId = formData.get("clipboardId") as string;
  const pin = formData.get("pin") as string;

  await login(clipboardId, pin);
}
