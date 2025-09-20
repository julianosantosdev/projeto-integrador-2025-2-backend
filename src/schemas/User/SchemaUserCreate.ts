import z, { email, ZodObject } from 'zod';

export const UserSchemaCreate = z.object({
    username: z.string().trim().min(3, 'Deve ter mais que 3 caracteres'),
    name: z.string().trim().min(2, 'Nome muito curto '),
    email: z.email({ message: 'Email inválido' }),
    password: z.string().min(6, 'Senha deve ter no minimo 6 caracteres'),
    profile_image_url: z.url().nullish(),
});

export const UserSchemaUpdate = z.object({
    username: z.string().trim().min(3, 'Deve ter mais que 3 caracteres').optional(),
    name: z.string().trim().min(2, 'Nome muito curto ').optional(),
    email: z.email({ message: 'Email inválido' }).optional(),
    password: z.string().min(6, 'Senha deve ter no minimo 6 caracteres').optional(),
    profile_image_url: z.url().nullish().optional(),
    premium: z.boolean().optional(),
});

export const UserSchemaEmail = z.object({
    email: z.email({ message: 'E-mail inválido' }),
});
