export type NavItem = {
    titleKey: string
    href: string
}

export type MainNavItem = NavItem

export type NavigationConfig = {
    mainNav: MainNavItem[]
}




export type SkillsConfig = {
    skills: SkillsItem[]
}

export type SkillsItem = {
    title: string,
    description: string
}