import { z } from 'zod';
import { loginSchema } from '../schemas/login/login.schemas';

export type TLoginRequest = z.infer<typeof loginSchema>;
