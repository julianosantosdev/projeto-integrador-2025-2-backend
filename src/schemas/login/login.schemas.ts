import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email('').nonempty(),
    password: z.string().nonempty(),
});
