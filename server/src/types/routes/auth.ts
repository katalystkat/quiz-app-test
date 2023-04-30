export interface AuthLoginBody {
    username: string;
    password: string;
}

export interface AuthLoginResponse {
    id: string;
    username: string;
    email: string;
}