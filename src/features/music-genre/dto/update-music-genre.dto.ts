import { PartialType } from '@nestjs/mapped-types';
import { CreateMusicGenreDto } from './create-music-genre.dto';

export class UpdateMusicGenreDto extends PartialType(CreateMusicGenreDto) {}
