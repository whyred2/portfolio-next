import { getCurrentUser } from "@/lib/session";
import { Header } from "@/components/header";
import { navigationConfig } from "@/config/nav";
import { ThemeMusic } from "@/components/theme-music";
import { HeaderItem } from "@/components/ui/header-items";
import { UserAccountNav } from "@/components/user-account-nav";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface PagesLayoutProps {
  children?: React.ReactNode;
}

export default async function PagesLayout({ children }: PagesLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="container">
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
              className={buttonVariants({ variant: "default" })}
            >
              Войти
            </Link>
          )}
        </HeaderItem>
      </Header>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
      <ThemeMusic />
    </div>
  );
}
