"use client";

import type { ReactNode } from "react";

import GoogleProvider from "./google.provider";
import QueryProvider from "./query.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleProvider>
      <QueryProvider>{children}</QueryProvider>
    </GoogleProvider>
  );
}