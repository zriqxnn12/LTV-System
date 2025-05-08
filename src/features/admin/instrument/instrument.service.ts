import { Injectable } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Instrument } from './entities/instrument.entity';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';

@Injectable()
export class InstrumentService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(Instrument)
    private instrumentModel: typeof Instrument,
  ) {}

  async create(createInstrumentDto: CreateInstrumentDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const instrument = await this.instrumentModel.create(
        { ...createInstrumentDto },
        { transaction },
      );
      await transaction.commit();
      return this.response.success(
        instrument,
        201,
        'Successfully create instrument',
      );
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating instrument:', error);
      return this.response.fail('Failed to create instrument', 400);
    }
  }

  async findAll(query: any) {
    const { count, data } = await new QueryBuilderHelper(
      this.instrumentModel,
      query,
    ).getResult();

    const result = {
      count: count,
      instruments: data,
    };
    return this.response.success(
      result,
      200,
      'Successfully retrieve instruments',
    );
  }

  async findOne(id: number) {
    try {
      const user = await this.instrumentModel.findOne({
        where: { id },
      });

      return this.response.success(
        user,
        200,
        'Successfully retrieve instrument',
      );
    } catch (error) {
      return this.response.fail('Failed retrieve instrument', 400);
    }
  }

  async update(id: number, updateInstrumentDto: UpdateInstrumentDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const instrument = await this.instrumentModel.findByPk(id);
      await instrument.update(updateInstrumentDto, { transaction });
      await transaction.commit();
      return this.response.success(
        instrument,
        200,
        'Successfully update instruments',
      );
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed to update instrument', 400);
    }
  }

  async remove(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.instrumentModel.destroy({ where: { id: id }, transaction });
      await transaction.commit();
      return this.response.success({}, 200, 'Successfully delete instruments');
    } catch (error) {
      await transaction.rollback();
      return this.response.fail('Failed delete instruments', 400);
    }
  }
}
