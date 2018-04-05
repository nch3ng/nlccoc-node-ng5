import { User } from './user';

export class AuthResponse {
    message: string;
    success: boolean;
    token: string;
    user: User;
}
