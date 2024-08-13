import { Continents } from "@app/types/enum/continents.enum";
import { IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsEnum(Continents, { each: true })
  @IsOptional()
  continent: Continents | null;

  @IsOptional()
  birthDate: string;
}
