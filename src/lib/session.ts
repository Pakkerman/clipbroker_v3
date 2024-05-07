import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getNewId } from "~/server/db/functions/user";

export async function login(clipboardId: string, pin: string) {
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

export async function encrypt(payload: { clipboardId: string; pin: string }) {
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

export function getSession() {
  return {
    clipboardId: cookies().get("clipboardId")?.value,
    pin: cookies().get("pin")?.value,
  };
  // return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const id = request.url.split("/")[3]!;
  if (!id) return;

  const res = NextResponse.next();
  res.cookies.set({
    name: "clipboardId",
    value: id,
  });

  return res;
}
