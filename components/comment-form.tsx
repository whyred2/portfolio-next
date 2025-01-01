"use client";

import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/text-area";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { CommentSchema } from "@/lib/validations/comment";
import { toast } from "@/components/ui/use-toast";

type FormData = z.infer<typeof CommentSchema>;

interface Comment {
  id: number;
  userId: number;
  user: {
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
}

interface CommentFormProps {
  type: string;
  onAddComment: (type: string, newComment: Comment) => void;
}

export function CommentForm({ type, onAddComment }: CommentFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(CommentSchema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const response = await fetch("/api/comments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, type }),
    });

    setIsLoading(false);

    if (response.status === 403) {
      return toast({
        title: "Ошибка!",
        description: "Вы не авторизованы. Пожалуйста, войдите в систему.",
      });
    }

    if (!response.ok) {
      return toast({
        title: "Ошибка!",
        description: "Не удалось отправить сообщение. Попробуйте снова.",
      });
    }

    const newComment: Comment = await response.json();
    onAddComment(type, newComment);

    reset();

    return toast({
      title: "Успех!",
      description: "Ваше сообщение успешно отправлено.",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[800px] flex gap-3">
      <button
        type="button"
        onClick={() => reset()}
        className={cn(buttonVariants({ variant: "secondary" }))}
      >
        <Icons.eraser className="h-10 w-10" />
      </button>
      <div className="w-full">
        <Textarea
          className={cn(
            "max-h-[100px] resize-none text-xl",
            errors.message && "border-error"
          )}
          {...register("message")}
        />
        {errors?.message && (
          <p className="text-sm text-error">{errors.message?.message}</p>
        )}
      </div>

      <div className="flex flex-col justify-end gap-3">
        <button
          type="submit"
          className={cn(buttonVariants({ variant: "default" }), "h-full")}
        >
          {isLoading ? (
            <Icons.spinner className="animate-spin h-8 w-8" />
          ) : (
            <Icons.sendHorizontal className="h-10 w-10" />
          )}
        </button>
      </div>
    </form>
  );
}
