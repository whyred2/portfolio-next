import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { MainNavItem } from "@/types";
import { HeaderItem, NavigationItem } from '@/components/ui/header-items';

import { ThemeSwitcher } from './theme-switcher';
import LanguageSwitcher from './language-switcher';

interface MainNavProps {
    items?: MainNavItem[]
}

export function Header({ items }: MainNavProps) {
    const t = useTranslations('HeaderItemNav'); 

    return(
        <header className='container flex justify-between p-5'>
            {items?.length ? (
                <HeaderItem className='gap-5'>
                    {items?.map((item, index) => (
                        <NavigationItem
                            key={index}
                        >
                            {t(item.titleKey)} 
                        </NavigationItem>
                    ))}
                </HeaderItem>
            ) : ( null )}
            <LanguageSwitcher />
            <ThemeSwitcher />
        </header>
    )
}