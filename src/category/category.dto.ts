import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CategoryDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name: string;
}