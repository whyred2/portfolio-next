export type NavItem = {
    title: string
    href: string
}

export type MainNavItem = NavItem

export type NavigationConfig = {
    mainNav: MainNavItem[]
}