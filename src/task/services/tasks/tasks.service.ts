import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { User } from 'src/account/entities/user/user';
import { CreateTaskDto } from 'src/task/dto/create-task/create-task';
import { UpdateTaskDto } from 'src/task/dto/update-task/update-task';
import { Tasks } from 'src/task/entity/tasks/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private readonly tasksModule: Model<Tasks>,
    @InjectModel(User.name) private readonly userModule: Model<User>
  ) {}

  async createTask(data: CreateTaskDto): Promise<Tasks> {
    const createTask = await this.tasksModule.create(data);
    return createTask;
  }

  async getTask(): Promise<Tasks[]> {
    const Tasks = await this.tasksModule.find();
    return Tasks;
  }

  async getTaskById(id: string): Promise<Tasks | null> {
    const user = await this.userModule.findById({ id });
    const getTask = await this.tasksModule.findById({ id: user?._id });
    if (!getTask) {
      throw new NotFoundException('No Task Found with this Id');
    }
    return getTask;
  }

  async updateTaskById(id: string, data: UpdateTaskDto): Promise<Tasks | null> {
    const getAndUpdateTask = await this.tasksModule.findByIdAndUpdate({
      id,
      data
    });
    if (!getAndUpdateTask) {
      throw new NotFoundException('No Task found against this Id');
    }
    return getAndUpdateTask;
  }

  async deleteTaskById(id: string) {
    await this.tasksModule.findByIdAndDelete(id);
  }
}
