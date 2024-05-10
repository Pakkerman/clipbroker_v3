import "~/styles/globals.css";

import { Roboto_Mono as Font } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ClipboardContextProvider } from "./api/context/ClipboardContext";
import clsx from "clsx";

const font = Font({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ClipbrokerV3",
  description: "Connect all your clipboard across all your devices",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TRPCReactProvider>
        <ClipboardContextProvider>
          <body
            className={clsx(
              "flex h-[100svh] flex-col items-center justify-center bg-black font-sans ",
              font.variable,
            )}
          >
            <div className="fixed left-[-150px] z-[-1] h-96 w-96 rounded-full bg-emerald-600/10 blur-[8rem]"></div>
            <div className="fixed bottom-[-250px] right-[-100px] z-[-1] h-96 w-96 rounded-full bg-yellow-300/10 blur-[12rem]"></div>
            {children}
          </body>
        </ClipboardContextProvider>
      </TRPCReactProvider>
    </html>
  );
}
