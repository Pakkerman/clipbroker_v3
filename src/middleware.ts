import { type NextRequest } from "next/server";
import { updateSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  console.log("middleware request url: ", request.url);
  return await updateSession(request);
}

export const config = {
  matcher: "/:id([0-9a-zA-Z]+)",
};
