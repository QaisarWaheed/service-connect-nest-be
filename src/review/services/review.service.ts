import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from '../entities/review.entity';
import { Model } from 'mongoose';
import { CreateReviewDto } from '../dtos/CreateReview.dto';
import { TasksService } from 'src/task/services/tasks/tasks.service';

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

  async createReview(data: CreateReviewDto): Promise<Review> {
    console.log(data.taskId);
    const task = await this.taskService.getTaskById(data.taskId);
    console.log(task);
    if (task?.taskStatus !== 'Completed') {
      throw new BadRequestException('Task is not completed');
    }
    if (data.rating < 1) {
      throw new BadRequestException('rating cannot be less than 1');
    }
    if (data.rating > 5) {
      throw new BadRequestException('rating cannot be greater than 5');
    }
    return await this.reviewModel.create({ ...data, ratings: data.rating });
  }
}
