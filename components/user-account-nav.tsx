"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { Icons } from "@/components/icons";
import { toast } from "@/components/ui/use-toast";
import { AlertHandler } from "@/components/alert-handler";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const t = useTranslations("Header.UserMenu");
  const { theme, setTheme } = useTheme();
  const [isTheme, setIsTheme] = useState(theme);

  useEffect(() => {
    setIsTheme(theme);
  }, [theme]);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
      });

      if (response.ok) {
        signOut();
        return toast({
          title: t("Toast.success"),
          description: t("Toast.Description.successDelete"),
        });
      } else {
        const data = await response.json();
        return toast({
          title: t("Toast.error"),
          description: `${t("Toast.Description.error")} ${data.error}`,
        });
      }
    } catch (error) {
      console.error(error);
      return toast({
        title: t("Toast.error"),
        description: t("Toast.Description.errorDelete"),
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar user={{ image: user.image || null }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex gap-5 px-[15px] py-[15px]">
          <UserAvatar user={{ image: user.image || null }} />
          <div className="flex justify-center flex-col gap-1 text-size2">
            <span>{user.name}</span>
            <span className="w-[200px] overflow-hidden">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icons.paintRoller />
            {t("themes")}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="z-[50]">
            <DropdownMenuRadioGroup value={isTheme} onValueChange={setIsTheme}>
              <DropdownMenuRadioItem
                value="system"
                onClick={() => setTheme("system")}
              >
                <Icons.sunMoon className="min-w-[24px]" />
                {t("system")}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="light"
                onClick={() => setTheme("light")}
              >
                <Icons.sun className="min-w-[24px]" />
                {t("light")}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="dark"
                onClick={() => setTheme("dark")}
              >
                <Icons.moon className="min-w-[24px]" />
                {t("dark")}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <AlertHandler
          title={t("delete-account-title")}
          description={t("delete-account-description")}
          trigger={
            <button className="w-full flex items-center gap-3 px-[20px] h-[50px] transition-bg duration-300 hover:bg-secondaryHover active:bg-active active:transition-none">
              <Icons.trash />
              {t("delete-account")}
            </button>
          }
          onConfirm={handleDeleteAccount}
        />
        <DropdownMenuItem onClick={() => signOut()}>
          <button className="flex gap-3">
            <Icons.logOut />
            {t("log-out")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
