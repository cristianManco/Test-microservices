import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLangDto {
  @ApiProperty({ example: '1', description: 'ID único del lenguaje' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'Spanish', description: 'Nombre del lenguaje' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'admin',
    description: 'Usuario que crea el lenguaje',
  })
  @IsNotEmpty()
  @IsString()
  createBy: string;
}
