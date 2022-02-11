import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {   
    @IsEmail()
    title: string;

    @IsNotEmpty()
    content: string;
}