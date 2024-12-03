export type NavItem = {
    titleKey: string
    href: string
}

export type MainNavItem = NavItem

export type NavigationConfig = {
    mainNav: MainNavItem[]
}