export type UserEntity = {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    profile_image_url: string | null;
    bio: string | null;
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
    profileImage?: string | null;
    premium: boolean;
};

export type UserUpdateDTO = {
    username?: string;
    name?: string;
    email?: string;
    password?: string;
    profile_image_url?: string;
    premium?: boolean;
};

export type UserResponseDTO = {
    id: string;
    username: string;
    name: string;
    email: string;
    profile_image_url: string | null;
    bio: string | null;
    premium: boolean;
    role: 'USER' | 'ADMIN';
};
