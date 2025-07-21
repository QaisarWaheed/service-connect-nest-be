import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { Request } from 'express';
import { CreateReviewDto } from '../dtos/CreateReview.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/account/guards/jwt-guard/jwt-guard.guard';
@ApiTags('Review')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/all-reviews')
  async findAllReviews() {
    return await this.reviewService.findReview();
  }

  @Get('/review-by-id/:id')
  async findReviewById(@Param('id') id: string) {
    return await this.reviewService.findReviewById(id);
  }

  @Post('create-review')
  async createReview(@Req() req: Request, @Body() data: CreateReviewDto) {
    return await this.reviewService.createReview({
      ...data,
      userId: req.user._id
    });
  }
}
