import { Review } from './../entities/review.entity';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { Request } from 'express';
import { CreateSellerReviewDto } from '../dtos/CreateSellerReviewDto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/account/guards/jwt-guard/jwt-guard.guard';
import { TasksService } from 'src/task/services/tasks/tasks.service';
import { CreateBuyerReview } from '../dtos/CreateBuyerReview.dto';
import { UpdateReviewDto } from 'src/task/dto/update-task/update-review.dto';
@ApiTags('Review')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly taskService: TasksService
  ) {}

  @Get('/all-reviews')
  async findAllReviews() {
    return await this.reviewService.findReview();
  }

  @Get('/review-by-id/:id')
  async findReviewById(@Param('id') id: string) {
    return await this.reviewService.findReviewById(id);
  }

  @Post('create-review-buyer')
  async createBuyerReview(
    @Req() req: Request,
    @Body() data: CreateBuyerReview
  ) {
    const task = await this.taskService.getTaskById(data.taskId);
    if (!task) {
      throw new NotFoundException('No Task Found against this Id');
    }
    if (!task.delivered || task.taskStatus !== 'Completed') {
      throw new BadRequestException('Task is not Completed Yet');
    }

    if (req.user.role !== 'Buyer')
      throw new UnauthorizedException('Buyer cannot create Seller Review');
    await this.taskService.updateBuyerReview(data.taskId, { ...data });

    return await this.reviewService.createBuyerReview({
      ...data,

      userId: req.user._id
    });
  }

  @Post('create-review-seller')
  async createSellerReview(
    @Req() req: Request,
    @Body() data: CreateSellerReviewDto
  ) {
    const task = await this.taskService.getTaskById(data.taskId);

    if (!task) {
      throw new NotFoundException('No Task Found against this Id');
    }

    if (!task.delivered || task.taskStatus !== 'Completed') {
      throw new BadRequestException('Task is not Completed Yet');
    }

    if (req.user.role !== 'Seller')
      throw new UnauthorizedException('Buyer cannot create Seller Review');
    await this.taskService.updateSellerReview(data.taskId, { ...data });

    return await this.reviewService.createSellerReview({
      ...data,
      userId: req.user._id
    });
  }
}
