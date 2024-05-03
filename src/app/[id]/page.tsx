"use client";

import { useParams } from "next/navigation";
import { Texts } from "../_components/texts";
import { CreateText } from "../_components/create-text";

export default function ClipboardPage() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="">this board {id}</h1>
      <Texts />
      <CreateText />
    </div>
  );
}
