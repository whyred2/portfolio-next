"use client";

import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/text-area";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

import { SendMailSchema } from "@/lib/validations/send-mail";

type FormData = z.infer<typeof SendMailSchema>;

export function MailForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(SendMailSchema) });

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/users/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки сообщения");
      }

      toast({
        title: "Успех!",
        description: "Ваше сообщение успешно отправлено.",
      });
    } catch (error) {
      toast({
        title: "Ошибка!",
        description: "Не удалось отправить сообщение. Попробуйте снова.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="backdrop-blur shadow-lg filter-blur border border-border rounded-lg w-5/12 p-5 grid gap-3"
    >
      <h2>Форму:</h2>
      <div className="grid gap-3">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Имя"
              type="text"
              className={errors.name && "border-error"}
              {...register("name")}
            />
            {errors?.name && (
              <p className="text-sm text-error">{errors.name?.message}</p>
            )}
          </div>
          <div className="flex-1">
            <Input
              placeholder="Почта"
              type="email"
              className={errors.email && "border-error"}
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-sm text-error">{errors.email?.message}</p>
            )}
          </div>
        </div>
        <div>
          <Textarea
            placeholder="Сообщение"
            className={errors.message && "border-error"}
            {...register("message")}
          />
          {errors?.message && (
            <p className="text-sm text-error">{errors.message?.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className={cn(
          buttonVariants({ variant: isLoading ? "disabled" : "default" }),
          "w-full rounded-md"
        )}
      >
        {isLoading && <Icons.spinner className="animate-spin mr-3 h-8 w-8" />}
        Отправить
      </button>
    </form>
  );
}
