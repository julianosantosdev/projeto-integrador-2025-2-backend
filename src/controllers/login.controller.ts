import { Request, Response } from 'express';
import { TLoginRequest } from '../interfaces/login.interface';
import { LoginService } from '../service/login/login.service';

export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    public async handleLogin(request: Request, response: Response): Promise<Response> {
        const payload: TLoginRequest = request.body;
        const token = this.loginService.login(payload);
        return response.status(200).json({ token });
    }
}
