import * as z from "zod";

export const getSignInSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({ message: t("invalidEmail") }),
    password: z.string().min(6, { message: t("passwordMinLength") }),
  });

export const getSignUpSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, { message: t("nameRequired") }),
    email: z.string().email({ message: t("invalidEmail") }),
    password: z.string().min(6, { message: t("passwordMinLength") }),
    confirmPassword: z
      .string()
      .min(6, { message: t("confirmPasswordMinLength") }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t("passwordsDoNotMatch"),
    path: ["confirmPassword"],
  });
