import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="dark:bg-neutral-800 bg-zinc-200 w-full h-full p-5 rounded-lg animate-slideIn">
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center text-4xl">
        Проект не найден
        <Link
          href="/works"
          className={cn(buttonVariants({ variant: "default", radius: "md" }))}
        >
          Перейти на главную
        </Link>
      </div>
    </div>
  );
}
