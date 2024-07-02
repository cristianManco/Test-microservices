import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUserLog.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
