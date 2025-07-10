import { Module } from '@nestjs/common';
import TasksSchema, { Tasks } from './entity/tasks/tasks.entity';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './services/tasks/tasks.service';
import { TasksController } from './controllers/tasks/tasks.controller';
import { UserSchema } from 'src/account/entities/user/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tasks.name, schema: TasksSchema },
      { name: 'User.name', schema: UserSchema }
    ])
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TaskModule {}
