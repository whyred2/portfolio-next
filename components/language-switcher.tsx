'use client';

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";

import { HeaderItem } from "./ui/header-items";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";

import ru from "@/public/icons/ru.svg";
import ua from "@/public/icons/ua.svg";
import en from "@/public/icons/en.svg";
import jp from "@/public/icons/jp.svg";

const LANGUAGES = [
    { code: "ru", name: "Русский", flag: ru },
    { code: "ua", name: "Українська", flag: ua },
    { code: "en", name: "English", flag: en },
    { code: "jp", name: "日本語", flag: jp },
];

export default function ThemeSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    if (!router || !pathname) {
        return null;
    }

    const handleLanguageChange = (newLocale: string) => {
        if (newLocale === locale) return;
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPathname);
    };

    return(
        <HeaderItem>
            <Select defaultValue={locale} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                    <SelectValue>
                        <div className="flex items-center gap-3">
                            <Image
                                src={LANGUAGES.find((lang) => lang.code === locale)?.flag || ""}
                                alt={`${locale} flag`}
                                width={22}
                            />
                            <span>{locale.toUpperCase()}</span>
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {LANGUAGES.map((lang) => (
                        <SelectItem 
                            key={lang.code} 
                            value={lang.code} 
                            className={`${lang.code === locale ? 'bg-active' : ''}`}
                        >       
                            <div className="flex items-center gap-3">
                                <Image
                                    className="rounded min-w-6"
                                    src={lang.flag}
                                    alt={`${lang.name} flag`}
                                    width={22}
                                />
                                <span>{lang.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </HeaderItem>
    )
};