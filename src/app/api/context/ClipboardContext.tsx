"use client";

import { createContext, useContext } from "react";
import { generateId } from "~/lib/utils";

type ClipboardContext = { id: string };
const ClipboardContext = createContext<ClipboardContext | null>(null);

export function ClipboardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const randomId = generateId();

  return (
    <ClipboardContext.Provider value={{ id: randomId }}>
      {children}
    </ClipboardContext.Provider>
  );
}

export function useClipboard() {
  const context = useContext(ClipboardContext);
  if (!context)
    throw new Error("useClipboard can only be used inside ClipboardContext");

  return context;
}
