"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export function UserAlias({ alias }: { alias: string }) {
  const [editing, setEditing] = useState(false);

  return (
    <div
      onClick={() => {
        setEditing(!editing);
      }}
    >
      <h1>{alias}</h1>
      {editing && <Modal alias={alias} />}
    </div>
  );
}

function Modal({ alias }: { alias: string }) {
  const router = useRouter();
  const [newAlias, setNewAlias] = useState(alias);
  const [checkAlias, setCheckAlias] = useState(alias);
  const [available, setAvailable] = useState(true);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const { mutate } = api.user.editAlias.useMutation({
    onSuccess: (_, { to }) => {
      toast(`alias updated to ${to}`);
      router.replace(`/${to}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ from: alias, to: newAlias });
  };

  useEffect(() => {
    setAvailable(false);
    const timeout = setTimeout(() => {
      setCheckAlias(newAlias);
    }, 500);

    return () => clearTimeout(timeout);
  }, [newAlias]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  return (
    <div className="fixed left-0 top-0 z-10 h-[100svh] w-full bg-black/10 backdrop-blur-sm ">
      <div
        className="absolute left-[50%] top-[50%] z-20 h-[400px] w-[350px] translate-x-[-50%] translate-y-[-50%] rounded-lg border border-white/60 bg-black text-white "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full w-full flex-col items-center justify-around gap-4 p-4">
          <h2 className="text-2xl">Change your alias</h2>
          <form
            className="flex flex-col items-center justify-center gap-4"
            onSubmit={handleSubmit}
          >
            <Input
              ref={inputRef}
              className=" p-2 text-center text-xl text-white outline-none selection:bg-yellow-800/80"
              value={newAlias}
              onChange={(e) => setNewAlias(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <CheckAlias
              alias={alias}
              newAlias={checkAlias}
              setAvailable={setAvailable}
            />
            <Button type="submit" className="" disabled={available}>
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function CheckAlias({
  alias,
  newAlias,
  setAvailable,
}: {
  alias: string;
  newAlias: string;
  setAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, isLoading } = api.user.getUserWithAlias.useQuery(
    { alias: newAlias },
    { retry: 1 },
  );

  if (alias === newAlias || newAlias === "") {
    setAvailable(true);
    return <p className="text-sm text-yellow-400">Pick a new alias</p>;
  }

  if (isLoading) {
    setAvailable(true);
    return <p className="text-sm text-yellow-400">Checking...</p>;
  }

  if (data) {
    setAvailable(true);
    return <p className="text-sm text-yellow-400">Alias is taken</p>;
  }

  setAvailable(false);
  return <p className="text-sm text-yellow-400">Alias is available</p>;
}
