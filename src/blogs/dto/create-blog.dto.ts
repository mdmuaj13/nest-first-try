import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {   
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}