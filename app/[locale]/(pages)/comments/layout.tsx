"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

export default function CommentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen">
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}
