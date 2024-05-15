"use server";

import { login } from "~/lib/session";
import { editAlias } from "./db/functions/user";

export async function loginAction(formData: FormData) {
  const clipboardId = formData.get("clipboardId") as string;
  const pin = formData.get("pin") as string;

  await login(clipboardId, pin);
}

export async function editAliasAction(formData: FormData) {
  const alias = formData.get("alias") as string;

  return await editAlias(alias);
}

export async function testServerAction(formData: FormData) {
  console.log("\t\t message from server action");
}
