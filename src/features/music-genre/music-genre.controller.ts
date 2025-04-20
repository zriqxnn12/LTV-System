import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MusicGenreService } from './music-genre.service';
import { CreateMusicGenreDto } from './dto/create-music-genre.dto';
import { UpdateMusicGenreDto } from './dto/update-music-genre.dto';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { musicGenreIdParamSchema } from './validations/params/music-genre-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createMusicGenreSchema } from './validations/requests/create-music-genre.request';

@Controller()
export class MusicGenreController {
  constructor(private readonly musicGenreService: MusicGenreService) {}

  @Post()
  create(@Body() createMusicGenreDto: CreateMusicGenreDto) {
    return this.musicGenreService.create(createMusicGenreDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.musicGenreService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(musicGenreIdParamSchema))
    id: number,
  ) {
    return this.musicGenreService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', new JoiValidationParamPipe(musicGenreIdParamSchema))
    id: number,
    @Body(new JoiValidationPipe(createMusicGenreSchema))
    updateMusicGenreDto: UpdateMusicGenreDto,
  ) {
    return this.musicGenreService.update(+id, updateMusicGenreDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(musicGenreIdParamSchema))
    id: number,
  ) {
    return this.musicGenreService.remove(+id);
  }
}
