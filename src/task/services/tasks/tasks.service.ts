import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Req
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';

import { Model } from 'mongoose';

import { MessageDto } from 'src/common/dtos/message.dto';
import { CreateTaskDto } from 'src/task/dto/create-task/create-task';
import { UpdateTaskDto } from 'src/task/dto/update-task/update-task';
import { Tasks } from 'src/task/entity/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private readonly tasksModel: Model<Tasks>
  ) {}

  async createTask(data: CreateTaskDto): Promise<Tasks> {
    try {
      const createTask = await this.tasksModel.create({
        ...data
      });

      return createTask;
    } catch (e) {
      throw new BadRequestException('Some thing went wrong');
    }
  }

  async getTask(): Promise<Tasks[]> {
    try {
      const Tasks = await this.tasksModel.find();
      return Tasks;
    } catch (e) {
      throw new NotFoundException('No tasks found');
    }
  }

  async getTaskById(userId: string): Promise<Tasks | null> {
    try {
      const getTask = await this.tasksModel.findById({ id: userId });
      if (!getTask) {
        throw new NotFoundException('No Task Found with this Id');
      }
      return getTask;
    } catch (e) {
      throw new NotFoundException('No task found against this ID');
    }
  }

  async updateTaskById(id: string, data: UpdateTaskDto): Promise<Tasks | null> {
    try {
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
    } catch (e) {
      throw new BadRequestException('Some thing went wrong');
    }
  }

  async deleteTaskById(@Req() req: Request, id: string): Promise<MessageDto> {
    try {
      await this.tasksModel.findByIdAndDelete(id);
      return { message: 'Task Deleted Successfully' };
    } catch (e) {
      throw new NotFoundException('No task found against this ID');
    }
  }
}
