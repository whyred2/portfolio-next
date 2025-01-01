import React from "react";

import { CommentOperations } from "./comment-operations";
import { formatDate } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/text-area";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface CommentItemProps {
  comment: {
    id: number;
    userId: number;
    user: {
      name: string;
      image: string;
    };
    content: string;
    createdAt: string;
  };
  type: string;
  onComplain: (commentId: number, commentType: string) => void;
  onUpdate: (
    commentType: string,
    updatedComment: CommentItemProps["comment"]
  ) => void;
  onDelete: (commentId: number, commentType: string) => void;
}

export default function CommentItem({
  comment,
  type,
  onComplain,
  onUpdate,
  onDelete,
}: CommentItemProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [editedContent, setEditedContent] = React.useState<string>(
    comment.content
  );

  const handleEditCancel = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  const handleEditSave = async (
    message: string,
    commentId: number,
    type: string
  ) => {
    setIsLoading(true);
    const response = await fetch(`/api/comments/${type}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentId, message }),
    });

    setIsLoading(false);

    if (!response.ok) {
      console.error("Failed to update comment");
      toast({
        title: "Ошибка",
        description: "Не удалось обновить комментарий.",
      });
      return;
    }

    const updatedComment: Comment = {
      ...comment,
      content: editedContent,
    };

    onUpdate(type, updatedComment);
    toast({
      title: "Успех",
      description: "Комментарий успешно обновлен.",
    });

    setIsEditing(false);
  };

  return (
    <>
      <div className="flex items-start gap-5 p-3 border-2 border-white/20 rounded-md justify-between">
        <div className="flex gap-5">
          <UserAvatar user={{ image: comment.user.image || null }} />
          <div className="flex flex-col gap-1 w-[640px]">
            <div className="flex justify-between items-center text-base">
              <div>{comment.user.name}</div>
              <div className="text-white/90">
                {formatDate(comment.createdAt)}
              </div>
            </div>
            {isEditing ? (
              <Textarea
                value={editedContent}
                className="resize-none max-h-5 text-lg"
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              <div className="w-full break-words text-lg">
                {comment.content}
              </div>
            )}
            {isEditing && (
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleEditCancel}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "xs",
                  })}
                >
                  Отменить
                </button>
                <button
                  onClick={() =>
                    handleEditSave(editedContent, comment.id, type)
                  }
                  className={buttonVariants({ variant: "default", size: "xs" })}
                >
                  {isLoading ? (
                    <Icons.spinner className="animate-spin" />
                  ) : (
                    "Сохранить"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        <CommentOperations
          comment={{
            id: comment.id,
            userId: comment.userId,
            message: comment.content,
            type: type,
          }}
          onEdit={() => setIsEditing(true)}
          onComplain={() => onComplain(comment.id, type)}
          onDelete={onDelete}
        />
      </div>
    </>
  );
}

CommentItem.Skeleton = function CommentItemSkeleton() {
  return (
    <div className="flex items-start gap-5 p-3 border-2 border-white/20 rounded-md justify-between">
      <Skeleton className="h-10 w-10 rounded-full flex-none" />
      <div className="flex flex-col gap-1 w-full">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-10 w-10 flex-none" />
    </div>
  );
};
