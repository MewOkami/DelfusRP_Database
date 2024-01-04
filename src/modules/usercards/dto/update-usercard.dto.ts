import { PartialType } from '@nestjs/mapped-types';
import { CreateUsercardDto } from './create-usercard.dto';

export class UpdateUsercardDto extends PartialType(CreateUsercardDto) {}
