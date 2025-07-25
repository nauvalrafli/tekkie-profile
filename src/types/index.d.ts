import type { LucideIcon } from 'lucide-vue-next';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export type BreadcrumbItemType = BreadcrumbItem;

export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    errors?: Record<string, string[]>;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface RegisterResponse {
    user: User;
    token: string;
}
