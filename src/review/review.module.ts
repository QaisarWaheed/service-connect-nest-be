import { Module } from '@nestjs/common';
import { ReviewController } from './controllers/review.controller';
import { ReviewService } from './services/review.service';
import { MongooseModule } from '@nestjs/mongoose';
import ReviewSchema, { Review } from './entities/review.entity';
import { TasksService } from 'src/task/services/tasks/tasks.service';
import TasksSchema, { Tasks } from 'src/task/entity/tasks.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Tasks.name, schema: TasksSchema }
    ])
  ],
  controllers: [ReviewController],
  providers: [ReviewService, TasksService]
})
export class ReviewModule {}
