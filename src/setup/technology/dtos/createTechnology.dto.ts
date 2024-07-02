import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnologyDto {
  @ApiProperty({ example: '1', description: 'ID único de la tecnología' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'NestJS', description: 'Nombre de la tecnología' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '[1, 2, 3]',
    description: 'IDs únicos de las subtecnologías asociadas a esta tecnología',
    type: [Number],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  subtechnology: number[];

  @ApiProperty({
    example: 'admin',
    description: 'Usuario que crea la tecnología',
  })
  @IsNotEmpty()
  @IsString()
  createBy: string;
}
