import { Module } from '@nestjs/common';
import { ReviewController } from './controllers/review.controller';
import { ReviewService } from './services/review.service';
import { MongooseModule } from '@nestjs/mongoose';
import ReviewSchema, { Review } from './entities/review.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
