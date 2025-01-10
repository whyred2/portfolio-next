import { getCurrentUser } from "@/lib/session";
import { Header } from "@/components/header";
import { navigationConfig } from "@/config/nav";
import { HeaderItem } from "@/components/ui/header-items";
import { UserAccountNav } from "@/components/user-account-nav";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import * as React from "react";
import PageWrapper from "@/components/page-wrapper";
import { TransitionProvider } from "@/contexts/transition-context";

import "@/app/styles/globals.css";

interface PagesLayoutProps {
  children?: React.ReactNode;
}

export default async function PagesLayout({ children }: PagesLayoutProps) {
  const user = await getCurrentUser();

  return (
    <React.Suspense fallback={null}>
      <TransitionProvider>
        <Header items={navigationConfig.mainNav}>
          <HeaderItem>
            {user ? (
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />
            ) : (
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "py-1 rounded-md border-none"
                )}
              >
                Войти
              </Link>
            )}
          </HeaderItem>
        </Header>

        <PageWrapper>{children}</PageWrapper>
      </TransitionProvider>
    </React.Suspense>
  );
}
