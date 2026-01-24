import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.authService.register(req.body);
            res.json(result);
        } catch (err: any) {
            console.error(err.message);
            res.status(400).json({ msg: err.message });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.json(result);
        } catch (err: any) {
            console.error(err.message);
            res.status(400).json({ msg: err.message });
        }
    }
}
