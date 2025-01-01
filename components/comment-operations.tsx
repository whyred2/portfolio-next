"use client";

import React from "react";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AlertHandler } from "@/components/alert-handler";
import { Icons } from "@/components/icons";
import { Comment } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";

interface CommentOperationsProps {
  comment: Pick<Comment, "id" | "userId" | "message" | "type">;
  onEdit: () => void;
  onComplain: () => void;
  onDelete: (commentId: number, commentType: string) => void;
}

export function CommentOperations({
  comment,
  onEdit,
  onComplain,
  onDelete,
}: CommentOperationsProps) {
  const { data: session, status } = useSession();

  const deleteComment = async (
    commentId: number,
    commentUserId: number,
    commentType: string,
    userId: number
  ) => {
    const response = await fetch(`/api/comments/${commentType}`, {
      method: "DELETE",
      body: JSON.stringify({ userId, commentUserId, commentId }),
    });

    if (!response.ok) {
      return toast({
        title: "Ошибка",
        description: "Не удалось удалить комментарий.",
      });
    }

    onDelete(commentId, commentType);
    return toast({
      title: "Успех",
      description: "Комментарий успешно удален.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-center bg-violet-600 p-2 rounded-sm">
          <Icons.ellipsis />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {status === "authenticated" && (
          <>
            {session?.user.id === comment.userId ? (
              <DropdownMenuItem onClick={onEdit}>
                <Icons.pencil />
                <span>Редактировать</span>
              </DropdownMenuItem>
            ) : null}
            {(session?.user.id === comment.userId ||
              session?.user.role === "admin") && (
              <>
                <AlertHandler
                  title="Удалить комментарий"
                  description="Вы уверены, что хотите удалить этот комментарий?"
                  trigger={
                    <button className="w-full flex items-center gap-3 px-[20px] h-[50px] transition-bg duration-300 hover:bg-secondaryHover active:bg-active active:transition-none">
                      <Icons.trash />
                      <span>Удалить</span>
                    </button>
                  }
                  onConfirm={() =>
                    deleteComment(
                      comment.id,
                      comment.userId,
                      comment.type,
                      Number(session.user.id)
                    )
                  }
                />
              </>
            )}
          </>
        )}
        {session?.user.id === comment.userId ? null : (
          <DropdownMenuItem onClick={onComplain}>
            <Icons.flag />
            <span>Пожаловаться</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
