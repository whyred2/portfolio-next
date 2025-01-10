"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/components/player-handler";

interface WorkSectionProps {
  work: {
    id: number;
    title: string;
    description: string;
    libraries: string[];
    features: string[];
    logoImage: string;
    logoWidth: number;
    video?: string;
    demoLink?: string;
    youtubeLink?: string;
    gitHubLink?: string;
  };
}

export function WorkSection({ work }: WorkSectionProps) {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="dark:bg-neutral-800 bg-zinc-200 w-full h-full p-5 rounded-lg animate-slideIn flex flex-col justify-between">
      <div
        className="overflow-y-auto rounded-md"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex justify-between items-center gap-3 mb-5">
          <div className="flex items-center ml-1">
            <Image
              src={work.logoImage}
              alt={work.title}
              width={work.logoWidth}
              height={0}
              priority={true}
              className="drop-shadow-md"
            />
          </div>
          <h2 className="text-4xl">{work.title}</h2>
        </div>

        {work.video && (
          <div className="rounded-md overflow-hidden">
            <VideoPlayer url={work.video} />
          </div>
        )}
        <div className="rounded-md overflow-hidden mt-5 text-white">
          <p className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5">
            {work.description}
          </p>
          <div className="flex">
            <div
              className={cn(
                "flex gap-3 flex-col w-full p-5 bg-gradient-to-tr from-purple-600 to-purple-900"
              )}
            >
              <h3 className="text-3xl">Особенности</h3>
              <ul className="flex flex-col gap-2">
                {work.features.map((feature, id) => (
                  <li key={id} className="flex gap-3 items-center">
                    <div className="h-2 w-8 rounded-full flex-none bg-violet-800" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "flex gap-3 flex-col w-full p-5 bg-gradient-to-tr from-pink-500 to-rose-500"
              )}
            >
              <h3 className="text-3xl">Библиотеки</h3>
              <ul className="flex flex-col gap-2">
                {work.libraries.map((library, id) => (
                  <li key={id} className="flex gap-3 items-center">
                    <div className="h-2 w-8 rounded-full flex flex-none bg-rose-600" />
                    {library}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {!work.youtubeLink && !work.gitHubLink ? null : (
        <div className="flex items-center justify-end gap-3 text-lg mt-5">
          {work.demoLink && (
            <Link
              href={work.demoLink}
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "sm",
                  radius: "sm",
                })
              )}
              target="_blank"
              aria-label={`${work.title} Demo`}
            >
              <Icons.play />
              <span className="">Демо</span>
            </Link>
          )}

          {work.youtubeLink && (
            <Link
              href={work.youtubeLink}
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "sm",
                  radius: "sm",
                })
              )}
              target="_blank"
              aria-label={`${work.title} YouTube`}
            >
              <Icons.youtube />

              <span className="">YouTube</span>
            </Link>
          )}

          {work.youtubeLink && work.gitHubLink && (
            <div className="h-4/6 w-0.5 rounded-full bg-black dark:bg-white" />
          )}

          {work.gitHubLink && (
            <Link
              href={work.gitHubLink}
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "sm",
                  radius: "sm",
                })
              )}
              target="_blank"
              aria-label={`${work.title} GitHub`}
            >
              <Icons.github />
              <span className="">GitHub</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
