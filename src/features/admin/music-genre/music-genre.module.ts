import { Module } from '@nestjs/common';
import { MusicGenreService } from './music-genre.service';
import { MusicGenreController } from './music-genre.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genre } from './entities/music-genre.entity';
@Module({
  imports: [SequelizeModule.forFeature([Genre])],
  controllers: [MusicGenreController],
  providers: [MusicGenreService],
})
export class MusicGenreModule {}
