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
import { BranchService } from './branch.service';
import { CreateBranchDto } from '../../../models/branches/dto/create-branch.dto';
import { UpdateBranchDto } from '../../../models/branches/dto/update-branch.dto';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createBranchSchema } from '../../../validators/requests/create-branch.request';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';
import { branchIdParamSchema } from 'src/validators/params/branch-id.param';

@Controller()
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(new JoiValidationPipe(createBranchSchema))
    createBranchDto: CreateBranchDto,
  ) {
    return this.branchService.create(createBranchDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.branchService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(branchIdParamSchema)) id: number,
  ) {
    return this.branchService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new JoiValidationParamPipe(branchIdParamSchema)) id: number,
    @Body(new JoiValidationPipe(createBranchSchema))
    updateBranchDto: UpdateBranchDto,
  ) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', new JoiValidationParamPipe(branchIdParamSchema)) id: number,
  ) {
    return this.branchService.remove(+id);
  }
}
