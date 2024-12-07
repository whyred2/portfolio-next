import { User } from "@prisma/client";
import Image from "next/image";

import { Icons } from "@/components/icons";

interface UserAvatarProps {
  user: Pick<User, "image">;
}

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="flex h-10 w-10 overflow-hidden rounded-full bg-secondary hover:bg-secondaryHover transition-bg duration-300">
      {user.image ? (
        <Image alt="avatar" src={user.image} width={40} height={40} />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full">
          <Icons.user className="h-8 w-8" />
        </div>
      )}
    </div>
  );
}
