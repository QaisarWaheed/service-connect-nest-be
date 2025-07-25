import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from '../entities/review.entity';
import { Model } from 'mongoose';
import { CreateSellerReviewDto } from '../dtos/CreateSellerReviewDto';
import { TasksService } from 'src/task/services/tasks/tasks.service';
import { CreateBuyerReview } from '../dtos/CreateBuyerReview.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    private readonly taskService: TasksService
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

  async createSellerReview(data: CreateSellerReviewDto): Promise<Review> {
    const task = await this.taskService.getTaskById(data.taskId);
    if (!task) {
      throw new NotFoundException('cannot found Task');
    }
    if (task?.sellerReview != null) {
      throw new ConflictException('cannot create duplicate reviews');
    } else {
      await this.taskService.updateSellerReview(task._id.toString(), {
        ...data
      });
    }
    if (data.ratings < 1) {
      throw new BadRequestException('rating cannot be less than 1');
    }
    if (data.ratings > 5) {
      throw new BadRequestException('rating cannot be greater than 5');
    }
    return await this.reviewModel.create({ ...data, ratings: data.ratings });
  }

  async createBuyerReview(data: CreateBuyerReview): Promise<Review> {
    console.log(data.taskId);
    const task = await this.taskService.getTaskById(data.taskId);
    if (!task) {
      throw new NotFoundException('cannot found Task');
    }
    if (task?.buyerReview != null) {
      throw new ConflictException('cannot create duplicate reviews');
    } else {
      await this.taskService.updateBuyerReview(task._id.toString(), {
        ...data
      });
    }
    if (data.ratings < 1) {
      throw new BadRequestException('rating cannot be less than 1');
    }
    if (data.ratings > 5) {
      throw new BadRequestException('rating cannot be greater than 5');
    }
    return await this.reviewModel.create({ ...data, ratings: data.ratings });
  }
}
