import Link from 'next/link'

import { MainNavItem } from "@/types";

interface MainNavProps {
    items?: MainNavItem[]
}

export function Header({ items }: MainNavProps) {
    return(
        <header className='container h-10'>
            {items?.length ? (
                <div>
                    {items?.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                        >
                            {item.title}asd
                        </Link>
                    ))}
                </div>
            ) : ( null )}
        </header>
    )
}