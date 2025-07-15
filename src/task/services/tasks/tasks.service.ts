import { Body, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';

import { Model } from 'mongoose';

import { MessageDto } from 'src/common/dtos/message.dto';
import { CreateTaskDto } from 'src/task/dto/create-task/create-task';
import { UpdateTaskDto } from 'src/task/dto/update-task/update-task';
import { Tasks } from 'src/task/entity/tasks/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private readonly tasksModel: Model<Tasks>
  ) {}

  async createTask(data: CreateTaskDto): Promise<Tasks> {
    const createTask = await this.tasksModel.create({
      ...data
    });

    return createTask;
  }

  async getTask(): Promise<Tasks[]> {
    const Tasks = await this.tasksModel.find();
    return Tasks;
  }

  async getTaskById(userId: string): Promise<Tasks | null> {
    const getTask = await this.tasksModel.findById({ id: userId });
    if (!getTask) {
      throw new NotFoundException('No Task Found with this Id');
    }
    return getTask;
  }

  async updateTaskById(id: string, data: UpdateTaskDto): Promise<Tasks | null> {
    const getAndUpdateTask = await this.tasksModel.findByIdAndUpdate(
      {
        id
      },
      { ...data },
      { new: true }
    );
    if (!getAndUpdateTask) {
      throw new NotFoundException('No Task found against this Id');
    }
    return getAndUpdateTask;
  }

  async deleteTaskById(@Req() req: Request, id: string): Promise<MessageDto> {
    await this.tasksModel.findByIdAndDelete(id);
    return { message: 'Task Deleted Successfully' };
  }
}
