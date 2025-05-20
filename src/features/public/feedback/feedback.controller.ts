import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateFeedbackDto } from 'src/models/feedbacks/dto/create-feedback.dto';
import { UpdateFeedbackDto } from 'src/models/feedbacks/dto/update-feedback.dto';
import { FeedbackPublicService } from './feedback.service';
import { JwtPublicAuthGuard } from 'src/cores/guards/jwt-public-auth.guard';
import { JoiValidationPipe } from 'src/cores/validators/pipes/joi-validation.pipe';
import { createFeedbackSchema } from 'src/validators/requests/create-feedback.request';
import { CurrentUser } from 'src/cores/decorators/current-user.decorator';

@Controller()
export class FeedbackPublicController {
  constructor(private readonly feedbackService: FeedbackPublicService) {}

  @UseGuards(JwtPublicAuthGuard)
  @Post()
  create(
    @CurrentUser() user: any,
    @Body(new JoiValidationPipe(createFeedbackSchema))
    createFeedbackDto: CreateFeedbackDto,
  ) {
    return this.feedbackService.create(createFeedbackDto, user);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(+id, updateFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }
}
