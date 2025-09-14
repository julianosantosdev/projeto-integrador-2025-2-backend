export type User = {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    profile_image_url: string;
    bio: string;
    premium: boolean;
    role: role;
    created_at: Date;
};

type role = 'USER' | 'ADMIN';

export type UserCreateDTO = {
    username: string;
    name: string;
    email: string;
    password: string;
    profileImage: string;
    premium: boolean;
};
