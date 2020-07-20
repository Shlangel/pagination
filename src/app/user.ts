export interface UserResponse {
    data: User[],
    total_pages: number;
    per_page: number;
    page: number;
    total: number;
}

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}