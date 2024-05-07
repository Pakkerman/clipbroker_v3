import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getNewId } from "~/server/db/functions/user";

export async function login(formData: FormData) {
  const clipboardId = formData.get("clipboardId") as string;
  const pin = formData.get("pin") as string;

  const payload = { clipboardId, pin };
  cookies().set("clipboardId", clipboardId);
  cookies().set("pin", pin);

  // const expires = new Date(Date.now() + 10 * 1000);
  // const session = await encrypt({ user, expires });
  //
  // cookies().set("clipboardId", session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("clipboardId", "", { expires: new Date(0) });
  cookies().set("pin", "", { expires: new Date(0) });
  redirect("/", "replace" as RedirectType);
}

const key = new TextEncoder().encode("salt");

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(new TextEncoder().encode("salt"));
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
  return payload;
}

export async function getSession() {
  return {
    clipboardId: cookies().get("clipboardId")?.value,
    pin: cookies().get("pin")?.value,
  };
  // return await decrypt(session);
}

export async function updateSession(request: NextRequest) {}
