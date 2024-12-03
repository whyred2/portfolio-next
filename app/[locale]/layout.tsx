import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider";
import { navigationConfig } from '@/config/nav'
import { Header } from '@/components/header'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import "../styles/globals.css";

const nunito = Nunito({
  weight: "700",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    title: "Create Next App",
    description: "Generated by create next app",
  },
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "whyred",
    },
  ],
  creator: "whyred",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background antialiased",
          nunito.className
      )}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header items={navigationConfig.mainNav}/>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}