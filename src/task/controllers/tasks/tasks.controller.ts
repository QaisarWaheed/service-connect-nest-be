import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/account/guards/jwt-guard/jwt-guard.guard';
import { CreateTaskDto } from 'src/task/dto/create-task/create-task';
import { TasksService } from 'src/task/services/tasks/tasks.service';
import { Request } from 'express';
import { UpdateTaskDto } from 'src/task/dto/update-task/update-task';
import { UpdateTaskStatus } from 'src/task/dto/UpdateTaskStatus';
import { Status } from 'src/task/entity/tasks.entity';

@ApiTags('Tasks')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('/get-all-tasks')
  async getAllTasks() {
    return this.taskService.getTask();
  }

  @Get('/get-task-by-id/:id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.taskService.getTaskById(id);
    if (!task) {
      throw new NotFoundException('No Task Found with this ID');
    }
    return task;
  }

  @Post('create-task')
  async createTask(@Body() data: CreateTaskDto, @Req() req: Request) {
    if (req.user.role !== 'Buyer') {
      throw new UnauthorizedException('A seller cannot create an Offer');
    }
    const newTask = await this.taskService.createTask({
      ...data,
      userId: req.user._id
    });
    return newTask;
  }

  @Put('update-task')
  async updateTask(@Req() req: Request, @Body() data: UpdateTaskDto) {
    if (req.user.role !== 'Buyer') {
      throw new UnauthorizedException('A seller cannot update a Task');
    }
    return await this.taskService.updateTaskById(req.user._id, data);
  }

  @Put('update-task-status/:id')
  async updateTaskStatus(
    @Req() req: Request,
    @Body() data: UpdateTaskStatus,
    @Param('id') id: string
  ) {
    if (req.user.role !== 'Buyer') {
      throw new UnauthorizedException('A seller cannot update the Task Status');
    }

    const task = await this.taskService.getTaskById(id);

    if (['Completed', 'Revision'].includes(data.taskStatus)) {
      if (!task?.delivered) {
        throw new BadRequestException(
          'You cannot change status to Completed or Revision unless seller delivers the order'
        );
      }

      return this.taskService.updateTaskStatus(id, {
        taskStatus: Status.Completed,
        userId: req.user._id
      });
    }

    return this.taskService.updateTaskStatus(id, {
      ...data,
      userId: req.user._id
    });
  }
  @Put('/deliever-task/:id')
  async delieverTask(@Param('id') id: string, @Req() req: Request) {
    if (req.user.role !== 'Seller') {
      throw new UnauthorizedException('Buyer Cannot deliever the order');
    }

    await this.taskService.delieverTask(id);
    return { message: 'task Delivered' };
  }

  @Delete('delete-task')
  async deleteTask(@Param('id') id: string, @Req() req: Request) {
    if (req.user.role !== 'Buyer') {
      throw new UnauthorizedException('A seller cannot create an Offer');
    }
    return { message: 'deleted Successfuly' };
  }
}
