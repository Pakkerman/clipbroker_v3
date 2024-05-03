"use client";

import { createContext, useContext } from "react";
import { api } from "~/trpc/react";
import { generateId } from "~/utils/utils";

type ClipboardContext = { id: string | undefined };
const ClipboardContext = createContext<ClipboardContext | null>(null);

export function ClipboardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const randomId = generateId();
  const { isLoading, data } = api.user.getOrInsertOne.useQuery({
    id: randomId,
  });

  return (
    <ClipboardContext.Provider value={{ id: data?.clipboardId }}>
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
