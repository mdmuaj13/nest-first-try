export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified?: Date;
    socialType?: string;
    socialId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}