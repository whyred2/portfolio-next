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

//----------------------------------------------

export interface WorksConfig {
    works: WorksItem[]
}

export interface WorksItem {
    id: number;
    title: string;
    description: string;
    features: string[];
    libraries: string[];
    logoImage: string;
    logoWidth: number;
    video?: string;
    demoLink?: string;
    gitHubLink?: string;
    youtubeLink?: string;
    href: string;
}