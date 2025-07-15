import { Module } from '@nestjs/common';
import TasksSchema, { Tasks } from './entity/tasks/tasks.entity';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './services/tasks/tasks.service';
import { TasksController } from './controllers/tasks/tasks.controller';
import { User, UserSchema } from 'src/account/entities/user/user';
import { AccountModule } from 'src/account/account.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }])
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TaskModule {}
