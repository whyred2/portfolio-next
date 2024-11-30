import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

import { navigationConfig } from '@/config/nav'

import { Header } from '@/components/header'
import "./styles/globals.css";
import ThemeSwitcher from "@/components/theme-switcher";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background antialiased",
          nunito.className
      )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header items={navigationConfig.mainNav}/>
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
