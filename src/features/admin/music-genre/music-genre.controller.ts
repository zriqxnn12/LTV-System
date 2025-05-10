import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { MusicGenreService } from './music-genre.service';
import { CreateMusicGenreDto } from '../../../models/music-genres/dto/create-music-genre.dto';
import { UpdateMusicGenreDto } from '../../../models/music-genres/dto/update-music-genre.dto';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { musicGenreIdParamSchema } from './validations/params/music-genre-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createMusicGenreSchema } from './validations/requests/create-music-genre.request';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';

@Controller()
export class MusicGenreController {
  constructor(private readonly musicGenreService: MusicGenreService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMusicGenreDto: CreateMusicGenreDto) {
    return this.musicGenreService.create(createMusicGenreDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.musicGenreService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(musicGenreIdParamSchema))
    id: number,
  ) {
    return this.musicGenreService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new JoiValidationParamPipe(musicGenreIdParamSchema))
    id: number,
    @Body(new JoiValidationPipe(createMusicGenreSchema))
    updateMusicGenreDto: UpdateMusicGenreDto,
  ) {
    return this.musicGenreService.update(+id, updateMusicGenreDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(musicGenreIdParamSchema))
    id: number,
  ) {
    return this.musicGenreService.remove(+id);
  }
}
