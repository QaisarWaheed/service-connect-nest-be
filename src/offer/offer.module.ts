import { Module } from '@nestjs/common';
import { OfferController } from './controllers/offer.controller';
import { OfferService } from './services/offer.service';
import { MongooseModule } from '@nestjs/mongoose';
import OfferSchema, { Offer } from './entities/offer.entity';
import TasksSchema, { Tasks } from 'src/task/entity/tasks.entity';
import { TasksService } from 'src/task/services/tasks/tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offer.name, schema: OfferSchema },
      { name: Tasks.name, schema: TasksSchema }
    ])
  ],
  controllers: [OfferController],
  providers: [OfferService, TasksService]
})
export class OfferModule {}
