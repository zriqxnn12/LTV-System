import { Injectable } from '@nestjs/common';
import { CreateMusicGenreDto } from '../../../models/music-genres/dto/create-music-genre.dto';
import { UpdateMusicGenreDto } from '../../../models/music-genres/dto/update-music-genre.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './entities/music-genre.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class MusicGenreService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Genre)
    private musicGenreModel: typeof Genre,
  ) {}

  async create(createMusicGenreDto: CreateMusicGenreDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const musicGenre = await this.musicGenreModel.create(
        { ...createMusicGenreDto },
        { transaction },
      );
      await transaction.commit();
      return this.response.success(
        musicGenre,
        201,
        'Successfully create music genre',
      );
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating genre:', error);
      return this.response.fail('Failed to create music genre', 400);
    }
  }

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.musicGenreModel,
      query,
    ).getResult();

    const result = {
      count: count,
      genres: data,
    };
    return this.response.success(
      result,
      200,
      'Successfully retrieve music genres',
    );
  }

  async findOne(id: number) {
    try {
      const genre = await this.musicGenreModel.findOne({
        where: { id },
      });

      return this.response.success(
        genre,
        200,
        'Successfully retrieve music genre',
      );
    } catch (error) {
      return this.response.fail('Failed retrieve music genre', 400);
    }
  }

  async update(id: number, updateMusicGenreDto: UpdateMusicGenreDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const genre = await this.musicGenreModel.findByPk(id);
      await genre.update(updateMusicGenreDto, { transaction });
      await transaction.commit();
      return this.response.success(
        genre,
        200,
        'Successfully update music genre',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update music genre', 400);
    }
  }

  async remove(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.musicGenreModel.destroy({ where: { id: id }, transaction });
      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete music genre');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to delete music genre', 400);
    }
  }
}
