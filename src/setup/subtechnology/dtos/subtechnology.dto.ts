import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubtechnologyDto {
  @ApiProperty({ example: '1', description: 'ID único de la subtecnología' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'REST API',
    description: 'Nombre de la subtecnología',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '[1, 2, 3]',
    description: 'IDs únicos de las tecnologías asociadas a esta subtecnología',
    type: [Number],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  technology: number[];

  @ApiProperty({
    example: 'admin',
    description: 'Usuario que crea la subtecnología',
  })
  @IsNotEmpty()
  @IsString()
  createBy: string;
}
