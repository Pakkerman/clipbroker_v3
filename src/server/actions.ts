"use server";

import { login } from "~/lib/session";

export async function loginAction(formData: FormData) {
  await login(formData);
}
