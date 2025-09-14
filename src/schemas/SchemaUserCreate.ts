import z from 'zod';

export const UserSchemaCreate = z.object({
    username: z.string().trim().min(3, 'Deve ter mais que 3 caracteres'),
    name: z.string().trim().min(2, 'Nome muito curto '),
    email: z.email({ message: 'Email inválido' }),
    password: z.string().min(8, 'Senha deve ter no minimo 8 caracteres'),
    profile_image_url: z.url().nullish(),
});
