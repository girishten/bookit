import { PartialType } from '@nestjs/swagger';
import { CreateHostpitalDto } from './create-hostpital.dto';

export class UpdateHostpitalDto extends PartialType(CreateHostpitalDto) {}
