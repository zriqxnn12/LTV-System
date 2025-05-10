import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Instrument } from '../../../models/instruments/entities/instrument.entity';

@Module({
  imports: [SequelizeModule.forFeature([Instrument])],
  controllers: [InstrumentController],
  providers: [InstrumentService],
})
export class InstrumentModule {}
