import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: "/:id([0-9a-zA-Z]{6})",
};
