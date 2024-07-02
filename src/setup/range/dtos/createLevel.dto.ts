import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLevelDto {
  @ApiProperty({ example: '1', description: 'ID único del nivel' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'Junior', description: 'Nombre del nivel' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'admin', description: 'Usuario que crea el nivel' })
  @IsNotEmpty()
  @IsString()
  createBy: string;
}
