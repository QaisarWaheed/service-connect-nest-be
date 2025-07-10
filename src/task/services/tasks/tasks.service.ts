import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Module from 'module';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/task/dto/create-task/create-task';
import { Tasks } from 'src/task/entity/tasks/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private readonly tasksModule: Model<Tasks>
  ) {}

  async createTask(data: CreateTaskDto) {
    const createTask = await this.tasksModule.create(data);
    return createTask;
  }

  async getTask(): Promise<Tasks[]> {
    const Tasks = await this.tasksModule.find();
    return Tasks;
  }
}
