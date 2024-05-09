import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect, type RedirectType } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import { getOrCreateUser } from "~/server/db/functions/user";

export async function login(alias: string, pin: string) {
  try {
    const user = await getOrCreateUser(alias);
    if (!user) throw new Error("getOrCreateUser failed");

    const payload = { userId: user.id, alias, pin };
    cookies().set("userId", user.id.toString());
    cookies().set("alias", alias);
    cookies().set("pin", pin);

    // const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt(payload);
    console.log("\t session: ", session);
    const de = await decrypt(session);
    console.log("\t decrypt: ", de);
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }
  // cookies().set("clipboardId", session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("lastVisitedAlias", cookies().get("alias")!.value);

  cookies().set("userId", "", { expires: new Date(0) });
  cookies().set("alias", "", { expires: new Date(0) });
  cookies().set("pin", "", { expires: new Date(0) });
  redirect("/", "replace" as RedirectType);
}

const key = new TextEncoder().encode("salt");

export async function encrypt(payload: {
  userId: number;
  alias: string;
  pin: string;
}) {
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
  const userId = cookies().get("userId")?.value;
  return {
    userId: userId ? +userId : 0,
    alias: cookies().get("alias")?.value,
    pin: cookies().get("pin")?.value,
    lastVisitedAlias: cookies().get("lastVisitedAlias")?.value,
  };
  // return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const alias = request.url.split("/")[3]!;
  const user = await getOrCreateUser(alias);
  console.log("user:", JSON.stringify(user, null, 2));

  if (user?.id == null || user?.pin == null) {
    throw Error("something wrong with getting user via updateSession");
  }

  const res = NextResponse.next();
  res.cookies.set({
    name: "userId",
    value: user.id.toString(),
  });

  res.cookies.set({
    name: "pin",
    value: user.pin,
  });

  res.cookies.set({
    name: "alias",
    value: alias,
  });

  return res;
}
