export default async function SessionPage() {
  const session = await getSession();

  return (
    <div>
      <h1>Sessions</h1>
      <p>user: {JSON.stringify(session, null, 2)}</p>
      <form
        className=""
        action={async (formData) => {
          "use server";
          await login(formData);
        }}
      >
        <button type="submit">Login</button>
      </form>

      <form
        action={async () => {
          "use server";
          await logout();
        }}
        className=""
      >
        <button className=" " type="submit">
          Logout
        </button>
      </form>
    </div>
  );
}

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function login(formData: FormData) {
  const user = { clipboardId: formData.get("clipboardId") };
  cookies().set("clipboardId", "555555");

  // const expires = new Date(Date.now() + 10 * 1000);
  // const session = await encrypt({ user, expires });
  //
  // cookies().set("clipboardId", session, { expires, httpOnly: true });
}

async function logout() {
  cookies().set("clipboardId", "", { expires: new Date(0) });
}

const key = new TextEncoder().encode("salt");

async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(new TextEncoder().encode("salt"));
}

async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
  return payload;
}

async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

async function updateSession(request: NextRequest) {}
