import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { userIdParamSchema } from './validations/params/user-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createUserSchema } from './validations/requests/create-user.request';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', new JoiValidationParamPipe(userIdParamSchema))
    id: number,
  ) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id', new JoiValidationParamPipe(userIdParamSchema))
    id: number,
    @Body(new JoiValidationPipe(createUserSchema))
    updateUserDto: CreateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', new JoiValidationParamPipe(userIdParamSchema))
    id: number,
  ) {
    return this.userService.delete(+id);
  }
}
