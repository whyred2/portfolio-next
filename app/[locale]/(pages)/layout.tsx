import { getCurrentUser } from "@/lib/session";
import { Header } from "@/components/header";
import { navigationConfig } from "@/config/nav";
import { ThemeMusic } from "@/components/theme-music";
import { HeaderItem } from "@/components/ui/header-items";
import { UserAccountNav } from "@/components/user-account-nav";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import * as React from "react";

interface PagesLayoutProps {
  children?: React.ReactNode;
}

export default async function PagesLayout({ children }: PagesLayoutProps) {
  const user = await getCurrentUser();

  return (
    <React.Suspense fallback={<></>}>
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
                "py-1 rounded-md"
              )}
            >
              Войти
            </Link>
          )}
        </HeaderItem>
      </Header>
      {children}
      <ThemeMusic />
    </React.Suspense>
  );
}
