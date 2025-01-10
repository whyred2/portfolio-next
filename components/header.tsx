"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { MainNavItem } from "@/types";
import { HeaderItem, NavigationItem } from "@/components/ui/header-items";

import { ThemeSwitcher } from "./theme-switcher";
import LanguageSwitcher from "./language-switcher";
import Logo from "@/components/logo";
import DelayedLink from "@/components/delayed-link";

interface MainNavProps {
  children?: React.ReactNode;
  items?: MainNavItem[];
}

export function Header({ children, items }: MainNavProps) {
  const t = useTranslations("Header.NavItem");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-headerBg backdrop-blur shadow flex items-center justify-between px-5 z-50">
      <div className="flex items-center space-x-3">
        <div className="text-accent text-xl font-bold transition-colors">
          <Logo className="w-10" />
        </div>
      </div>
      <div className="hidden md:flex space-x-5">
        {items?.length ? (
          <HeaderItem className="gap-3">
            {items?.map((item, index) => {
              const fullPath = `/${locale}${item.href}`;
              let isActive;
              if (item.href === "/") {
                isActive =
                  pathname === `/${locale}` || pathname === `/${locale}/`;
              } else {
                isActive = pathname.startsWith(fullPath);
              }

              return (
                <DelayedLink key={index} href={item.href}>
                  <NavigationItem isActive={isActive}>
                    {t(item.titleKey)}
                  </NavigationItem>
                </DelayedLink>
              );
            })}
          </HeaderItem>
        ) : null}
      </div>
      <div className="flex gap-5">
        <ThemeSwitcher />
        <LanguageSwitcher />
        {children}
      </div>
    </header>
  );
}
