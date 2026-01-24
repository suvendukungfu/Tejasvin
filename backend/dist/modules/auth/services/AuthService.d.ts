import { IUserDocument } from '../models/User';
export declare class AuthService {
    /**
     * Registers a new user.
     */
    register(data: any): Promise<{
        user: IUserDocument;
        token: string;
    }>;
    /**
     * Authenticates a user.
     */
    login(email: string, password: string): Promise<{
        user: IUserDocument;
        token: string;
    }>;
    private generateToken;
}
