import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { User } from 'src/account/entities/user/user';
import { MessageDto } from 'src/common/dtos/message.dto';
import { CreateTaskDto } from 'src/task/dto/create-task/create-task';
import { UpdateTaskDto } from 'src/task/dto/update-task/update-task';
import { Tasks } from 'src/task/entity/tasks/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private readonly tasksModule: Model<Tasks>,
    @InjectModel(User.name) private readonly userModule: Model<User>
  ) {}

  async createTask(id: string, data: CreateTaskDto): Promise<Tasks> {
    const user = await this.userModule.findById(id); // ✅ Corrected here
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const createTask = await this.tasksModule.create({
      ...data,
      user: user._id
    });

    return createTask;
  }

  async getTask(): Promise<Tasks[]> {
    const Tasks = await this.tasksModule.find();
    return Tasks;
  }

  async getTaskById(userId: string): Promise<Tasks | null> {
    const user = await this.userModule.findById({ userId });
    if (!user) {
      throw new NotFoundException();
    }

    const getTask = await this.tasksModule.findById({ id: user?._id });
    if (!getTask) {
      throw new NotFoundException('No Task Found with this Id');
    }
    return getTask;
  }

  async updateTaskById(id: string, data: UpdateTaskDto): Promise<Tasks | null> {
    const user = await this.userModule.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    const getAndUpdateTask = await this.tasksModule.findByIdAndUpdate(
      {
        user: user._id,
        data
      },
      { new: true }
    );
    if (!getAndUpdateTask) {
      throw new NotFoundException('No Task found against this Id');
    }
    return getAndUpdateTask;
  }

  async deleteTaskById(id: string): Promise<MessageDto> {
    const user = await this.userModule.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    await this.tasksModule.findByIdAndDelete(id);
    return { message: 'Task Deleted Successfuly' };
  }
}
