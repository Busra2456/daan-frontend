"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import GoogleProvider from "./google.provider";
import QueryProvider from "./query.provider";

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <GoogleProvider>
        <QueryProvider>{children}</QueryProvider>
      </GoogleProvider>
    </ThemeProvider>
  );
}