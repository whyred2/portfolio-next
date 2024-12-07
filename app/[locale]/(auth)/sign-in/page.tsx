import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";

interface MetadataProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "Auth.SignIn" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function SignIn() {
  const authTranslations = useTranslations("Auth");
  const signInTranslations = useTranslations("Auth.SignIn");

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "absolute left-5 top-5 w-auto h-auto p-3 gap-3 rounded-lg backdrop-blur backdrop-saturate-200"
        )}
      >
        <Icons.arrowLeft size={32} />
        <span>{authTranslations("back")}</span>
      </Link>
      <div className="bg-background2 flex flex-col gap-8 rounded-2xl p-5 w-[30rem] z-10">
        <header className="flex flex-col justify-center gap-2">
          <h1 className="text-center text-xl font-semibold">
            {signInTranslations("form-title")}
          </h1>
          <p className="text-textSpan text-center text-base font-normal">
            {signInTranslations("form-description")}
          </p>
        </header>

        <UserAuthForm isSignUp={false} />
      </div>

      <div className="mt-[-1.5rem] pt-[1.5rem] bg-background3 text-size3 rounded-2xl w-[30rem]">
        <div className={`flex items-center justify-center gap-2 px-4 py-4`}>
          <span>{signInTranslations("no-account")}</span>
          <Link
            href="/sign-up"
            className="text-linkColor hover:text-linkColorHover"
          >
            {signInTranslations("sign-up")}
          </Link>
        </div>
      </div>
    </div>
  );
}
