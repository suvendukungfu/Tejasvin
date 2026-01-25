import User, { IUserDocument } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
    /**
     * Registers a new user.
     */
    public async register(data: any): Promise<{ user: IUserDocument; token: string }> {
        const { name, email, password, role } = data;

        let user = await User.findOne({ email });
        if (user) {
            throw new Error('User already exists');
        }

        user = new User({ name, email, password, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = this.generateToken((user._id as any).toString());
        return { user, token };
    }

    /**
     * Authenticates a user.
     */
    public async login(email: string, password: string): Promise<{ user: IUserDocument; token: string }> {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid Credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password || '');
        if (!isMatch) {
            throw new Error('Invalid Credentials');
        }

        const token = this.generateToken((user._id as any).toString());
        return { user, token };
    }

    private generateToken(userId: string): string {
        const payload = { user: { id: userId } };
        return jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '360000' }
        );
    }
}
