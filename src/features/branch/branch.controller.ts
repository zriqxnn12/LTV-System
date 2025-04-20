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
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { branchIdParamSchema } from './validations/params/branch-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createBranchSchema } from './validations/requests/create-branch.request';

@Controller()
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.branchService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(branchIdParamSchema)) id: number,
  ) {
    return this.branchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', new JoiValidationParamPipe(branchIdParamSchema)) id: number,
    @Body(new JoiValidationPipe(createBranchSchema))
    updateBranchDto: UpdateBranchDto,
  ) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(branchIdParamSchema)) id: number,
  ) {
    return this.branchService.remove(+id);
  }
}
