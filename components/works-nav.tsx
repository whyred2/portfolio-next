"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { WorksItem } from "@/types";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WorksNavigationProps {
  items: WorksItem[];
}

export function WorksNavigation({ items }: WorksNavigationProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    <div className="text-2xl flex flex-none flex-col justify-between w-[300px] h-full rounded-lg dark:bg-neutral-800 bg-zinc-200 p-2">
      <ul className="flex flex-col gap-2">
        {items?.length ? (
          <>
            {items.map((item) => {
              const isActive = pathname === `/${locale}${item.href}`;
              return (
                <Link href={item.href} key={item.href}>
                  <li
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      isActive
                        ? "bg-active text-white"
                        : "bg-black/5 dark:bg-white/5",
                      "flex justify-between items-center border-none rounded-md",
                      "hover:bg-black/20 dark:hover:bg-white/20 dark:active:bg-active"
                    )}
                  >
                    {item.title}
                    <Icons.chevronRight className="w-8 h-8" />
                  </li>
                </Link>
              );
            })}
          </>
        ) : null}
      </ul>
      <div className="flex flex-col items-center gap-2">
        <div className="w-5/6 h-px bg-black/30 dark:bg-white/30" />
        <Link href="/works" className="w-full">
          <li
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "flex justify-between items-center border-none rounded-md",
              "hover:bg-black/20 dark:hover:bg-white/20 dark:active:bg-active",
              pathname === `/${locale}/works`
                ? "bg-active text-white"
                : "bg-black/5 dark:bg-white/5"
            )}
          >
            Главная
            <Icons.home className="w-6 h-6" />
          </li>
        </Link>
      </div>
    </div>
  );
}
