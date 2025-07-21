import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from '../entities/review.entity';
import { Model } from 'mongoose';
import { CreateReviewDto } from '../dtos/CreateReview.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>
  ) {}

  async findReview(): Promise<Review[] | null> {
    return await this.reviewModel.find();
  }

  async findReviewById(id: string): Promise<Review | null> {
    const review = await this.reviewModel.findById(id);
    if (!review) {
      throw new NotFoundException('No review Found against this Id');
    }
    return review;
  }

  async createReview(data: CreateReviewDto): Promise<Review> {
    return await this.reviewModel.create(data);
  }
}
