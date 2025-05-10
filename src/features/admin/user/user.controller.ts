import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JoiValidationParamPipe } from 'src/cores/validators/pipes/joi-validation-param.pipe';
import { userIdParamSchema } from './validations/params/user-id.param';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createUserSchema } from './validations/requests/create-user.request';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/cores/guards/jwt-auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', new JoiValidationParamPipe(userIdParamSchema))
    id: number,
  ) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', new JoiValidationParamPipe(userIdParamSchema))
    id: number,
    @Body(new JoiValidationPipe(createUserSchema))
    updateUserDto: CreateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/profile-picture')
  @UseInterceptors(FileInterceptor('profile_file_path'))
  updateProfilePicture(
    @Param('id', new JoiValidationParamPipe(userIdParamSchema))
    id: number,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.userService.updateProfilePicture(+id, image);
  }

  @Delete(':id')
  delete(
    @Param('id', new JoiValidationParamPipe(userIdParamSchema))
    id: number,
  ) {
    return this.userService.delete(+id);
  }
}
