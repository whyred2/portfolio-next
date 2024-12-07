"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import * as React from "react";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { getSignInSchema, getSignUpSchema } from "@/lib/validations/auth";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type SignInFormData = z.infer<ReturnType<typeof getSignInSchema>>;
type SignUpFormData = z.infer<ReturnType<typeof getSignUpSchema>>;

interface AuthFormProps {
  isSignUp: boolean;
}

export function UserAuthForm({ isSignUp }: AuthFormProps) {
  const router = useRouter();
  const t = useTranslations("Auth");
  const validation = useTranslations("Auth.Validation");
  const signInSchema = getSignInSchema(validation);
  const signUpSchema = getSignUpSchema(validation);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: SignInFormData | SignUpFormData) {
    setIsLoading(true);

    if (isSignUp) {
      const signUpData = data as SignUpFormData;
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });

      setIsLoading(false);

      if (res.status === 409) {
        return toast({
          title: t("Toast.error"),
          description: t("Toast.Description.signUpExists"),
        });
      } else if (!res?.ok) {
        return toast({
          title: t("Toast.error"),
          description: t("Toast.Description.signUpError"),
        });
      } else {
        router.replace("/sign-in");
        return toast({
          title: t("Toast.success"),
          description: t("Toast.Description.signUpSuccess"),
        });
      }
    } else {
      const signInData = data as SignInFormData;
      const res = await signIn("credentials", {
        redirect: false,
        email: signInData.email,
        password: signInData.password,
      });

      setIsLoading(false);

      if (res?.status === 401) {
        return toast({
          title: t("Toast.error"),
          description: t("Toast.Description.signInCredentials"),
        });
      } else if (!res?.ok) {
        return toast({
          title: t("Toast.error"),
          description: t("Toast.Description.signInError"),
        });
      } else {
        router.replace("/");
        return toast({
          title: t("Toast.success"),
          description: t("Toast.Description.signInSuccess"),
        });
      }
    }
  }

  return (
    <>
      <Button onClick={() => signIn("google")}>{t("google-btn")}</Button>
      <div className="relative">
        <div className="h-px bg-textSpan" />
        <span
          className="bg-background2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+1px)] text-center
          px-4 py-0.5 text-base leading-none"
        >
          {t("or")}
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-3">
          {isSignUp && (
            <div>
              <Label htmlFor="name">{t("name")}</Label>
              <Input id="name" placeholder={t("name")} {...register("name")} />
              {errors?.name && (
                <p className="text-size2 text-error">{errors.name.message}</p>
              )}
            </div>
          )}
          <div>
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-size2 text-error">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-size2 text-error">{errors.password.message}</p>
            )}
          </div>
          {isSignUp && (
            <div>
              <Label htmlFor="confirmPassword">{t("confirm-password")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                {...register("confirmPassword")}
              />
              {errors?.confirmPassword && (
                <p className="text-size2 text-error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              buttonVariants({ variant: isLoading ? "disabled" : "default" })
            )}
          >
            {isLoading && (
              <Icons.spinner className="animate-spin h-6 w-6 mr-2" />
            )}
            {isSignUp ? t("sign-up") : t("sign-in")}
          </button>
        </div>
      </form>
    </>
  );
}
