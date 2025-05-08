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
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { createInstrumentSchema } from './validations/requests/create-instrument.request';
import { instrumentIdParamSchema } from './validations/params/instrument-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';

@Controller()
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Post()
  async create(@Body() createInstrumentDto: CreateInstrumentDto) {
    return this.instrumentService.create(createInstrumentDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.instrumentService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(instrumentIdParamSchema))
    id: number,
  ) {
    return this.instrumentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new JoiValidationParamPipe(instrumentIdParamSchema))
    id: number,
    @Body(new JoiValidationPipe(createInstrumentSchema))
    updateInstrumentDto: UpdateInstrumentDto,
  ) {
    return this.instrumentService.update(+id, updateInstrumentDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(instrumentIdParamSchema))
    id: number,
  ) {
    return this.instrumentService.remove(+id);
  }
}
