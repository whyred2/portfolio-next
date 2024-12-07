import { useTranslations } from "next-intl";

import { MainNavItem } from "@/types";
import { HeaderItem, NavigationItem } from "@/components/ui/header-items";

import { ThemeSwitcher } from "./theme-switcher";
import LanguageSwitcher from "./language-switcher";

interface MainNavProps {
  children?: React.ReactNode;
  items?: MainNavItem[];
}

export function Header({ children, items }: MainNavProps) {
  const t = useTranslations("Header.NavItem");

  return (
    <header className="flex justify-between p-5 sticky">
      <div className="flex gap-5">
        {items?.length ? (
          <HeaderItem className="gap-5">
            {items?.map((item, index) => (
              <NavigationItem key={index}>{t(item.titleKey)}</NavigationItem>
            ))}
          </HeaderItem>
        ) : null}
        <LanguageSwitcher />
      </div>
      <div className="flex gap-5">
        <ThemeSwitcher />
        {children}
      </div>
    </header>
  );
}
