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
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from '../../../models/instruments/dto/create-instrument.dto';
import { UpdateInstrumentDto } from '../../../models/instruments/dto/update-instrument.dto';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { createInstrumentSchema } from './validations/requests/create-instrument.request';
import { instrumentIdParamSchema } from './validations/params/instrument-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';

@Controller()
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createInstrumentDto: CreateInstrumentDto) {
    return this.instrumentService.create(createInstrumentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.instrumentService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(instrumentIdParamSchema))
    id: number,
  ) {
    return this.instrumentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new JoiValidationParamPipe(instrumentIdParamSchema))
    id: number,
    @Body(new JoiValidationPipe(createInstrumentSchema))
    updateInstrumentDto: UpdateInstrumentDto,
  ) {
    return this.instrumentService.update(+id, updateInstrumentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(instrumentIdParamSchema))
    id: number,
  ) {
    return this.instrumentService.remove(+id);
  }
}
