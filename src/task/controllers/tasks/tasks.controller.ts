import {
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
      throw new UnauthorizedException('A seller cannot update an Offer');
    }
    const newTask = await this.taskService.updateTaskById(req.user._id, data);
  }

  @Put('update-task-status/:id')
  async updateTaskStatus(
    @Req() req: Request,
    @Body() data: UpdateTaskStatus,
    @Param('id') id: string
  ) {
    if (req.user.role !== 'Buyer') {
      throw new UnauthorizedException('A seller cannot create an Offer');
    }
    return await this.taskService.updateTaskStatus(id, {
      ...data,
      userId: req.user._id
    });
  }

  @Put('/deliever-task/:id')
  async delieverTask(@Param('id') id: string) {
    return await this.taskService.delieverTask(id);
  }

  @Delete('delete-task')
  async deleteTask(@Param('id') id: string, @Req() req: Request) {
    if (req.user.role !== 'Buyer') {
      throw new UnauthorizedException('A seller cannot create an Offer');
    }
    return { message: 'deleted Successfuly' };
  }
}
