export interface User {
    user_id: number | null;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    url: string;
    role_id_fk: number;
    created_at: string; 
    created_by: string;
    updated_at: string; 
    updated_by: string;
    deleted: boolean;
}
