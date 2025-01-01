export type NavigationConfig = {
    mainNav: MainNavItem[]
}

export type MainNavItem = NavItem

export type NavItem = {
    titleKey: string
    href: string
}

//----------------------------------------------

export type SkillsConfig = {
    skills: SkillsItem[]
}

export type SkillsItem = {
    title: string,
    description: string
}

//----------------------------------------------

export interface Comment {
    name: string;
    comment: string;
    date: string;
    image: string;
}

export interface CommentSection {
    questions: Comment[];
    wishes: Comment[];
    reviews: Comment[];
}

export interface CommentsConfig {
    comments: CommentSection[];
}