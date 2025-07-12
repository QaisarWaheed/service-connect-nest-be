import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/account/guards/jwt-guard/jwt-guard.guard';
import { UserService } from 'src/account/services/user/user.service';
import { CreateTaskDto } from 'src/task/dto/create-task/create-task';
import { TasksService } from 'src/task/services/tasks/tasks.service';

@ApiTags('Tasks')
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly taskService: TasksService,
    private readonly userService: UserService
  ) {}

  @Get('/get-all-tasks')
  async getAllTasks() {
    return this.taskService.getTask();
  }

  @Get('get-task-by-id')
  async getTaskById(id: string) {
    const task = await this.taskService.getTaskById(id);
    if (!task) {
      throw new NotFoundException('No Task Found with this ID');
    }
    return task;
  }

  @Post('create-task')
  async createTask(@Body() data: CreateTaskDto, id: string) {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException('No Task Found with this ID');
    }
    const newTask = await this.taskService.createTask({
      ...data,
      user: user._id
    });
  }

  @Put('update-task')
  async updateTask(@Param('id') id: string, @Body() data: CreateTaskDto) {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException('No Task Found with this ID');
    }
    const newTask = await this.taskService.updateTaskById({
      ...data,
      user: user._id
    });
  }
  @Delete('delete-task')
  async deletTask(@Param('id') id: string) {}
}
