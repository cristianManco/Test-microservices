import { ApiProperty } from '@nestjs/swagger';

export class FilterTipsDto {
  @ApiProperty({
    type: [String],
    required: false,
    description: 'IDs of the technologies to filter by',
  })
  technology?: string[];

  @ApiProperty({
    type: [String],
    required: false,
    description: 'IDs of the subtechnologies to filter by',
  })
  subtechnology?: string[];

  @ApiProperty({
    type: [String],
    required: false,
    description: 'IDs of the languages to filter by',
  })
  lang?: string[];

  @ApiProperty({
    type: [String],
    required: false,
    description: 'IDs of the levels to filter by',
  })
  level?: string[];

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Number of tips to return',
  })
  limit: number;
}
